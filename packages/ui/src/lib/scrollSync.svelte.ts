export class ScrollSynchronizer {
    // 1. 使用 $state 存储 DOM 引用，外部可以直接绑定
    left = $state<HTMLElement | null>(null);
    right = $state<HTMLElement | null>(null);

    // 2. 内部互斥锁
    private isSyncingLeft = false;
    private isSyncingRight = false;
    private lastLeftScrollTop = 0;
    private lastRightScrollTop = 0;

    constructor() {
        // 3. 在构造函数中使用 $effect
        $effect(() => {
            const l = this.left;
            const r = this.right;

            if (!l || !r) return;

            const onLeftScroll = (e: Event) => this.handleScroll(l, r, "left", e);
            const onRightScroll = (e: Event) => this.handleScroll(r, l, "right", e);

            l.addEventListener("scroll", onLeftScroll, { passive: true });
            r.addEventListener("scroll", onRightScroll, { passive: true });

            // Svelte 5 effect 清理函数
            return () => {
                l.removeEventListener("scroll", onLeftScroll);
                r.removeEventListener("scroll", onRightScroll);
            };
        });
    }

    // 处理滚动事件
    private handleScroll(
        source: HTMLElement,
        target: HTMLElement,
        direction: "left" | "right",
        event: Event
    ) {
        // 过滤主动修改 scrollTop 触发的 scroll 事件（核心解决 Safari 额外事件问题）
        const currentScrollTop = source.scrollTop;
        const lastScrollTop = direction === "left" ? this.lastLeftScrollTop : this.lastRightScrollTop;

        // 判断：如果是主动修改导致的滚动（差值极小，小于 1），直接返回
        if (Math.abs(currentScrollTop - lastScrollTop) < 1) {
            // 更新最后一次滚动值，避免偏差累积
            if (direction === "left") this.lastLeftScrollTop = currentScrollTop;
            else this.lastRightScrollTop = currentScrollTop;
            return;
        }

        // 互斥锁检查
        if (direction === "left" && this.isSyncingRight) return;
        if (direction === "right" && this.isSyncingLeft) return;

        // 设置锁
        if (direction === "left") this.isSyncingLeft = true;
        else this.isSyncingRight = true;

        // 执行同步计算（优化数值精度）
        this.syncPosition(source, target, direction);

        // 放弃 requestAnimationFrame，直接同步解锁（关键解决 Safari 解锁延迟）
        // 原因：Safari 中 requestAnimationFrame 延迟导致锁释放过晚，同步解锁无抖动（互斥锁已拦截重复事件）
        if (direction === "left") this.isSyncingLeft = false;
        else this.isSyncingRight = false;
    }

    // 核心算法：百分比同步（优化：增加 direction 参数，更新最后一次滚动值，优化数值精度）
    private syncPosition(
        source: HTMLElement,
        target: HTMLElement,
        direction: "left" | "right"
    ) {
        const sourceScrollHeight = source.scrollHeight - source.clientHeight;
        const targetScrollHeight = target.scrollHeight - target.clientHeight;

        // 防止除以 0
        if (sourceScrollHeight <= 0 || targetScrollHeight <= 0) return;

        // 优化数值精度，将百分比结果取整（避免 Safari 浮点数偏差累积）
        const percentage = source.scrollTop / sourceScrollHeight;
        const targetScrollTop = Math.round(percentage * targetScrollHeight); // 取整，消除浮点数误差

        // 更新最后一次滚动值（用于过滤主动修改的 scroll 事件）
        if (direction === "left") {
            this.lastRightScrollTop = targetScrollTop;
        } else {
            this.lastLeftScrollTop = targetScrollTop;
        }

        // 执行滚动同步（仅当目标 scrollTop 变化时才赋值，减少额外事件触发）
        if (target.scrollTop !== targetScrollTop) {
            target.scrollTop = targetScrollTop;
        }
    }
}
