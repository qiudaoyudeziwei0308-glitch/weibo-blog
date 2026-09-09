"use client";
import { useState } from "react";
 import { useSession } from "next-auth/react";

export default function CommentBox({ postId, onComment }) {
  const { data: session } = useSession();
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() === "") return;
    if (!session && author.trim() === "") return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/posts/" + postId + "/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: session ? "" : author.trim(),
          content: content.trim(),
        }),
      });
      const newComment = await res.json();
      onComment(newComment);
      setContent("");
    } catch (err) { alert("评论失败，请重试"); }
    setSubmitting(false);
  };
  return (
    <form onSubmit={handleSubmit} className="mt-6 border border-[var(--border)] rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        {session?.user?.image ? (
          <img src={session.user.image} alt="" className="w-6 h-6 rounded-full object-cover" />
        ) : (
          <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-xs font-bold">
            {(session?.user?.name || author || "?")[0]}
          </div>
        )}
        <h3 className="font-bold text-sm">
          {session ? `以 ${session.user.name} 的身份评论` : "发表评论"}
        </h3>
      </div>
      {!session && (
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="你的昵称"
          className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm mb-3 outline-none focus:border-[var(--primary)]" />
      )}
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="写下你的评论..."
        className="w-full bg-transparent border border-[var(--border)] rounded-lg px-3 py-2 text-sm min-h-[60px] outline-none resize-none focus:border-[var(--primary)]" maxLength={300} />
      <div className="flex justify-end mt-2">
        <button type="submit" disabled={(session ? false : !author.trim()) || !content.trim() || submitting}
          className="px-4 py-1.5 rounded-full bg-[var(--primary)] text-white font-bold text-sm disabled:opacity-50">
          {submitting ? "提交中..." : "发送"}
        </button>
      </div>
    </form>
  );
}
