import type { EditorView } from "codemirror";
import { globalState } from "../wenyan.svelte";

const imgType = ["image/bmp", "image/png", "image/jpeg", "image/gif", "video/mp4"];
const alertMessage = "网页版暂不支持上传图片功能，请使用桌面客户端。";

export function defaultEditorPasteHandler(event: ClipboardEvent, view: EditorView) {
    const files = event.clipboardData?.files;
    if (files && files.length > 0 && canHandleFile(files[0])) {
        event.preventDefault(); // 阻止默认粘贴行为
        globalState.setAlertMessage({
            type: "info",
            message: alertMessage,
        });
    }
}

export function defaultEditorDropHandler(event: DragEvent, view: EditorView) {
    const files = event.dataTransfer?.files;
    if (files && files.length > 0 && canHandleFile(files[0])) {
        event.preventDefault();
        globalState.setAlertMessage({
            type: "info",
            message: alertMessage,
        });
    }
}

function canHandleFile(file: File) {
    return file && imgType.includes(file.type);
}
