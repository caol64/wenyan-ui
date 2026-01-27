import type { CustomTheme, ThemeStorageAdapter } from "@wenyan-md/ui";
import { createStore, set, del, entries } from "idb-keyval";

const THEME_STORAGE_KEY = "wenyan_custom_themes";

export const localStorageAdapter: ThemeStorageAdapter = {
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

export const indexedDbAdapter: ThemeStorageAdapter = {
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
