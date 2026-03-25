const imgType = ["image/bmp", "image/png", "image/jpeg", "image/gif", "video/mp4"];

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

export function getWenyanElement(): HTMLElement {
    const wenyanElement = document.getElementById("wenyan");
    if (!wenyanElement) {
        throw new Error("Wenyan element not found");
    }
    const clonedWenyan = wenyanElement.cloneNode(true) as HTMLElement;
    return clonedWenyan;
}

export function canHandleFile(file: File) {
    return file && imgType.includes(file.type);
}

export function getFileExtension(filename: string): string {
    if (!filename || typeof filename !== "string") {
        return "";
    }
    const lastDotIndex = filename.lastIndexOf(".");
    if (lastDotIndex === -1 || lastDotIndex === 0) {
        return "";
    }
    return filename.slice(lastDotIndex + 1).toLowerCase();
}

export function readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
}

export function bufferToBase64(buffer: ArrayBuffer): Promise<string> {
    return new Promise((resolve, reject) => {
        const blob = new Blob([buffer]);
        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result;
            // 结果通常是 "data:application/octet-stream;base64,xxxx"
            if (typeof result === "string") {
                // const base64 = result.split(',')[1];
                resolve(result);
            } else {
                reject(new Error("Failed to convert buffer to base64 string"));
            }
        };

        reader.onerror = () => {
            reject(new Error("FileReader error occurred"));
        };

        reader.readAsDataURL(blob);
    });
}
