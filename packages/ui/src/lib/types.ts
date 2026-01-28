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

export type Platform = "wechat" | "toutiao" | "zhihu" | "juejin" | "medium";
export type CopyContentType = "html" | "txt";

export interface ThemeStorageAdapter {
    load(): Promise<Record<string, CustomTheme>> | Record<string, CustomTheme>;
    save(id: string, name: string, css: string): Promise<void> | void;
    remove(id: string): Promise<void> | void;
}

export interface CustomTheme {
    id: string;
    name: string;
    css: string;
    // created: number;
}

export interface ArticleStorageAdapter {
    load(): Promise<Article[]> | Article[];
    save(id: string, title: string, content: string): Promise<void> | void;
    remove(id: string): Promise<void> | void;
}

export interface Article {
    id: string;
    title: string;
    content: string;
    // created: number;
}

export interface SettingsStorageAdapter {
    load(): Promise<Settings> | Settings;
    save(settings: Settings): Promise<void> | void;
}

export interface Settings {
    wechatTheme?: string;
    paragraphSettings?: ParagraphSettings;
    codeblockSettings?: CodeblockSettings;
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

export type CssUpdate = {
    property: string;
    value?: string;
    append?: boolean;
};
