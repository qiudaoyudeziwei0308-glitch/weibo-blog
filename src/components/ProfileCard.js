"use client";
import Link from "next/link";
export default function ProfileCard() {
  return (
    <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 mb-6 border border-[var(--border)]">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-purple-500 flex items-center justify-center text-white text-xl font-bold shrink-0">F</div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold">Feng</h1>
          <p className="text-[var(--text-secondary)] text-sm">全栈开发者 · 技术爱好者</p>
          <p className="text-[var(--text-secondary)] text-xs mt-1">分享想法，记录生活</p>
          <div className="flex gap-4 mt-3 text-sm">
            <span><strong>42</strong> <span className="text-[var(--text-secondary)]">关注</span></span>
            <span><strong>128</strong> <span className="text-[var(--text-secondary)]">粉丝</span></span>
          </div>
        </div>
        <Link href="/about" className="px-4 py-1.5 rounded-full border border-[var(--border)] text-sm font-bold hover:bg-[var(--bg)]">编辑资料</Link>
      </div>
    </div>
  );
}
