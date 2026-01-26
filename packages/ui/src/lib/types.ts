export interface ParagraphSettings {
    lineHeight?: string;
    fontSize?: string;
    fontType?: string;
    fontWeight?: string;
    fontFamily?: string;
    margin?: string;
    letterSpacing?: string;
}

export interface CodeblockSettings {
    isMacStyle?: boolean;
    fontSize?: string;
    fontFamily?: string;
    hlThemeId?: string;
}

export type Platform = "wechat" | "toutiao" | "zhihu" | "juejin" | "medium";

export interface ThemeStorageAdapter {
    // 初始化/加载所有自定义主题
    load(): Promise<Record<string, CustomTheme>> | Record<string, CustomTheme>;
    // 保存单个主题
    save(id: string, name: string, css: string): Promise<void> | void;
    // 删除单个主题
    remove(id: string): Promise<void> | void;
}

export interface CustomTheme {
    id: string;
    name: string;
    css: string;
}
