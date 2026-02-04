import type { EditorView } from "@codemirror/view";

export type Platform = "wechat" | "toutiao" | "zhihu" | "juejin" | "medium";
export type CopyContentType = "html" | "txt";
export type CopyFn = (result: string, contentType: CopyContentType) => void;
export type GetWenyanElementFn = () => HTMLElement;
export type EditorPasteFn = (event: ClipboardEvent, view: EditorView) => void;
export type EditorDropFn = (event: DragEvent, view: EditorView) => void;
