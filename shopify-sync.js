#!/usr/bin/env node
import { execSync } from 'node:child_process';

// ========= 配置 =========
const STORE = "urtopia.myshopify.com";
const THEME_ID = "133930189048";
const SYNC_DIRS = ["sections", "templates", "snippets", "assets", "config", "locales"];
// =======================

// 1. 检查分支 (如果只允许 master 推送，保留此段；如果在其他分支也想推，请注释掉)
const BRANCH = execSync("git branch --show-current").toString().trim();
if (BRANCH !== "master") {
  console.log(`⛔ Refuse Shopify sync on branch: ${BRANCH}`);
  // 如果您希望非 master 分支只是跳过同步但不阻止 git push，请把 process.exit(1) 改为 process.exit(0)
  process.exit(0);
}

// 2. 获取最后一次 Commit (HEAD) 变动的文件列表
// 使用 git diff-tree 针对 HEAD 获取变动文件
console.log("🔍 Checking files in last commit (HEAD)...");
const CHANGED_FILES = execSync("git diff-tree --no-commit-id --name-only -r HEAD").toString().trim().split('\n');

// 3. 过滤文件，只保留属于 SYNC_DIRS 的文件
let FILES_TO_PUSH = [];
for (const file of CHANGED_FILES) {
  for (const dir of SYNC_DIRS) {
    if (file.startsWith(dir + "/")) {
      FILES_TO_PUSH.push(file);
      break;
    }
  }
}

// 4. 去重 (使用 sort -u 命令，与 Bash 脚本一致)
const filesString = FILES_TO_PUSH.join(' ');
FILES_TO_PUSH = execSync(`echo "${filesString}" | tr ' ' '\\n' | sort -u`).toString().trim().split('\n').filter(f => f.length > 0);

// 5. 如果没有相关文件变动，直接退出
if (FILES_TO_PUSH.length === 0) {
  console.log("ℹ️ No Shopify theme files changed in last commit.");
  process.exit(0);
}

console.log("📦 Shopify files to sync:");
FILES_TO_PUSH.forEach(f => console.log(`  - ${f}`));

// 6. 构建并执行 Shopify Push 命令
let CMD = `shopify theme push --store "${STORE}" --theme "${THEME_ID}" --allow-live`;

// 将文件列表拼接为 --only 参数
for (const f of FILES_TO_PUSH) {
  CMD += ` --only "${f}"`;
}

// 执行命令
console.log("🚀 Uploading to Shopify...");
try {
  execSync(CMD, { stdio: "inherit" });
  console.log("✅ Shopify theme sync completed");
  process.exit(0);
} catch (err) {
  console.error("❌ Shopify theme push failed");
  process.exit(1);
}
