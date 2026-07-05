 "use client";
 import { useState, useEffect } from "react";
 import Link from "next/link";
 import Header from "@/components/Header";
 
 export default function ArticlesPage() {
   const [articles, setArticles] = useState([]);
   const [loading, setLoading] = useState(true);
   const [activeTag, setActiveTag] = useState(null);
   const [allTags, setAllTags] = useState([]);
 
   useEffect(() => {
     fetch("/api/articles").then((r) => r.json()).then((data) => {
       setArticles(data);
       const tags = [...new Set(data.flatMap((a) => a.tags || []))].sort();
       setAllTags(tags);
       setLoading(false);
     }).catch(() => setLoading(false));
   }, []);
 
   const filtered = activeTag ? articles.filter((a) => a.tags?.includes(activeTag)) : articles;
 
   return (
     <div className="min-h-screen">
       <Header />
       <main className="max-w-2xl mx-auto px-4 py-6">
         <div className="flex items-center justify-between mb-6">
           <h1 className="text-2xl font-bold">文章</h1>
           <Link href="/" className="text-sm text-[var(--primary)] hover:underline">&larr; 首页</Link>
         </div>
 
         {allTags.length > 0 && (
           <div className="flex flex-wrap gap-2 mb-6">
             <button onClick={() => setActiveTag(null)}
               className={"px-3 py-1 rounded-full text-xs border " + (!activeTag ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "border-[var(--border)] hover:bg-[var(--bg-secondary)]")}>
               全部
             </button>
             {allTags.map((tag) => (
               <button key={tag} onClick={() => setActiveTag(tag)}
                 className={"px-3 py-1 rounded-full text-xs border " + (activeTag === tag ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "border-[var(--border)] hover:bg-[var(--bg-secondary)]")}>
                 {tag}
               </button>
             ))}
           </div>
         )}
 
         {loading ? (
           <div className="text-center py-12 text-[var(--text-secondary)]">加载中...</div>
         ) : filtered.length === 0 ? (
           <div className="text-center py-12 text-[var(--text-secondary)]">暂无文章</div>
         ) : (
           <div className="space-y-4">
             {filtered.map((article) => (
               <Link key={article.slug} href={"/articles/" + article.slug}
                 className="block border border-[var(--border)] rounded-2xl p-5 hover:bg-[var(--bg-secondary)] transition-colors">
                 <h2 className="text-lg font-bold mb-1">{article.title}</h2>
                 <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)] mb-2">
                   <time>{article.date ? new Date(article.date).toLocaleDateString("zh-CN") : ""}</time>
                   {article.tags?.map((t) => (
                     <span key={t} className="px-2 py-0.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)]">{t}</span>
                   ))}
                 </div>
                 <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{article.excerpt}</p>
               </Link>
             ))}
           </div>
         )}
       </main>
     </div>
   );
 }
