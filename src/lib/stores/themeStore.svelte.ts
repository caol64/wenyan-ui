import { v4 as uuidv4 } from "uuid";
import { createStore, set, del, entries } from "idb-keyval";

export interface CustomTheme {
    id: string;
    name: string;
    css: string;
    // created: number;
}

export interface ThemeStorageAdapter {
    load(): Promise<Record<string, CustomTheme>> | Record<string, CustomTheme>;
    save(id: string, name: string, css: string): Promise<void> | void;
    remove(id: string): Promise<void> | void;
}

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
    async addCustomTheme(id: string) {
        this._customThemes[id] = { id, name: "自定义主题（未保存）", css: "" };
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

    async saveNewCustomTheme(css: string): Promise<string> {
        await this.cancelNewCustomTheme();
        const id = uuidv4();
        await this.saveCustomTheme(id, "自定义主题", css);
        return id;
    }

    async cancelNewCustomTheme() {
        this._customThemes = Object.fromEntries(
            Object.entries(this._customThemes).filter(([key]) => !key.startsWith("0:")),
        );
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

    async renameCustomTheme(id: string, newName: string) {
        if (!this._customThemes[id]) return;
        this._customThemes[id].name = newName;
        if (this.adapter) {
            try {
                await this.adapter.save(id, newName, this._customThemes[id].css);
            } catch (error) {
                console.error(`Failed to rename theme ${id}:`, error);
            }
        }
    }
}

export const themeStore = new ThemeStore();

const THEME_STORAGE_KEY = "wenyan_custom_themes";

/**
 * 一个基于 localStorage 的 ThemeStorageAdapter 实现
 */
export const localStorageThemeStorageAdapter: ThemeStorageAdapter = {
    load() {
        const raw = localStorage.getItem(THEME_STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    },
    save(id, name, css) {
        const current = this.load() as Record<string, CustomTheme>;
        current[id] = { id, name, css };
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(current));
    },
    remove(id) {
        const current = this.load() as Record<string, CustomTheme>;
        delete current[id];
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(current));
    },
};

const customThemeStore = createStore("wenyan-db", THEME_STORAGE_KEY);

/**
 * 一个基于 IndexedDB 的 ThemeStorageAdapter 实现
 */
export const indexedDbThemeStorageAdapter: ThemeStorageAdapter = {
    async load() {
        try {
            // entries 返回 [key, value][] 数组
            const allEntries = await entries(customThemeStore);

            // 将数组转换为 Record<string, CustomTheme>
            const result: Record<string, CustomTheme> = {};
            for (const [key, value] of allEntries) {
                result[key as string] = value as CustomTheme;
            }
            return result;
        } catch (error) {
            console.error("IndexedDB load error:", error);
            return {};
        }
    },

    async save(id: string, name: string, css: string) {
        const theme: CustomTheme = { id, name, css };
        await set(id, theme, customThemeStore);
    },

    async remove(id: string) {
        await del(id, customThemeStore);
    },
};
