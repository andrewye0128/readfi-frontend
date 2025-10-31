#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import stripJsonComments from "strip-json-comments";

console.log("\n🚀 [ReadFi Frontend] Pre-deploy verification started...\n");

const root = process.cwd();

// --- 檢查 vite.config.ts base ---
const viteConfigPath = path.join(root, "vite.config.ts");
if (!fs.existsSync(viteConfigPath)) {
  console.error("❌ [vite.config.ts] 檔案不存在，請確認路徑是否正確。");
  process.exit(1);
}
const viteConfig = fs.readFileSync(viteConfigPath, "utf-8");
if (!viteConfig.includes("base: '/readfi-frontend/'")) {
  console.error(
    '❌ [vite.config.ts] base 設定錯誤或缺失，請確認為 base: "/readfi-frontend/".'
  );
  process.exit(1);
} else {
  console.log("✅ [vite.config.ts] base 設定正確。");
}

// --- 檢查 tsconfig.json alias ---
const tsconfigPath = path.join(root, "tsconfig.json");
if (!fs.existsSync(tsconfigPath)) {
  console.error("❌ [tsconfig.json] 檔案不存在。");
  process.exit(1);
}
const tsconfig = JSON.parse(
  stripJsonComments(fs.readFileSync(tsconfigPath, "utf-8"))
);
const paths = tsconfig?.compilerOptions?.paths || {};
if (!paths["@/*"]?.includes("./src/*")) {
  console.error(
    '❌ [tsconfig.json] 缺少 @/* alias 設定。請加入:\n"paths": { "@/*": ["./src/*"] }'
  );
  process.exit(1);
} else {
  console.log("✅ [tsconfig.json] @ alias 設定正確。");
}

// --- 檢查 404.html 是否存在於 dist ---
const dist404Path = path.join(root, "dist", "404.html");
if (!fs.existsSync(dist404Path)) {
  console.warn(
    "⚠️ [dist/404.html] 尚未建立，建議執行：cp dist/index.html dist/404.html"
  );
} else {
  console.log("✅ [dist/404.html] 存在，SPA 路由保護啟用。");
}

// --- 檢查 git branch ---
try {
  const branch = execSync("git branch --show-current").toString().trim();
  if (branch !== "main") {
    console.warn(`⚠️ [Git] 目前在分支 '${branch}'，建議切換至 main 後再部署。`);
  } else {
    console.log("✅ [Git] 目前在 main 分支。");
  }
} catch {
  console.warn("⚠️ [Git] 無法確認當前分支，請確認已初始化 Git。");
}

// --- 檢查 GitHub CLI 登入狀態 ---
try {
  const ghStatus = execSync("gh auth status", { stdio: "pipe" }).toString();
  if (ghStatus.includes("Logged in to github.com")) {
    console.log("✅ [GitHub CLI] 已登入。");
  } else {
    console.warn("⚠️ [GitHub CLI] 尚未登入，請執行：gh auth login");
  }
} catch {
  console.warn("⚠️ [GitHub CLI] 無法偵測登入狀態，請確認 gh 是否可用。");
}

console.log("\n✨ 驗證完成。若所有項目皆為綠色 ✅，即可執行：npm run deploy\n");
