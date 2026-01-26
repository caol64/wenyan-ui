import fs from "node:fs";
import path from "node:path";

const PACKAGE_PATH = ["packages/ui/package.json", "apps/web/package.json"];
const PACKAGE_TO_CHECK = ["@wenyan-md/core"];

function check() {
    PACKAGE_PATH.forEach((pkgPath) => {
        try {
            const absolutePath = path.resolve(process.cwd(), pkgPath);

            // 检查文件是否存在
            if (!fs.existsSync(absolutePath)) {
                process.exit(0);
            }

            const content = fs.readFileSync(absolutePath, "utf-8");
            const pkg = JSON.parse(content);

            // 需要检查的依赖字段
            const depTypes = ["dependencies", "devDependencies", "peerDependencies"];
            const forbiddenVersion = "workspace:^";

            let hasError = false;

            depTypes.forEach((type) => {
                PACKAGE_TO_CHECK.forEach((targetPackage) => {
                    if (pkg[type] && pkg[type][targetPackage] === forbiddenVersion) {
                        console.error(`❌ 在 ${pkgPath} 的 ${type} 中发现禁止的依赖版本:`);
                        console.error(`   "${targetPackage}": "${forbiddenVersion}"`);
                        hasError = true;
                    }
                });
            });
            if (hasError) {
                console.error(`\n⚠️  请将版本修改为具体的版本号 (例如 "2.0.0") 再提交。`);
                process.exit(1); // 退出码 1 会阻止 Git 提交
            }
        } catch (err) {
            console.error("❌ 检查依赖脚本运行出错:", err);
            process.exit(1);
        }
    });
}

check();
