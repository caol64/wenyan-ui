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
    let bgColor = window.getComputedStyle(document.body).backgroundColor;
    // 如果获取到的是透明色 (rgba(0, 0, 0, 0)) 或者 transparent，设置为白色
    if (bgColor === "rgba(0, 0, 0, 0)" || bgColor === "transparent") {
        bgColor = "#ffffff";
    }
    const dataUrl = await domToPng(document.getElementById("wenyan")!, {
        scale: 2, // 高清
        backgroundColor: bgColor,
        fetch: {
            requestInit: { mode: "cors" },
        },
    });

    const link = document.createElement("a");
    link.download = "wenyan-export.png";
    link.href = dataUrl;
    link.click();
}
