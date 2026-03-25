import type { EditorView } from "codemirror";
import { globalState } from "../wenyan.svelte";
import { canHandleFile, getFileExtension, readFileAsText } from "../utils";
import type { WechatUploadResponse } from "@wenyan-md/core/wechat";

export async function defaultEditorPasteHandler(
    event: ClipboardEvent,
    view: EditorView,
    handleMarkdownContent: (text: string) => Promise<string>,
    handleBlobImageUpload: (blob: File) => Promise<WechatUploadResponse>,
) {
    const clipboardData = event.clipboardData;
    const files = clipboardData?.files;
    if (files && files.length > 0 && canHandleFile(files[0])) {
        // 粘贴图片
        event.preventDefault();
        await handleImageUpload(files[0], view, handleBlobImageUpload);
        return;
    }
    const original = clipboardData?.getData("text/plain");
    if (!original) {
        return;
    }
    try {
        event.preventDefault();
        globalState.isLoading = true;
        const selectionSnapshot = view.state.selection.main;
        const insertFrom = selectionSnapshot.from;
        const insertTo = selectionSnapshot.to;
        const finalText = await handleMarkdownContent(original);
        // windows 换行符为 \r\n，统一替换成 \n，避免出现"Selection points outside of document"
        const normalizedText = finalText.replace(/\r\n/g, "\n");

        view.dispatch({
            changes: {
                from: insertFrom,
                to: insertTo,
                insert: normalizedText,
            },
            selection: { anchor: insertFrom + normalizedText.length },
        });
        view.focus();
    } catch (error) {
        console.error("File paste error:", error);
        globalState.setAlertMessage({
            type: "error",
            message: `处理文件出错: ${error instanceof Error ? error.message : error}`,
        });
    } finally {
        globalState.isLoading = false;
    }
}

export async function defaultEditorDropHandler(
    event: DragEvent,
    view: EditorView,
    handleMarkdownContent: (text: string) => Promise<string>,
    handleBlobImageUpload: (blob: File) => Promise<WechatUploadResponse>,
    handleMarkdownFileDrop: () => Promise<void>,
) {
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;

    const extension = getFileExtension(file.name).toLowerCase();
    const isMarkdown = extension === "md" || file.type === "text/markdown";

    if (canHandleFile(file)) {
        // 拖拽图片
        event.preventDefault();
        await handleImageUpload(file, view, handleBlobImageUpload);
        return;
    }
    if (isMarkdown) {
        // 拖拽文档
        event.preventDefault();
        try {
            globalState.isLoading = true;
            await handleMarkdownFileDrop();
            const content = await readFileAsText(file);
            const finalText = await handleMarkdownContent(content);
            globalState.setMarkdownText(finalText);
        } catch (error) {
            globalState.setAlertMessage({
                type: "error",
                message: `处理文件出错: ${error instanceof Error ? error.message : error}`,
            });
        } finally {
            globalState.isLoading = false;
        }
    }
}

async function handleImageUpload(
    file: File,
    view: EditorView,
    handleBlobImageUpload: (blob: File) => Promise<WechatUploadResponse>,
) {
    globalState.isLoading = true;

    try {
        const resp = await handleBlobImageUpload(file);
        const markdown = `\n![${file.name}](${resp.url})\n`;

        const { from, to } = view.state.selection.main;

        view.dispatch({
            changes: { from, to, insert: markdown },
            selection: { anchor: from + markdown.length },
        });

        view.focus();
    } catch (e) {
        globalState.setAlertMessage({
            type: "error",
            message: String(e),
        });
    } finally {
        globalState.isLoading = false;
    }
}
