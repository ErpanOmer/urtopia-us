#!/usr/bin/env node
import { execSync } from 'node:child_process';

// ========= 配置 =========
const STORE = "urtopia.myshopify.com";
const THEME_ID = "133930189048";
const SYNC_DIRS = ["sections", "templates", "snippets", "assets", "config", "locales"];
const BRANCH = execSync("git branch --show-current").toString().trim();
if (BRANCH !== "master") {
  console.error(`⛔ Refuse Shopify sync on branch: ${BRANCH}`);
  process.exit(1);
}

// 获取本次提交改动文件
let changedFiles;
try {
  changedFiles = execSync("git diff --name-only @{u}..HEAD").toString().split("\n");
} catch (err) {
  // fallback 如果没有 upstream
  changedFiles = execSync("git diff --name-only HEAD~1").toString().split("\n");
}

// 过滤 theme 文件
const filesToPush = Array.from(new Set(
  changedFiles.filter(f => SYNC_DIRS.some(dir => f.startsWith(dir + "/")))
));

if (filesToPush.length === 0) {
  console.log("ℹ️ No Shopify theme files changed");
  process.exit(0);
}

console.log("📦 Shopify files to sync:");
filesToPush.forEach(f => console.log("  -", f));

// 拼接一次命令，使用多个 --only
let cmd = `shopify theme push --store ${STORE} --theme ${THEME_ID} --allow-live`;
filesToPush.forEach(f => {
  cmd += ` --only "${f}"`;
});

try {
  execSync(cmd, { stdio: "inherit" });
  console.log("✅ Shopify theme sync completed");
} catch (err) {
  console.error("❌ Shopify theme push failed");
  process.exit(1);
}
