import fs from "node:fs";
import path from "node:path";

const PACKAGE_PATH = ["packages/ui/package.json", "apps/web/package.json"];
const PACKAGE_TO_CHECK = ["@wenyan-md/core"];

function check() {
    let globalHasError = false; // 全局错误标志

    PACKAGE_PATH.forEach((pkgPath) => {
        try {
            const absolutePath = path.resolve(process.cwd(), pkgPath);

            // 1. 检查文件是否存在
            if (!fs.existsSync(absolutePath)) {
                console.warn(`⚠️  跳过检查: 找不到文件 ${pkgPath}`);
                return;
            }

            const content = fs.readFileSync(absolutePath, "utf-8");
            const pkg = JSON.parse(content);

            const depTypes = ["dependencies", "devDependencies", "peerDependencies"];
            const forbiddenVersion = "workspace:^";

            let fileHasError = false;

            depTypes.forEach((type) => {
                PACKAGE_TO_CHECK.forEach((targetPackage) => {
                    if (pkg[type] && pkg[type][targetPackage] === forbiddenVersion) {
                        console.error(`❌ [${pkgPath}] 在 ${type} 中发现禁止的依赖版本:`);
                        console.error(`   "${targetPackage}": "${forbiddenVersion}"`);
                        fileHasError = true;
                    }
                });
            });

            if (fileHasError) {
                globalHasError = true; // 标记全局错误
            }
        } catch (err) {
            console.error(`❌ 检查脚本运行出错 (${pkgPath}):`, err);
            // 脚本本身出错也应该阻止提交
            process.exit(1);
        }
    });

    // 2. 所有文件检查完毕后，统一决定是否通过
    if (globalHasError) {
        console.error(`\n🚫 检查失败！请将依赖版本修改为具体的版本号 (例如 "1.0.0") 后再提交。`);
        process.exit(1); // 退出码 1，Git 会拦截提交，不会产生 commit log
    } else {
        console.log("✅ 依赖版本检查通过");
        process.exit(0); // 退出码 0，允许提交
    }
}

check();
