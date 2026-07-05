"use client";
import { useState } from "react";
 import { useSession } from "next-auth/react";
 import Link from "next/link";

export default function ComposeBox({ onPost }) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
 
  if (!session) {
    return (
      <div className="border border-[var(--border)] rounded-2xl p-6 mb-4 text-center">
        <p className="text-[var(--text-secondary)] text-sm mb-3">登录后即可发布动态</p>
        <Link href="/login" className="px-5 py-1.5 rounded-full bg-[var(--primary)] text-white font-bold text-sm inline-block">登录</Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setPosting(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim() }),
      });
      const newPost = await res.json();
      onPost(newPost);
      setContent("");
    } catch (err) { alert("发布失败，请重试"); }
    setPosting(false);
  };
  return (
   <div className="mb-4">
     <div className="flex items-center gap-3 mb-3">
       {session.user.image ? (
         <img src={session.user.image} alt="" className="w-10 h-10 rounded-full object-cover" />
       ) : (
         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-purple-500 flex items-center justify-center text-white text-sm font-bold">{session.user.name[0]}</div>
       )}
       <span className="font-bold text-sm">{session.user.name}</span>
     </div>
    <form onSubmit={handleSubmit} className="border border-[var(--border)] rounded-2xl p-4 mb-4">
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="有什么想说的？"
        className="w-full bg-transparent border-none outline-none resize-none text-base min-h-[80px] placeholder:text-[var(--text-secondary)]" maxLength={500} />
      <div className="flex items-center justify-between mt-2 pt-3 border-t border-[var(--border)]">
        <span className="text-xs text-[var(--text-secondary)]">{content.length}/500</span>
        <button type="submit" disabled={!content.trim() || posting}
          className="px-5 py-1.5 rounded-full bg-[var(--primary)] text-white font-bold text-sm disabled:opacity-50 hover:bg-[var(--primary-hover)]">
          {posting ? "发布中..." : "发布"}
        </button>
      </div>
    </form>
   </div>
  );
}
