import { v4 as uuidv4 } from "uuid";
import { createStore, set, del, values } from "idb-keyval";

export interface Article {
    id: string;
    title: string;
    content: string;
    created: number;
}

export interface ArticleStorageAdapter {
    load(): Promise<Article[]> | Article[];
    save(article: Article): Promise<void> | void;
    remove(id: string): Promise<void> | void;
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
            const article = { id: uuidv4(), title: "Last Article", content: markdown, created: Date.now() };
            this._articles.unshift(article);
            this.adapter?.save(article);
        } else {
            this._articles[0].content = markdown;
            this.adapter?.save($state.snapshot(this._articles[0]));
        }
    }
}

export const articleStore = new ArticleStore();

const ARTICLE_STORAGE_KEY = "wenyan-articles";

/**
 * 一个基于 localStorage 的 ArticleStorageAdapter 实现
 */
export const localStorageArticleAdapter: ArticleStorageAdapter = {
    async load(): Promise<Article[]> {
        const data = localStorage.getItem(ARTICLE_STORAGE_KEY);
        if (data) {
            const parsedData = JSON.parse(data);
            return Array.isArray(parsedData) ? parsedData : [];
        }
        return [];
    },
    async save(article: Article): Promise<void> {
        const articles = await this.load();
        const index = articles.findIndex((a) => a.id === article.id);
        if (index !== -1) {
            articles[index] = article;
        } else {
            articles.unshift(article);
        }
        localStorage.setItem(ARTICLE_STORAGE_KEY, JSON.stringify(articles));
    },
    async remove(id: string): Promise<void> {
        const articles = await this.load();
        const filtered = articles.filter((a) => a.id !== id);
        localStorage.setItem(ARTICLE_STORAGE_KEY, JSON.stringify(filtered));
    },
};

const articleDbStore = createStore(ARTICLE_STORAGE_KEY, ARTICLE_STORAGE_KEY);

/**
 * 一个基于 IndexedDB 的 ArticleStorageAdapter 实现
 */
export const indexedDbArticleAdapter: ArticleStorageAdapter = {

    async load(): Promise<Article[]> {
        try {
            // values 直接返回存储的所有对象数组
            const allArticles = await values<Article>(articleDbStore);
            // 默认按创建时间倒序排列
            return allArticles.sort((a, b) => b.created - a.created);
        } catch (error) {
            console.error("IndexedDB load articles error:", error);
            return [];
        }
    },

    async save(article: Article): Promise<void> {
        try {
            await set(article.id, article, articleDbStore);
        } catch (error) {
            console.error("IndexedDB save article error:", error);
        }
    },

    async remove(id: string): Promise<void> {
        try {
            await del(id, articleDbStore);
        } catch (error) {
            console.error("IndexedDB remove article error:", error);
        }
    },
};
