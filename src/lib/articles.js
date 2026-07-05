 const fs = require("fs");
 const path = require("path");
 const matter = require("gray-matter");
 
 const postsDir = path.join(process.cwd(), "posts");
 
 export function getAllArticles() {
   if (!fs.existsSync(postsDir)) return [];
   const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
   return files.map((file) => {
     const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
     const { data, content } = matter(raw);
     return {
       slug: file.replace(".md", ""),
       title: data.title || file,
       date: data.date ? new Date(data.date).toISOString() : null,
       tags: data.tags || [],
       excerpt: content.substring(0, 200).replace(/[#*`]/g, "").trim(),
       content,
     };
   }).sort((a, b) => new Date(b.date) - new Date(a.date));
 }
 
 export function getArticleBySlug(slug) {
   const filePath = path.join(postsDir, slug + ".md");
   if (!fs.existsSync(filePath)) return null;
   const raw = fs.readFileSync(filePath, "utf-8");
   const { data, content } = matter(raw);
   return { slug, title: data.title || slug, date: data.date ? new Date(data.date).toISOString() : null, tags: data.tags || [], content };
 }
 
 export function getAllTags() {
   const tags = new Set();
   getAllArticles().forEach((a) => a.tags.forEach((t) => tags.add(t)));
   return [...tags].sort();
 }
