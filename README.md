# Yukino Wan Stickers

一个简洁的贴纸展示站点，采用粗野主义设计风格。

## 技术栈

- **Astro** - 静态站点生成器
- **Tailwind CSS v4** - CSS 框架
- **TypeScript** - 类型安全
- **React (Astro Islands)** - 复制按钮交互

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发服务器
pnpm dev

# 构建
pnpm build

# 预览构建结果
pnpm preview
```

## 如何添加贴纸

### 方式一：AI 自动生成 Metadata（推荐）

使用 Gemini Pro 多模态能力自动分析贴纸并生成 metadata：

```bash
# 1. 将 PNG 贴纸放入 src/assets/stickers/ 目录

# 2. 设置 API Key（从 Google AI Studio 获取）
export GOOGLE_GENERATIVE_AI_API_KEY="your-api-key"
# 或
export GEMINI_API_KEY="your-api-key"

# 3. 运行生成脚本
pnpm generate-metadata

# 脚本会生成 src/data/stickers-generated.ts
# 包含每张贴纸的 emoji、alt 文本和标签
```

### 方式二：手动添加

1. 将 **PNG** 文件放入 `src/assets/stickers/` 目录
2. 在 `src/data/stickers-generated.ts` 中添加条目（参考现有示例）：

```typescript
{
  id: 'unique-id',        // 唯一标识符
  file: 'sticker-09.png', // 文件名
  emoji: ['🎉', '✨'],     // 对应的 Unicode emoji
  alt: '庆祝',            // 替代文字（无障碍）
  tags: ['party', 'fun']  // 可选标签
}
```

3. 重新构建项目

### AI 生成脚本的输出

脚本会为每张贴纸生成：
- **emoji**: 1-3 个最能表达情感的 Unicode emoji
- **alt**: 中文描述（无障碍）
- **tags**: 3-5 个标签用于分类
- **mood**: 情绪分类（happy/sad/angry/excited 等）

生成后可在 `stickers-generated.ts` 中手动微调。

## 如何修改色板

编辑 `src/styles/global.css` 中的 CSS 变量：

```css
:root {
  /* 主色调 */
  --color-primary: #1a1a1a;
  --color-primary-text: #ffffff;
  
  /* 强调色 */
  --color-accent: #ff3b30;
  --color-accent-text: #ffffff;
  
  /* 背景色 */
  --color-bg: #f5f5f0;
  --color-bg-card: #ffffff;
  
  /* 边框 */
  --color-border: #1a1a1a;
  --border-width: 3px;
}
```

## 字体来源与接入方式

本项目使用 **ChillRoundF**（寒蝉圆体）作为界面字体。

- **来源**: https://github.com/justfont/ChillRoundF
- **许可证**: SIL Open Font License 1.1
- **格式**: WOFF2（体积优化）

字体文件放置在 `public/fonts/ChillRoundF.woff2`，通过 `@font-face` 本地加载：

```css
@font-face {
  font-family: 'ChillRoundF';
  src: url('/fonts/ChillRoundF.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;  /* 优化首屏加载 */
}
```

## 复制功能的浏览器限制

点击「复制贴纸」按钮时，系统会按以下优先级尝试：

1. **复制 PNG 图片**（最理想）- 直接在聊天软件中粘贴
2. **复制图片 URL** - 需要手动下载或使用链接
3. **触发图片下载** - 作为最终 fallback

### 浏览器兼容性

| 功能 | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| 复制图片 | ✅ 76+ | ⚠️ 部分支持 | ⚠️ 部分支持 | ✅ 79+ |
| 复制 URL | ✅ 全部 | ✅ 全部 | ✅ 全部 | ✅ 全部 |
| 触发下载 | ✅ 全部 | ✅ 全部 | ✅ 全部 | ✅ 全部 |

### 安全上下文要求

Clipboard API 仅在以下环境可用：
- ✅ HTTPS 网站
- ✅ localhost（开发环境）
- ❌ HTTP 生产环境

如果站点部署在非 HTTPS 环境，复制功能会自动降级为图片下载。

## 项目结构

```
├── public/
│   ├── fonts/              # 字体文件
│   │   └── ChillRoundF.woff2
│   └── favicon.svg
├── scripts/
│   └── generate-sticker-metadata.ts  # AI 生成 metadata 脚本
├── src/
│   ├── assets/
│   │   └── stickers/           # 贴纸 PNG 资源 (0.png, 1.png...)
│   ├── data/
│   │   └── stickers-generated.ts  # AI 生成的数据文件
│   ├── scripts/
│   │   └── copy-sticker.ts        # 复制功能实现
│   ├── styles/
│   │   └── global.css             # 全局样式与 CSS 变量
│   └── pages/
│       └── index.astro            # 首页
├── astro.config.mjs
├── package.json
└── README.md
```

## 获取 Gemini API Key

1. 访问 [Google AI Studio](https://aistudio.google.com/)
2. 登录 Google 账号
3. 点击 "Get API Key"
4. 创建新的 API Key
5. 设置环境变量：`export GOOGLE_GENERATIVE_AI_API_KEY="your-key"`

**注意**: 
- Gemini 2.0 Flash 目前免费额度较充足
- 如需更高质量，可将脚本中的模型改为 `gemini-2.0-pro-exp`

## 待办 / 未来扩展

- [ ] Discord 贴纸包
- [ ] WhatsApp 贴纸包
- [ ] LINE 贴纸包
- [ ] 搜索/筛选功能
- [ ] 深色模式
- [ ] 按情绪筛选贴纸
