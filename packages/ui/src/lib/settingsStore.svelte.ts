export interface ParagraphSettings {
    isFollowTheme?: boolean;
    lineHeight?: string;
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
    paragraphSpacing?: string;
    letterSpacing?: string;
}

export interface CodeblockSettings {
    isFollowTheme?: boolean;
    isMacStyle?: boolean;
    fontSize?: string;
    fontFamily?: string;
    hlThemeId?: string;
}

export interface Settings {
    wechatTheme?: string;
    paragraphSettings?: ParagraphSettings;
    codeblockSettings?: CodeblockSettings;
}

export interface SettingsStorageAdapter {
    load(): Promise<Settings> | Settings;
    save(settings: Settings): Promise<void> | void;
}

export const DEFAULT_CODEBLOCK_SETTINGS: CodeblockSettings = {
    isFollowTheme: true,
    hlThemeId: "github",
    isMacStyle: true,
    fontSize: "12px",
};

export const DEFAULT_PARAGRAPH_SETTINGS: ParagraphSettings = {
    isFollowTheme: true,
    fontSize: "16px",
    fontFamily: "sans",
    fontWeight: "400",
    letterSpacing: "0.1em",
    lineHeight: "1.75",
    paragraphSpacing: "1em",
};

export const DEFAULT_SETTINGS: Settings = {
    wechatTheme: "default",
    codeblockSettings: DEFAULT_CODEBLOCK_SETTINGS,
    paragraphSettings: DEFAULT_PARAGRAPH_SETTINGS,
};

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

export const settingsStore = new SettingsStore();

/**
 * 一个基于浏览器 localStorage 的 SettingsStorageAdapter 实现
 */
export const localStorageSettingsAdapter: SettingsStorageAdapter = {
    async load(): Promise<Settings> {
        const data = localStorage.getItem("wenyan-settings");
        return data ? JSON.parse(data) : {};
    },
    async save(settings: Settings): Promise<void> {
        localStorage.setItem("wenyan-settings", JSON.stringify(settings));
    },
};
