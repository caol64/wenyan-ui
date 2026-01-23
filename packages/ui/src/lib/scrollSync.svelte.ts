export class ScrollSynchronizer {
    // 1. 使用 $state 存储 DOM 引用，外部可以直接绑定
    left = $state<HTMLElement | null>(null);
    right = $state<HTMLElement | null>(null);

    // 2. 内部互斥锁
    private isSyncingLeft = false;
    private isSyncingRight = false;

    constructor() {
        // 3. 在构造函数中使用 $effect
        // 当 left 或 right 发生变化时（组件挂载/卸载），自动重新绑定事件
        $effect(() => {
            const l = this.left;
            const r = this.right;

            if (!l || !r) return;

            const onLeftScroll = () => this.handleScroll(l, r, "left");
            const onRightScroll = () => this.handleScroll(r, l, "right");

            l.addEventListener("scroll", onLeftScroll);
            r.addEventListener("scroll", onRightScroll);

            // Svelte 5 effect 清理函数
            return () => {
                l.removeEventListener("scroll", onLeftScroll);
                r.removeEventListener("scroll", onRightScroll);
            };
        });
    }

    // 处理滚动事件
    private handleScroll(source: HTMLElement, target: HTMLElement, direction: "left" | "right") {
        // 互斥锁检查
        if (direction === "left" && this.isSyncingRight) return;
        if (direction === "right" && this.isSyncingLeft) return;

        // 设置锁
        if (direction === "left") this.isSyncingLeft = true;
        else this.isSyncingRight = true;

        // 执行同步计算
        this.syncPosition(source, target);

        // 解锁（使用 requestAnimationFrame 确保在下一帧渲染前解锁，防止抖动）
        requestAnimationFrame(() => {
            if (direction === "left") this.isSyncingLeft = false;
            else this.isSyncingRight = false;
        });
    }

    // 核心算法：百分比同步
    private syncPosition(source: HTMLElement, target: HTMLElement) {
        const sourceScrollHeight = source.scrollHeight - source.clientHeight;
        const targetScrollHeight = target.scrollHeight - target.clientHeight;

        // 防止除以 0
        if (sourceScrollHeight <= 0 || targetScrollHeight <= 0) return;

        const percentage = source.scrollTop / sourceScrollHeight;
        target.scrollTop = percentage * targetScrollHeight;
    }
}
