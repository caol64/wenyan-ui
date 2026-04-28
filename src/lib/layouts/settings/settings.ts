import type { Component } from "svelte";
import WechatCredentialSettings from "./credentials/WechatCredentialSettings.svelte";
import ImageHostSettings from "./ImageHostSettings.svelte";
import OtherSettings from "./OtherSettings.svelte";

type SettingItem = {
    id: string;
    label: string;
    component: Component;
};

export const settingsMap: Record<string, Component> = {
    wechatCredential: WechatCredentialSettings,
    imageHost: ImageHostSettings,
    other: OtherSettings,
};

export const credentialMenuItems = [
    { id: "wechatCredential", label: "公众号" },
    // { id: "toutiao", label: "今日头条" },
];
