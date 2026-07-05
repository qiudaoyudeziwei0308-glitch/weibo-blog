 "use client";
 import { useState, useEffect } from "react";
 import { useParams } from "next/navigation";
 import Link from "next/link";
 import Header from "@/components/Header";
 import ReactMarkdown from "react-markdown";
 import remarkGfm from "remark-gfm";
 
 export default function ArticleDetail() {
   const { slug } = useParams();
   const [article, setArticle] = useState(null);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     fetch("/api/articles/" + slug)
       .then((r) => r.json())
       .then((data) => { setArticle(data); setLoading(false); })
       .catch(() => setLoading(false));
   }, [slug]);
 
   if (loading) return <div className="min-h-screen"><Header /><div className="text-center py-20 text-[var(--text-secondary)]">加载中...</div></div>;
   if (!article) return <div className="min-h-screen"><Header /><div className="text-center py-20 text-[var(--text-secondary)]">文章不存在</div></div>;
 
   return (
     <div className="min-h-screen">
       <Header />
       <main className="max-w-2xl mx-auto px-4 py-6">
         <Link href="/articles" className="text-sm text-[var(--primary)] hover:underline mb-6 inline-block">&larr; 返回文章列表</Link>
         <article className="border border-[var(--border)] rounded-2xl p-6 md:p-8">
           <header className="mb-6">
             <h1 className="text-2xl md:text-3xl font-bold mb-3">{article.title}</h1>
             <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
               <time>{article.date ? new Date(article.date).toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" }) : ""}</time>
               {article.tags?.map((t) => (
                 <Link key={t} href={"/articles?tag=" + t} className="px-2 py-0.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] text-xs hover:text-[var(--primary)]">{t}</Link>
               ))}
             </div>
           </header>
           <div className="prose prose-sm max-w-none">
             <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
           </div>
         </article>
       </main>
     </div>
   );
 }
