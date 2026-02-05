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

export async function copyTextToClipboard(text: string) {
    if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API not available.");
    }
    await navigator.clipboard.writeText(text);
}

export function createDebouncer(delay = 500) {
    let timer: ReturnType<typeof setTimeout>;

    return (callback: () => void) => {
        clearTimeout(timer);
        timer = setTimeout(callback, delay);
    };
}

export async function getExampleArticle(): Promise<string> {
    const response = await fetch("/example.md");
    if (!response.ok) {
        console.error(`无法获取文件: ${response.statusText}`);
        return "";
    }
    return await response.text();
}
