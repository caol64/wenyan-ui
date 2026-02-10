import DOMPurify from "dompurify";
import {
    createWenyanCore,
    getContentForMedium,
    getContentForToutiao,
    getContentForZhihu,
    getHlTheme,
    getTheme,
} from "@wenyan-md/core";
import type { AlertMessage, ConfirmMessage, CurrentTheme, FrontMatterResult, Platform } from "./types";
import { themeStore } from "./stores/themeStore.svelte";
import { settingsStore } from "./stores/settingsStore.svelte";
import { articleStore } from "./stores/articleStore.svelte";
import { comboCodeblockSettings, comboParagraphSettings } from "./services/stylesCombo";

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
    postHandlerContent = "";
    frontMatterResult: FrontMatterResult = { body: "" };

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
            this.frontMatterResult = await core.handleFrontMatter(markdownText);
            let body = this.frontMatterResult.body;

            this.postHandlerContent = body;
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

        if (globalState.getPlatform() === "wechat") {
            const core = await coreManager.get();
            let themeCss = globalState.getCurrentThemeCss();
            const codeblockSettings = settingsStore.codeblockSettings;
            if (codeblockSettings && !codeblockSettings.isFollowTheme) {
                themeCss = comboCodeblockSettings(themeCss, codeblockSettings);
            }
            const paragraphSettings = settingsStore.paragraphSettings;
            if (paragraphSettings && !paragraphSettings.isFollowTheme) {
                themeCss = comboParagraphSettings(themeCss, paragraphSettings);
            }
            const options = {
                themeCss,
                hlThemeCss: globalState.getCurrentHlThemeCss(),
                isMacStyle: codeblockSettings?.isMacStyle ?? true,
                isAddFootnote: false,
            };
            const rendered = await core.applyStylesWithTheme(wenyanElement, options);
            this.html = DOMPurify.sanitize(rendered);
        } else if (globalState.getPlatform() === "toutiao") {
            this.html = DOMPurify.sanitize(getContentForToutiao(wenyanElement));
        } else if (globalState.getPlatform() === "zhihu") {
            this.html = DOMPurify.sanitize(getContentForZhihu(wenyanElement));
        } else if (globalState.getPlatform() === "medium") {
            this.html = DOMPurify.sanitize(getContentForMedium(wenyanElement));
        } else {
            this.html = DOMPurify.sanitize(getContentForToutiao(wenyanElement));
        }
    }
}

class GlobalState {
    private markdownText = $state("");
    private isSidebarOpen = $state(false);
    private currentPlatform = $state<Platform>("wechat");
    private themeEditMode = $state(false);
    private currentTheme = $state<CurrentTheme>({ id: "default", name: "默认", css: "" });
    private currentHlTheme = $state("github");
    private currentHlThemeCss = $state("");
    private alertMessage = $state<AlertMessage | null>(null);
    private confirmMessage = $state<ConfirmMessage | null>(null);
    private _isLoading = $state(false);

    setMarkdownText(text: string) {
        if (text !== this.markdownText) {
            this.markdownText = text;
            articleStore.saveLastArticle(text);
        }
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

    judgeSidebarOpen(): boolean {
        return this.isSidebarOpen && this.getPlatform() === "wechat";
    }

    setAlertMessage(message: AlertMessage | null) {
        this.alertMessage = message;
    }

    getAlertMessage(): AlertMessage | null {
        return this.alertMessage;
    }

    setConfirmMessage(message: ConfirmMessage | null) {
        this.confirmMessage = message;
    }

    getConfirmMessage(): ConfirmMessage | null {
        return this.confirmMessage;
    }

    setPlatform(platform: Platform) {
        this.currentPlatform = platform;
        if (platform === "wechat") {
            this.setCurrentTheme(settingsStore.wechatTheme);
            this.setCurrentHlTheme(settingsStore.codeblockSettings.hlThemeId);
        } else {
            this.loadThemeCss(`${this.currentPlatform}_default`);
            this.loadHlThemeCss("github");
        }
    }

    getPlatform(): Platform {
        return this.currentPlatform;
    }

    setCurrentTheme(theme: string) {
        this.currentTheme.id = theme;
        this.loadThemeCss(theme);
        if (this.getPlatform() === "wechat" && !theme.startsWith("0:")) {
            settingsStore.wechatTheme = theme;
            settingsStore.saveSettings();
        }
    }

    getCurrentTheme(): CurrentTheme {
        return this.currentTheme;
    }

    getCurrentThemeId(): string {
        return this.currentTheme.id;
    }

    setThemeEditMode(editMode: boolean) {
        this.themeEditMode = editMode;
    }

    getThemeEditMode(): boolean {
        return this.themeEditMode;
    }

    setCurrentThemeCss(css: string) {
        this.currentTheme.css = css;
    }

    getCurrentThemeCss(): string {
        return this.currentTheme.css;
    }

    setCurrentHlTheme(theme: string) {
        this.currentHlTheme = theme;
        this.loadHlThemeCss(theme);
    }

    getCurrentHlTheme(): string {
        return this.currentHlTheme;
    }

    getCurrentHlThemeCss(): string {
        return this.currentHlThemeCss;
    }

    set isLoading(loading: boolean) {
        this._isLoading = loading;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    private async loadThemeCss(themeId: string) {
        if (!themeId) return;
        if (themeId.startsWith("0:")) {
            themeId = themeId.slice(2);
        }
        if (themeId.startsWith("custom:")) {
            themeId = themeId.slice(7);
            const customTheme = themeStore.getCustomTheme(themeId);
            if (customTheme) {
                this.currentTheme.name = customTheme.name;
                this.currentTheme.css = customTheme.css;
            }
        } else {
            const theme = getTheme(themeId);
            if (theme) {
                const css = await theme.getCss();
                this.currentTheme.name = theme.meta.appName;
                this.currentTheme.css = css;
            }
        }
    }

    private async loadHlThemeCss(themeId: string) {
        const theme = getHlTheme(themeId);
        if (theme) {
            const css = await theme.getCss();
            this.currentHlThemeCss = css;
        }
    }
}

// 导出单例
export const wenyanRenderer = new WenyanRenderer();
export const wenyanCopier = new WenyanCopier();
export const globalState = new GlobalState();
