import type { FileEntry } from "../../types";

export interface FileSystemAdapter {
    /**
     * 打开目录选择弹窗
     * @returns 返回选中的目录绝对路径，取消则返回 null
     */
    openDirectoryPicker(): Promise<string | null>;

    /**
     * 读取指定路径下的文件和文件夹（需包含过滤和排序逻辑）
     * @param path 目标路径
     * @returns 过滤并排序后的文件列表
     */
    readDir(path: string): Promise<FileEntry[]>;
}

export function filterAndSortEntries(entries: FileEntry[]): FileEntry[] {
    const filtered = entries.filter((e) => {
        if (e.isDirectory) return true;
        return e.name.toLowerCase().endsWith(".md");
    });

    return filtered.sort((a, b) => {
        if (a.isDirectory === b.isDirectory) return a.name.localeCompare(b.name);
        return a.isDirectory ? -1 : 1;
    });
}
