import type { EditorView } from "codemirror";
import { globalState } from "$lib/wenyan.svelte";

const imgType = ["image/jpeg", "image/png", "image/gif", "image/webp"];
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

// async function handleImageUpload(file: File, view: EditorView) {
//     if (!file || !imgType.includes(file.type)) return;

//     if (onUploadImage) {
//         try {
//             const placeholder = `![上传中...](${file.name})`;
//             const transaction = view.state.replaceSelection(placeholder);
//             view.dispatch(transaction);

//             const url = await onUploadImage(file);

//             if (url) {
//                 const insertedText = `![](${url})`;
//                 const text = view.state.doc.toString();
//                 const newText = text.replace(placeholder, insertedText);

//                 view.dispatch({
//                     changes: { from: 0, to: text.length, insert: newText },
//                 });
//             }
//         } catch (error) {
//             console.error("Upload failed", error);
//         }
//     }
// }
