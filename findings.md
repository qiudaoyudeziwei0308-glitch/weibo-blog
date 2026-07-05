 # Findings & Decisions
 
 ## Requirements
 - 类微博信息流，短内容发布
 - 个人主页展示（头像、简介、统计）
 - 文章/长文模块
 - 评论互动
 - 点赞交互
 - 他人可访问浏览（需要部署上线）
 - 数据持久化
 
 ## Technical Findings
 - Next.js 16 使用 Turbopack 作为默认打包器，速度极快
 - Next.js App Router 中 API 路由放在 `src/app/api/` 目录下
 - Tailwind CSS v4 使用 `@import "tailwindcss"` 替代配置文件
 - Tailwind v4 的 typography 插件使用 `@plugin "@tailwindcss/typography"` 导入
 - PowerShell 中 `[slug]` 目录名会被解释为通配符，需特殊处理
 - Next.js 开发服务器重启后内存数据丢失，需文件持久化
 - `npx ngrok` 在受限网络环境中可能超时
 
 ## Technical Decisions
 | Decision | Rationale |
 |----------|-----------|
 | Next.js App Router | 现代 React 框架，SSR/SSG 支持 |
 | Tailwind CSS v4 | Utility-first，CSS-first 配置 |
 | Markdown 文章存储 | 文件系统管理，Git 版本控制友好 |
 | 内存 + JSON 文件持久化 | 简单可靠，无需数据库 |
 | Giscus 类型评论 | 自建评论系统，无第三方依赖 |
 | Vercel 部署 | 免费，Next.js 原生支持 |
 
 ## Resources
 - 项目根目录: `C:\Users\fgh33\Documents\个人博客`
 - 开发服务器: `http://localhost:3000`
 - next.config.mjs: 构建配置
 - package.json: 依赖管理
 - data/: 持久化数据目录
 - posts/: Markdown 文章目录
 
 ## Visual/Browser Findings
 - 首页信息流布局：Header → 个人信息卡片 → 发布框 → 动态列表 → 文章推荐
 - 动态卡片包含：头像、昵称、时间、内容、评论数、点赞按钮
 - 文章列表包含：标题、日期、标签、摘要
 - 暗色模式切换正常
 - 点赞切换即时生效 ❤️/♡
 
 *Update this file after every 2 view/browser/search operations*
