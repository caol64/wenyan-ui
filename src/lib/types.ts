import type { Action } from "svelte/action";

export type Platform = "wechat" | "toutiao" | "zhihu" | "juejin" | "medium";
export type CopyContentType = "html" | "txt";

export interface AlertMessage {
    type: "info" | "success" | "warning" | "error";
    message: string;
    title?: string;
}

export interface ConfirmMessage {
    message: string;
    title?: string;
    action: () => void;
}

export interface CurrentTheme {
    id: string;
    name: string;
    css: string;
}

export type ImageProcessorAction = Action<HTMLElement>;
