import DOMPurify from "dompurify";
import { createWenyanCore } from "@wenyan-md/core";
import type { Platform } from "./types";

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
        const rendered = await core.applyStylesWithTheme(wenyanElement);
        this.html = DOMPurify.sanitize(rendered);
    }
}

class GlobalState {
    isSidebarOpen = $state(false);
    currentPlatform = $state<Platform>("wechat");
    currentTheme = $state("default");

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
}

// 导出单例
export const wenyanRenderer = new WenyanRenderer();
export const wenyanCopier = new WenyanCopier();
export const globalState = new GlobalState();
