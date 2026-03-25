import type { EditorView } from "@codemirror/view";
import { setContext, getContext } from "svelte";
import { EDITOR_CLICK_KEY, EDITOR_DROP_KEY, EDITOR_PASTE_KEY } from "./symbols";
import { globalState } from "../wenyan.svelte";
import { canHandleFile } from "../utils";
import type { WechatUploadResponse } from "@wenyan-md/core/wechat";

const alertMessage = "网页版暂不支持上传图片功能，请使用桌面客户端。";

type EditorClickFn = () => void;
type EditorPasteFn = (
    event: ClipboardEvent,
    view: EditorView,
    handleMarkdownContent: (text: string) => Promise<string>,
    handleBlobImageUpload: (blob: File) => Promise<WechatUploadResponse>,
) => Promise<void>;
type EditorDropFn = (
    event: DragEvent,
    view: EditorView,
    handleMarkdownContent: (text: string) => Promise<string>,
    handleBlobImageUpload: (blob: File) => Promise<WechatUploadResponse>,
    handleMarkdownFileDrop: () => Promise<void>,
) => Promise<void>;

export function setEditorClick(fn: EditorClickFn) {
    setContext(EDITOR_CLICK_KEY, fn);
}

export function getEditorClick(): EditorClickFn {
    return getContext<EditorClickFn>(EDITOR_CLICK_KEY);
}

export function setEditorPaste(fn: EditorPasteFn) {
    setContext(EDITOR_PASTE_KEY, fn);
}

export function getEditorPaste(): EditorPasteFn {
    return (
        getContext<EditorPasteFn>(EDITOR_PASTE_KEY) ??
        ((event: ClipboardEvent, view: EditorView) => {
            const files = event.clipboardData?.files;
            if (files && files.length > 0 && canHandleFile(files[0])) {
                event.preventDefault(); // 阻止默认粘贴行为
                globalState.setAlertMessage({
                    type: "info",
                    message: alertMessage,
                });
            }
        })
    );
}

export function setEditorDrop(fn: EditorDropFn) {
    setContext(EDITOR_DROP_KEY, fn);
}

export function getEditorDrop(): EditorDropFn {
    return (
        getContext<EditorDropFn>(EDITOR_DROP_KEY) ??
        ((event: DragEvent, view: EditorView) => {
            const files = event.dataTransfer?.files;
            if (files && files.length > 0 && canHandleFile(files[0])) {
                event.preventDefault();
                globalState.setAlertMessage({
                    type: "info",
                    message: alertMessage,
                });
            }
        })
    );
}
