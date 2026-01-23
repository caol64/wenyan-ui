export async function copyHtmlToClipboard(htmlString: string) {
    if (!navigator.clipboard?.write) {
        throw new Error("Clipboard API not available.");
    }
    const typeHtml = "text/html";
    const blobHtml = new Blob([htmlString], { type: typeHtml });
    const data = [
        new ClipboardItem({
            [typeHtml]: blobHtml,
        }),
    ];
    await navigator.clipboard.write(data);
}
