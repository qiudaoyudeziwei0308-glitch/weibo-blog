let posts = [
  { id: "1", content: "今天开始用 Next.js 搭建个人微博！🚀 记录技术学习和生活点滴。", createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), commentCount: 3, likeCount: 12, userId: "1", userName: "Feng", userImage: "" },
  { id: "2", content: "刚看完《重构：改善既有代码的设计》，Martin Fowler 的经典之作，推荐给每个开发者。📚", createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), commentCount: 5, likeCount: 28, userId: "1", userName: "Feng", userImage: "" },
  { id: "3", content: "探索 Tailwind CSS v4 的新特性，Utility-first 依然是高效开发的好伙伴。🎨", createdAt: new Date(Date.now() - 3600000 * 48).toISOString(), commentCount: 1, likeCount: 8, userId: "1", userName: "Feng", userImage: "" },
];

let comments = {
  "1": [
    { id: "c1", author: "小明", content: "加油！期待更多分享 🎉", time: "2小时前" },
    { id: "c2", author: "TechGirl", content: "Next.js 确实好用，SSR + 静态生成很强大", time: "1小时前" },
    { id: "c3", author: "代码爱好者", content: "我也在学 Next.js，一起交流！", time: "30分钟前" },
  ],
  "2": [
    { id: "c4", author: "Bookworm", content: "这本书我读了3遍，每次都有新收获", time: "23小时前" },
    { id: "c5", author: "DevJack", content: "代码整洁之道也值得一看", time: "20小时前" },
  ],
  "3": [
    { id: "c6", author: "CSS大师", content: "Tailwind v4 的 CSS-first 配置理念很棒", time: "2天前" },
  ],
};

let nextPostId = 4;
let nextCommentId = 7;
 let likedPosts = new Set();
 
 const fs = require("fs");
 const path = require("path");
 const DATA_DIR = path.join(process.cwd(), "data");
 
function saveAll() {
  try {
    const dir = DATA_DIR;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "posts.json"), JSON.stringify(posts, null, 2), "utf-8");
    fs.writeFileSync(path.join(dir, "comments.json"), JSON.stringify(comments, null, 2), "utf-8");
    fs.writeFileSync(path.join(dir, "meta.json"), JSON.stringify({ nextPostId, nextCommentId }), "utf-8");
  } catch (e) {
    // Vercel 环境无法写文件，静默降级为内存存储
  }
}
 
 // 尝试从文件恢复数据，失败则用默认数据
 try {
   if (fs.existsSync(path.join(DATA_DIR, "posts.json"))) {
     posts = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "posts.json"), "utf-8"));
     comments = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "comments.json"), "utf-8"));
     const meta = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "meta.json"), "utf-8"));
     nextPostId = meta.nextPostId;
     nextCommentId = meta.nextCommentId;
   }
 } catch (e) {}

export function getPosts() {
  return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getPost(id) {
  return posts.find((p) => p.id === id) || null;
}

 export function createPost(content, user) {
  const post = {
    id: String(nextPostId++),
    content,
    createdAt: new Date().toISOString(),
    commentCount: 0,
    likeCount: 0,
   userId: user?.id || "0",
   userName: user?.name || "匿名",
   userImage: user?.image || "",
  };
  posts.push(post);
  comments[post.id] = [];
  saveAll();
  return post;
}
 
 export function toggleLike(postId) {
   const post = posts.find((p) => p.id === postId);
   if (!post) return null;
   if (likedPosts.has(postId)) {
     likedPosts.delete(postId);
     post.likeCount = Math.max(0, (post.likeCount || 0) - 1);
     return { liked: false, likeCount: post.likeCount };
   } else {
     likedPosts.add(postId);
     post.likeCount = (post.likeCount || 0) + 1;
     return { liked: true, likeCount: post.likeCount };
   }
 }
 
 export function isLiked(postId) {
   return likedPosts.has(postId);
 }

export function getComments(postId) {
  return comments[postId] || [];
}

export function createComment(postId, author, content) {
  const comment = {
    id: "c" + nextCommentId++,
    author,
    content,
    time: "刚刚",
   authorImage: "",
  };
  if (!comments[postId]) comments[postId] = [];
  comments[postId].push(comment);
  const post = posts.find((p) => p.id === postId);
  if (post) post.commentCount = (post.commentCount || 0) + 1;
   saveAll();
  return comment;
}
