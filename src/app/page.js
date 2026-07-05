"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import ComposeBox from "@/components/ComposeBox";
import ProfileCard from "@/components/ProfileCard";

export default function Home() {
 const [posts, setPosts] = useState([]);
 const [loading, setLoading] = useState(true);
 const [articles, setArticles] = useState([]);

 useEffect(() => {
   Promise.all([
     fetch("/api/posts").then((r) => r.json()),
     fetch("/api/articles").then((r) => r.json()),
   ]).then(([postsData, articlesData]) => {
     setPosts(postsData);
     setArticles(articlesData.slice(0, 3));
     setLoading(false);
   });
 }, []);

  const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-6">
        <ProfileCard />
        <ComposeBox onPost={handleNewPost} />
        <div className="space-y-4 mt-4">
          {loading ? (
            <div className="text-center py-8 text-secondary">加载中...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8 text-secondary">暂无内容</div>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
         )}
       </div>
 
       {articles.length > 0 && (
         <section className="mt-10">
           <div className="flex items-center justify-between mb-4">
             <h2 className="font-bold text-lg">最新文章</h2>
             <a href="/articles" className="text-sm text-[var(--primary)] hover:underline">查看全部 →</a>
           </div>
           <div className="space-y-3">
             {articles.map((article) => (
               <a key={article.slug} href={"/articles/" + article.slug}
                 className="block border border-[var(--border)] rounded-xl p-4 hover:bg-[var(--bg-secondary)] transition-colors">
                 <h3 className="font-bold text-sm">{article.title}</h3>
                 <div className="flex items-center gap-2 mt-1 text-xs text-[var(--text-secondary)]">
                   <time>{article.date ? new Date(article.date).toLocaleDateString("zh-CN") : ""}</time>
                   {article.tags?.map((t) => (
                     <span key={t} className="px-1.5 py-0.5 rounded bg-[var(--bg-secondary)]">{t}</span>
                   ))}
                 </div>
               </a>
             ))}
           </div>
         </section>
       )}
     </main>
   </div>
 );
}
