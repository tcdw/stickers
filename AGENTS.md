# AGENTS.md

## 项目目标

- 维护 Yukino Wan stickers 静态站点与贴纸展示体验
- 核心工作是贴纸素材管理、元数据生成、UI/交互优化

## 技术栈

- Astro 5（静态站点）
- React（Astro Islands）
- Tailwind CSS v4
- TypeScript
- 使用 Bun

## 目录约定

- `src/assets/stickers/`：PNG/JPG 贴纸素材
- `src/data/stickers-generated.ts`：自动生成的贴纸数据（尽量不要手动改）
- `src/pages/`：页面路由
- `src/components/`：组件（含 React Islands）
- `public/twemoji/`：Twemoji SVG 资源输出目录
- `public/favicon-*.png`、`public/favicon.ico`：favicon 输出
- `dist/`：构建产物（无需手动编辑）

## 常用命令

- `bun install`
- `bun dev`
- `bun build`
- `bun preview`

## 贴纸工作流

- 将贴纸图片放入 `src/assets/stickers/`（PNG/JPG）
- 自动生成 metadata（推荐）：
  - 设置 `GOOGLE_GENERATIVE_AI_API_KEY` 或 `GEMINI_API_KEY`
  - 运行 `bun generate-metadata`
  - 脚本会生成/更新 `src/data/stickers-generated.ts`
- `src/data/stickers-generated.ts` 可手动微调，但再次运行脚本会覆盖

## Twemoji 资源

- 运行 `bun fetch-twemoji` 以下载贴纸对应 emoji 的 SVG
- 可选环境变量：`TWEMOJI_VERSION`、`TWEMOJI_BASE_URL`

## 脚本编写

Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Use `bunx <package> <command>` instead of `npx <package> <command>`
- Bun automatically loads .env, so don't use dotenv.

### APIs

- `Bun.serve()` supports WebSockets, HTTPS, and routes. Don't use `express`.
- `bun:sqlite` for SQLite. Don't use `better-sqlite3`.
- `Bun.redis` for Redis. Don't use `ioredis`.
- `Bun.sql` for Postgres. Don't use `pg` or `postgres.js`.
- `WebSocket` is built-in. Don't use `ws`.
- Prefer `Bun.file` over `node:fs`'s readFile/writeFile
- Bun.$`ls` instead of execa.

### Testing

Use `bun test` to run tests.

```ts#index.test.ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```

For more information, read the Bun API docs in `node_modules/bun-types/docs/**.mdx`.

## Git/提交规范

- 启用 githooks：`bun setup-githooks`（或 `git config core.hooksPath .githooks`）
- 提交信息使用 Conventional Commits（如 `feat(ui): add sticker filter`）
