import { setContext, getContext } from "svelte";
import { UPLOAD_BLOB_IMAGE_KEY, UPLOAD_HELP_KEY, UPLOAD_IMAGE_KEY } from "./symbols";
import type { WechatUploadResponse } from "@wenyan-md/core/wechat";

type UploadImageFn = (url: string) => Promise<WechatUploadResponse>;
type UploadBlobImageFn = (blob: File) => Promise<WechatUploadResponse>;
type UploadHelpClickFn = () => void;

export function setUploadImage(fn: UploadImageFn) {
    setContext(UPLOAD_IMAGE_KEY, fn);
}

export function getUploadImage(): UploadImageFn {
    return getContext<UploadImageFn>(UPLOAD_IMAGE_KEY);
}

export function setUploadBlobImage(fn: UploadBlobImageFn) {
    setContext(UPLOAD_BLOB_IMAGE_KEY, fn);
}

export function getUploadBlobImage(): UploadBlobImageFn {
    return getContext<UploadBlobImageFn>(UPLOAD_BLOB_IMAGE_KEY);
}

export function setUploadHelpClick(fn: UploadHelpClickFn) {
    setContext(UPLOAD_HELP_KEY, fn);
}

export function getUploadHelpClick(): UploadHelpClickFn {
    return (
        getContext<UploadHelpClickFn>(UPLOAD_HELP_KEY) ??
        (() => {
            window.open("https://yuzhi.tech/docs/wenyan/upload", "_blank");
        })
    );
}
