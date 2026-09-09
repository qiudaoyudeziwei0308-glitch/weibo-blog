"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import CommentBox from "@/components/CommentBox";

export default function PostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/posts/" + id).then((r) => r.json()),
      fetch("/api/posts/" + id + "/comments").then((r) => r.json()),
    ]).then(([postData, commentsData]) => {
      setPost(postData);
      setComments(commentsData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const handleNewComment = (newComment) => setComments((prev) => [...prev, newComment]);

  if (loading) return (
    <div className="min-h-screen"><Header /><div className="text-center py-20 text-[var(--text-secondary)]">加载中...</div></div>
  );
  if (!post) return (
    <div className="min-h-screen"><Header /><div className="text-center py-20 text-[var(--text-secondary)]">内容不存在</div></div>
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-6">
        <button onClick={() => router.back()} className="mb-4 text-[var(--primary)] hover:underline text-sm">&larr; 返回</button>
        <PostCard post={post} expanded />
        <CommentBox postId={id} onComment={handleNewComment} />
        <div className="mt-6 space-y-3">
          <h3 className="font-bold text-lg">评论 ({comments.length})</h3>
          {comments.length === 0 && <p className="text-[var(--text-secondary)] text-sm">暂无评论，来说两句吧</p>}
          {comments.map((c, i) => (
            <div key={c.id || i} className="border border-[var(--border)] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                {c.authorImage ? (
                  <img src={c.authorImage} alt="" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-sm font-bold">
                    {c.author?.[0] || "?"}
                  </div>
                )}
                <span className="font-bold text-sm">{c.author}</span>
                <span className="text-[var(--text-secondary)] text-xs">{c.time}</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{c.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
