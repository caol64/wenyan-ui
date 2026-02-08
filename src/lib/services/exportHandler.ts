import { globalState } from "../wenyan.svelte";
import { domToPng } from "modern-screenshot";

export async function defaultExportImageHandler() {
    globalState.setConfirmMessage({
            title: "导出长图",
            message: "网页版导出长图功能无法处理图片，如果文档中包含图片，请使用桌面版导出。",
            action: async () => {
                await exportImage();
            },
        });
}

async function exportImage() {
    const dataUrl = await domToPng(document.getElementById("wenyan")!, {
        scale: 2, // 高清
        backgroundColor: "#ffffff", // 强制背景白
        fetch: {
            requestInit: { mode: "cors" },
        },
    });

    const link = document.createElement("a");
    link.download = "wenyan-export.png";
    link.href = dataUrl;
    link.click();
}
