import type { CustomTheme, ThemeStorageAdapter } from "./types";

const THEME_STORAGE_KEY = 'wenyan_custom_themes';

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
    }
};
