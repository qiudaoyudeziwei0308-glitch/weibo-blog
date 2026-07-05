 "use client";
 import { useState, useEffect } from "react";
 import Link from "next/link";
 import Header from "@/components/Header";
 
 export default function TagsPage() {
   const [tags, setTags] = useState({});
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     fetch("/api/articles").then((r) => r.json()).then((articles) => {
       const map = {};
       articles.forEach((a) => {
         (a.tags || []).forEach((t) => {
           if (!map[t]) map[t] = [];
           map[t].push(a);
         });
       });
       setTags(map);
       setLoading(false);
     }).catch(() => setLoading(false));
   }, []);
 
   return (
     <div className="min-h-screen">
       <Header />
       <main className="max-w-2xl mx-auto px-4 py-6">
         <div className="flex items-center justify-between mb-6">
           <h1 className="text-2xl font-bold">标签</h1>
           <Link href="/" className="text-sm text-[var(--primary)] hover:underline">&larr; 首页</Link>
         </div>
         {loading ? (
           <div className="text-center py-12 text-[var(--text-secondary)]">加载中...</div>
         ) : Object.keys(tags).length === 0 ? (
           <div className="text-center py-12 text-[var(--text-secondary)]">暂无标签</div>
         ) : (
           <div className="space-y-8">
             {Object.entries(tags).sort().map(([tag, articles]) => (
               <div key={tag} className="border border-[var(--border)] rounded-2xl p-5">
                 <h2 className="font-bold text-lg mb-3">
                   <span className="px-3 py-1 rounded-full bg-[var(--primary)] text-white text-sm">#{tag}</span>
                   <span className="text-[var(--text-secondary)] text-sm ml-2">{articles.length} 篇</span>
                 </h2>
                 <div className="space-y-2">
                   {articles.map((a) => (
                     <Link key={a.slug} href={"/articles/" + a.slug}
                       className="block text-sm hover:text-[var(--primary)] py-1">
                       {a.title}
                       <span className="text-[var(--text-secondary)] ml-2 text-xs">{new Date(a.date).toLocaleDateString("zh-CN")}</span>
                     </Link>
                   ))}
                 </div>
               </div>
             ))}
           </div>
         )}
       </main>
     </div>
   );
 }
