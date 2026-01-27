import {
    DEFAULT_SETTINGS,
    type Article,
    type ArticleStorageAdapter,
    type CodeblockSettings,
    type CustomTheme,
    type ParagraphSettings,
    type Settings,
    type SettingsStorageAdapter,
    type ThemeStorageAdapter,
} from "./types";

class ThemeStore {
    // 内存中的缓存，UI 直接读取这个对象
    private _customThemes = $state<Record<string, CustomTheme>>({});

    // 持有存储适配器的引用
    private adapter: ThemeStorageAdapter | null = null;

    /**
     * 注册存储适配器并加载初始数据
     * @param adapter 实现 ThemeStorageAdapter 接口的对象
     */
    async register(adapter: ThemeStorageAdapter) {
        this.adapter = adapter;
        try {
            const loadedThemes = await adapter.load();
            this._customThemes = loadedThemes || {};
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
     * 添加或更新自定义主题（缓存）
     */
    async addCustomTheme(id: string, name: string, css: string) {
        this._customThemes[id] = { id, name, css };
    }

    /**
     * 添加或更新自定义主题（持久化）
     */
    async saveCustomTheme(id: string, name: string, css: string) {
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

    async saveNewCustomTheme(css: string) {
        this.deleteCustomTheme("0");
        await this.saveCustomTheme(uuidv4(), "自定义主题", css);
    }

    /**
     * 删除自定义主题（缓存）
     */
    async deleteCustomTheme(id: string) {
        delete this._customThemes[id];
    }

    /**
     * 删除自定义主题（持久化）
     */
    async removeCustomTheme(id: string) {
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

class SettingsStore {
    private adapter: SettingsStorageAdapter | null = null;
    private _settings = $state<Settings>({ ...DEFAULT_SETTINGS });

    async register(adapter: SettingsStorageAdapter) {
        this.adapter = adapter;
        try {
            const loadedSettings = await adapter.load();
            this._settings = {
                ...DEFAULT_SETTINGS,
                ...loadedSettings,
                codeblockSettings: {
                    ...DEFAULT_SETTINGS.codeblockSettings,
                    ...(loadedSettings?.codeblockSettings || {}),
                },
                paragraphSettings: {
                    ...DEFAULT_SETTINGS.paragraphSettings,
                    ...(loadedSettings?.paragraphSettings || {}),
                },
            };
        } catch (error) {
            console.error("Failed to load settings:", error);
        }
    }

    getSettings(): Settings {
        return this._settings;
    }

    async saveSettings(settings: Settings) {
        this._settings = settings;
        if (this.adapter) {
            const plainSettings = $state.snapshot(settings);
            this.adapter.save(plainSettings);
        }
    }

    updateCodeblockSetting<K extends keyof CodeblockSettings>(key: K, value: CodeblockSettings[K]) {
        const current = this._settings;

        this.saveSettings({
            ...current,
            codeblockSettings: {
                ...(current.codeblockSettings || {}),
                [key]: value,
            },
        });
    }

    updateParagraphSetting<K extends keyof ParagraphSettings>(key: K, value: ParagraphSettings[K]) {
        const current = this._settings;

        this.saveSettings({
            ...current,
            paragraphSettings: {
                ...(current.paragraphSettings || {}),
                [key]: value,
            },
        });
    }
}

class ArticleStore {
    private adapter: ArticleStorageAdapter | null = null;
    private _articles = $state<Article[]>([]);

    async register(adapter: ArticleStorageAdapter) {
        this.adapter = adapter;
        try {
            const loadedArticles = await adapter.load();
            if (loadedArticles.length > 0) {
                this._articles = loadedArticles;
            }
        } catch (error) {
            console.error("Failed to load articles:", error);
        }
    }

    getLastArticle(): string {
        return this._articles.length > 0 ? this._articles[0].content : "";
    }

    saveLastArticle(markdown: string): void {
        if (this._articles.length === 0) {
            this._articles.unshift({ id: "last-article", title: "Last Article", content: markdown });
        } else {
            this._articles[0].content = markdown;
        }
        this.adapter?.save("last-article", "", markdown);
    }
}

export const themeStore = new ThemeStore();
export const settingsStore = new SettingsStore();
export const articleStore = new ArticleStore();

export const localStorageSettingsAdapter: SettingsStorageAdapter = {
    async load(): Promise<Settings> {
        const data = localStorage.getItem("wenyan-settings");
        return data ? JSON.parse(data) : {};
    },
    async save(settings: Settings): Promise<void> {
        localStorage.setItem("wenyan-settings", JSON.stringify(settings));
    },
};
function uuidv4(): string {
    throw new Error("Function not implemented.");
}

