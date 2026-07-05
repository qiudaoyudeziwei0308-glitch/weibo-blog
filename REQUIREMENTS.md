 # 个人微博博客 — 项目需求配置文档

 ## 项目概述
 基于 Next.js 构建的个人微博风格博客，支持短内容发布、个人信息展示、评论互动、公开访问。

 ---

 ## Phase 1：基础框架 ✅（已完成）
 - [x] Next.js 项目初始化 + Tailwind CSS 配置
 - [x] 首页信息流布局（Header + 内容区）
 - [x] 导航系统（首页 / 关于 / 暗色模式切换）
 - [x] 全局样式系统（CSS 变量、主题切换、渐变背景）

 ## Phase 2：核心功能 ✅（已完成）
 - [x] 个人信息卡片 -- 头像、简介、统计数据
 - [x] 发布动态框 -- 输入、字数限制、发布
 - [x] 动态卡片 -- 内容、时间、互动计数
 - [x] 动态详情页 + 评论系统
 - [x] 后端 API（CRUD）-- 增删改查
 - [x] 关于我页面

## Phase 3：内容丰富 ⬅️ 下一阶段
 - [x] 文章/长文模块（Markdown 渲染）
 - [x] 内容分类/标签系统
 - [ ] 图片上传功能（下一期）
 - [ ] 表情选择器（下一期）

## Phase 4：用户交互
 - [x] 点赞 / 收藏互动
- [ ] 关注 / 粉丝系统
- [ ] @提及 和 #话题 功能
- [ ] 转发 / 引用动态

 ## Phase 5：数据持久化 ⬅️
 - [ ] 接入数据库
 - [ ] 数据迁移与备份
 - [ ] API 缓存优化

## Phase 6：用户体验
- [ ] 响应式适配（移动端/平板/桌面）
- [ ] 加载骨架屏 / 过渡动画
- [ ] 内容分页 / 无限滚动
 - [ ] 消息通知系统

## Phase 7：部署上线
- [ ] Vercel / 自有服务器部署
- [ ] 自定义域名绑定
- [ ] SEO 优化（Sitemap、OG 标签）
 - [ ] 统计分析接入

 ---

 ## 当前项目结构
 src/app/ -- 页面和 API 路由
 src/components/ -- UI 组件
 src/lib/data.js -- 内存数据层
 posts/ -- Markdown 文章目录

 ## 技术栈
 Next.js 16 | React 19 | Tailwind CSS 4 | CSS Variables | gray-matter | react-markdown

 ## 如何运行
 npm run dev  →  http://localhost:3000
 npm run build → 生产构建
 npm start  → 生产启动
