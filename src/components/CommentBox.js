"use client";
import { useState } from "react";

export default function CommentBox({ postId, onComment }) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/posts/" + postId + "/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: author.trim(), content: content.trim() }),
      });
      const newComment = await res.json();
      onComment(newComment);
      setContent("");
    } catch (err) { alert("评论失败，请重试"); }
    setSubmitting(false);
  };
  return (
    <form onSubmit={handleSubmit} className="mt-6 border border-[var(--border)] rounded-2xl p-4">
      <h3 className="font-bold text-sm mb-3">发表评论</h3>
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="你的昵称"
        className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm mb-3 outline-none focus:border-[var(--primary)]" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="写下你的评论..."
        className="w-full bg-transparent border border-[var(--border)] rounded-lg px-3 py-2 text-sm min-h-[60px] outline-none resize-none focus:border-[var(--primary)]" maxLength={300} />
      <div className="flex justify-end mt-2">
        <button type="submit" disabled={!author.trim() || !content.trim() || submitting}
          className="px-4 py-1.5 rounded-full bg-[var(--primary)] text-white font-bold text-sm disabled:opacity-50">
          {submitting ? "提交中..." : "发送"}
        </button>
      </div>
    </form>
  );
}
