import DOMPurify from "dompurify";
import { createWenyanCore, type ApplyStylesOptions } from "@wenyan-md/core";
import type { CustomTheme, Platform, ThemeStorageAdapter } from "./types";

type WenyanCoreInstance = Awaited<ReturnType<typeof createWenyanCore>>;

class WenyanCoreManager {
    // 核心实例
    instance = $state<WenyanCoreInstance | null>(null);
    // 加载 Promise 缓存，防止并发调用多次创建
    private initPromise: Promise<WenyanCoreInstance> | null = null;

    // 获取核心实例（懒加载）
    async get(): Promise<WenyanCoreInstance> {
        if (this.instance) return this.instance;

        if (!this.initPromise) {
            this.initPromise = createWenyanCore().then((core) => {
                this.instance = core; // 更新状态，触发依赖更新
                return core;
            });
        }

        return this.initPromise;
    }
}

// 全局唯一的管理器实例
const coreManager = new WenyanCoreManager();

class WenyanRenderer {
    html = $state("");

    constructor() {
        // 初始化时自动预加载核心库
        coreManager.get();
    }

    async render(markdownText: string) {
        if (!markdownText) {
            this.html = "";
            return;
        }

        try {
            const core = await coreManager.get();

            // 处理 FrontMatter
            const preHandlerContent = await core.handleFrontMatter(markdownText);
            let body = preHandlerContent.body;
            if (preHandlerContent.title) {
                body = `# ${preHandlerContent.title}\n\n${body}`;
            }

            // 渲染
            const rendered = await core.renderMarkdown(body);
            this.html = DOMPurify.sanitize(rendered);
        } catch (error) {
            console.error("Wenyan render error:", error);
            this.html = `<p style="color:red">Render Error</p>`;
        }
    }
}

class WenyanCopier {
    html = $state("");

    constructor() {
        // 初始化时自动预加载核心库
        coreManager.get();
    }

    async copy(wenyanElement: HTMLElement) {
        if (!wenyanElement) {
            throw new Error("Wenyan element is null");
        }

        const core = await coreManager.get();
        const options: ApplyStylesOptions = {
            themeId: globalState.getCurrentTheme(),
        };
        const rendered = await core.applyStylesWithTheme(wenyanElement, options);
        this.html = DOMPurify.sanitize(rendered);
    }
}

class GlobalState {
    private markdownText = $state("");
    private isSidebarOpen = $state(false);
    private currentPlatform = $state<Platform>("wechat");
    private currentTheme = $state("default");
    private themeEditMode = $state(false);
    private customThemeCss = $state("");

    setMarkdownText(text: string) {
        this.markdownText = text;
    }

    getMarkdownText(): string {
        return this.markdownText;
    }

    setSidebarOpen(open: boolean) {
        this.isSidebarOpen = open;
    }

    getSidebarOpen(): boolean {
        return this.isSidebarOpen;
    }

    setPlatform(platform: Platform) {
        this.currentPlatform = platform;
    }

    getPlatform(): Platform {
        return this.currentPlatform;
    }

    setCurrentTheme(theme: string) {
        this.currentTheme = theme;
    }

    getCurrentTheme(): string {
        return this.currentTheme;
    }

    setThemeEditMode(editMode: boolean) {
        this.themeEditMode = editMode;
    }

    getThemeEditMode(): boolean {
        return this.themeEditMode;
    }

    setCustomThemeCss(css: string) {
        this.customThemeCss = css;
    }

    getCustomThemeCss(): string {
        return this.customThemeCss;
    }
}

export class ThemeStore {
    // 内存中的缓存，UI 直接读取这个对象
    private _customThemes = $state<Record<string, CustomTheme>>({});

    // 持有存储适配器的引用
    private adapter: ThemeStorageAdapter | null = null;

    // 状态：是否已加载完成
    isLoaded = $state(false);

    /**
     * 注册存储适配器并加载初始数据
     * @param adapter 实现 ThemeStorageAdapter 接口的对象
     */
    async register(adapter: ThemeStorageAdapter) {
        this.adapter = adapter;
        try {
            const loadedThemes = await adapter.load();
            this._customThemes = loadedThemes || {};
            this.isLoaded = true;
        } catch (error) {
            console.error("Failed to load custom themes:", error);
        }
    }

    /**
     * 获取单个自定义主题 CSS
     */
    getCustomTheme(id: string): CustomTheme | null {
        return this._customThemes[id] ?? null;
    }

    /**
     * 添加或更新自定义主题
     */
    async addCustomTheme(id: string, name: string, css: string) {
        // 1. 乐观更新：先更新内存状态，让 UI 立即响应
        this._customThemes[id] = { id, name, css };

        // 2. 持久化存储
        if (this.adapter) {
            try {
                await this.adapter.save(id, name, css);
            } catch (error) {
                console.error(`Failed to save theme ${id}:`, error);
            }
        }
    }

    /**
     * 删除自定义主题
     */
    async deleteCustomTheme(id: string) {
        // 1. 乐观更新
        const temp = this._customThemes[id]; // 暂存以备回滚
        delete this._customThemes[id];

        // 2. 持久化删除
        if (this.adapter) {
            try {
                await this.adapter.remove(id);
            } catch (error) {
                console.error(`Failed to delete theme ${id}:`, error);
                // 回滚
                if (temp) this._customThemes[id] = temp;
            }
        }
    }

    /**
     * 获取所有自定义主题（只读）
     */
    getAllCustomThemes(): Record<string, CustomTheme> {
        return this._customThemes;
    }
}

// 导出单例
export const wenyanRenderer = new WenyanRenderer();
export const wenyanCopier = new WenyanCopier();
export const globalState = new GlobalState();
export const themeStore = new ThemeStore();
