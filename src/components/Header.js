"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [dark, setDark] = useState(false);
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };
 return (
   <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-sm">
     <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
       <Link href="/" className="text-xl font-bold text-[var(--primary)]">&#x1F4AC; 我的微博</Link>
       <nav className="flex items-center gap-4 text-sm">
         <Link href="/" className="font-medium hover:text-[var(--primary)]">首页</Link>
         <Link href="/articles" className="font-medium hover:text-[var(--primary)]">文章</Link>
         <Link href="/tags" className="font-medium hover:text-[var(--primary)]">标签</Link>
         <Link href="/about" className="font-medium hover:text-[var(--primary)]">关于</Link>
         <button onClick={toggleTheme} className="px-3 py-1 rounded-full border border-[var(--border)] text-sm hover:bg-[var(--bg-secondary)]">
           {dark ? "☀️" : "🌙"}
         </button>
       </nav>
     </div>
   </header>
 );
}
