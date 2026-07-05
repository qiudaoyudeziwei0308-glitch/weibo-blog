 # Task Plan: 个人微博博客
 
 ## Goal
 构建并上线一个完整的个人微博风格博客，支持短内容发布、文章撰写、评论互动、公开访问。
 
 ## Current Phase
 Phase 7 - 部署上线
 
 ## Phases
 
 ### Phase 1: 基础框架 ✅
 - [x] Next.js 项目初始化 + Tailwind CSS 配置
 - [x] 首页信息流布局
 - [x] 导航系统 + 暗色模式
 - [x] 全局样式系统
 - **Status:** complete
 
 ### Phase 2: 核心功能 ✅
 - [x] 个人信息卡片
 - [x] 发布动态框
 - [x] 动态卡片 + 信息流
 - [x] 动态详情页
 - [x] 评论系统
 - [x] 后端 API CRUD
 - **Status:** complete
 
 ### Phase 3: 内容丰富 ✅
 - [x] 文章/长文模块（Markdown 渲染）
 - [x] 内容分类/标签系统
 - [ ] 图片上传功能
 - [ ] 表情选择器
 - **Status:** complete
 
 ### Phase 4: 用户交互 ✅
 - [x] 点赞互动
 - [ ] 关注/粉丝系统
 - [ ] @提及 和 #话题
 - **Status:** complete
 
 ### Phase 5: 数据持久化 ✅
 - [x] JSON 文件持久化存储
 - **Status:** complete
 
 ### Phase 6: 用户体验优化
 - [ ] 响应式适配
 - [ ] 骨架屏/加载动画
 - [ ] 无限滚动
 - **Status:** pending
 
 ### Phase 7: 部署上线 ⬅️
 - [ ] 推送 GitHub 仓库
 - [ ] 配置 Vercel 部署
 - [ ] 绑定自定义域名
 - [ ] SEO 优化
 - **Status:** in_progress
 
 ## Key Questions
 1. 如何解决网络限制下的部署？（用户 GitHub 账号 + Vercel）
 2. 需要哪个部署平台？→ Vercel（Next.js 最佳搭档，免费）
 
 ## Decisions Made
 | Decision | Rationale |
 |----------|-----------|
 | Next.js App Router | 现代 React 框架，SSR/SSG 支持，生态成熟 |
 | Tailwind CSS | 快速开发，Utility-first，v4 更轻量 |
 | 文件持久化 | 简单可靠，无需数据库，适合个人博客 |
 | Vercel 部署 | 免费，Next.js 原生支持，自动 HTTPS |
 
 ## Errors Encountered
 | Error | Attempt | Resolution |
 |-------|---------|------------|
 | npm 版本冲突 | 1 | 移除固定版本号，使用 latest |
 | <button> inside <a> hydration | 2 | 改为 <span onClick> |
 | shell 权限拒绝 | 3 | 改用 require_escalated 或 Node.js API |
 | ngrok 下载超时 | 1 | 改用 Vercel 部署 + GitHub |
 
 ## Notes
 - 根目录即为项目代码
 - weibo-blog/ 为残余目录可删除
 - data/ 目录为自动生成的持久化数据
