export interface ParagraphSettings {
    isFollowTheme: boolean;
    lineHeight: string;
    fontSize: string;
    fontWeight: string;
    fontFamily: string;
    paragraphSpacing: string;
    letterSpacing: string;
}

export interface CodeblockSettings {
    isFollowTheme: boolean;
    isMacStyle: boolean;
    fontSize: string;
    fontFamily?: string;
    hlThemeId: string;
}

export interface UploadSettings {
    autoUploadLocal: boolean;
    autoUploadNetwork: boolean;
    autoCache: boolean;
}

export interface Settings {
    wechatTheme: string;
    enabledImageHost?: string;
    paragraphSettings: ParagraphSettings;
    codeblockSettings: CodeblockSettings;
    uploadSettings: UploadSettings;
}

export interface SettingsStorageAdapter {
    load(): Promise<Settings | null> | Settings | null;
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
    enabledImageHost: "wechat",
    codeblockSettings: DEFAULT_CODEBLOCK_SETTINGS,
    paragraphSettings: DEFAULT_PARAGRAPH_SETTINGS,
    uploadSettings: {
        autoUploadLocal: false,
        autoUploadNetwork: false,
        autoCache: false,
    },
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
                uploadSettings: {
                    ...DEFAULT_SETTINGS.uploadSettings,
                    ...(loadedSettings?.uploadSettings || {}),
                },
            };
        } catch (error) {
            console.error("Failed to load settings:", error);
        }
    }

    get paragraphSettings(): ParagraphSettings {
        return this._settings.paragraphSettings;
    }

    set paragraphSettings(value: ParagraphSettings) {
        this._settings.paragraphSettings = value;
    }

    get codeblockSettings(): CodeblockSettings {
        return this._settings.codeblockSettings;
    }

    set codeblockSettings(value: CodeblockSettings) {
        this._settings.codeblockSettings = value;
    }

    get enabledImageHost(): string | undefined {
        return this._settings.enabledImageHost;
    }

    set enabledImageHost(value: string) {
        this._settings.enabledImageHost = value;
    }

    get wechatTheme(): string {
        return this._settings.wechatTheme;
    }

    set wechatTheme(value: string) {
        this._settings.wechatTheme = value;
    }

    get uploadSettings(): UploadSettings {
        return this._settings.uploadSettings;
    }

    set uploadSettings(value: UploadSettings) {
        this._settings.uploadSettings = value;
    }

    async saveSettings() {
        this.adapter?.save($state.snapshot(this._settings));
    }
}

export const settingsStore = new SettingsStore();

/**
 * 一个基于浏览器 localStorage 的 SettingsStorageAdapter 实现
 */
export const localStorageSettingsAdapter: SettingsStorageAdapter = {
    async load(): Promise<Settings | null> {
        const data = localStorage.getItem("wenyan-settings");
        return data ? JSON.parse(data) : null;
    },
    async save(settings: Settings): Promise<void> {
        localStorage.setItem("wenyan-settings", JSON.stringify(settings));
    },
};
