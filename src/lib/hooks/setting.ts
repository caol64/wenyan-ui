import { setContext, getContext } from "svelte";

const RESET_TOKEN_KEY = Symbol("RESET_TOKEN");
const AUTO_CACHE_CHANGE_KEY = Symbol("AUTO_CACHE_CHANGE");

type ResetTokenClickFn = () => void;
type AutoCacheChangeClickFn = () => void;

export function setResetTokenClick(fn: ResetTokenClickFn) {
    setContext(RESET_TOKEN_KEY, fn);
}

export function getResetTokenClick(): ResetTokenClickFn {
    return getContext<ResetTokenClickFn>(RESET_TOKEN_KEY);
}

export function setAutoCacheChangeClick(fn: AutoCacheChangeClickFn) {
    setContext(AUTO_CACHE_CHANGE_KEY, fn);
}

export function getAutoCacheChangeClick(): AutoCacheChangeClickFn {
    return getContext<AutoCacheChangeClickFn>(AUTO_CACHE_CHANGE_KEY);
}
