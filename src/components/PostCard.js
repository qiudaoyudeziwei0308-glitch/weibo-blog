"use client";
import Link from "next/link";
 import { useState } from "react";

export default function PostCard({ post, expanded }) {
  const [liked, setLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return mins + "分钟前";
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + "小时前";
    return new Date(dateStr).toLocaleDateString("zh-CN");
  };

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await fetch("/api/posts/" + post.id + "/like", { method: "POST" });
    const data = await res.json();
    setLiked(data.liked);
    setLikeCount(data.likeCount);
  };

  const Wrapper = expanded ? "div" : Link;
  const wrapperProps = expanded ? {} : { href: "/posts/" + post.id };
  return (
    <Wrapper {...wrapperProps} className="block border border-[var(--border)] rounded-2xl p-4 hover:bg-[var(--bg-secondary)] transition-colors">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-purple-500 flex items-center justify-center text-white text-sm font-bold shrink-0">F</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold">Feng</span>
            <span className="text-[var(--text-secondary)]">@feng</span>
            <span className="text-[var(--text-secondary)]">·</span>
            <span className="text-[var(--text-secondary)] text-xs">{timeAgo(post.createdAt)}</span>
          </div>
          <p className="mt-1 text-sm whitespace-pre-wrap leading-relaxed">{post.content}</p>
          {!expanded && (
            <div className="flex gap-6 mt-3 text-[var(--text-secondary)] text-sm">
              <Link href={"/posts/" + post.id} onClick={(e) => e.stopPropagation()} className="hover:text-[var(--primary)]">&commat; {post.commentCount || 0}</Link>
              <span onClick={handleLike} className={"cursor-pointer hover:text-red-500 transition-colors " + (liked ? "text-red-500" : "")}>
                {liked ? "❤️" : "♡"} {likeCount}
              </span>
            </div>
          )}
          {expanded && (
            <div className="flex gap-6 mt-4 pt-3 border-t border-[var(--border)] text-[var(--text-secondary)] text-sm">
              <span>&commat; {post.commentCount || 0} 评论</span>
              <span onClick={handleLike} className={"cursor-pointer hover:text-red-500 transition-colors " + (liked ? "text-red-500" : "")}>
                {liked ? "❤️" : "♡"} {likeCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
