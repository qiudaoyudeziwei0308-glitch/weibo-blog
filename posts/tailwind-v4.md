 ---
 title: "Tailwind CSS v4 新特性速览"
 date: "2026-07-04"
 tags: [技术, CSS, 前端]
 ---
 
 Tailwind CSS v4 带来了重大更新，从配置驱动转向 **CSS-first** 的开发体验。
 
 ## 主要变化
 
 ### 1. 无需配置文件
 
 不再需要 `tailwind.config.js`，直接在 CSS 中定义：
 
 ```css
 @import "tailwindcss";
 @theme {
   --color-primary: #1d9bf0;
 }
 ```
 
 ### 2. 新的引擎
 
 基于 Lightning CSS 构建，编译速度提升数倍。
 
 ### 3. 简化类名
 
 渐变、阴影等常用效果有了更简洁的写法。
 
 ---
 
 总的来说，v4 让 Tailwind 更接近"纯 CSS"的体验，值得升级尝试！
