"use client";
import Link from "next/link";
 import { site } from "@/lib/site";

export default function ProfileCard() {
  const { name, tagline, avatar } = site.profile;
  const initial = name[0];
  return (
    <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 mb-6 border border-[var(--border)]">
      <div className="flex items-start gap-4">
        {avatar ? (
          <img src={avatar} alt={name} className="w-16 h-16 rounded-full object-cover shrink-0" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-purple-500 flex items-center justify-center text-white text-xl font-bold shrink-0">{initial}</div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold">{name}</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">{tagline}</p>
        </div>
        <Link href="/about" className="px-4 py-1.5 rounded-full border border-[var(--border)] text-sm font-bold hover:bg-[var(--bg)] whitespace-nowrap">关于我</Link>
      </div>
    </div>
  );
}
