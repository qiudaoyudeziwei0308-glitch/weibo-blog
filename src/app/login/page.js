"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
 import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const router = useRouter();

 const handleOAuth = async (provider) => {
   setLoading(provider);
   try {
     const result = await signIn(provider, { callbackUrl: "/", redirect: false });
     if (result?.url) {
       window.location.href = result.url;
     } else {
       setError("登录失败，请重试");
       setLoading("");
     }
   } catch (err) {
     setError("登录服务异常，请稍后重试");
     setLoading("");
   }
 };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading("credentials");
    const result = await signIn("credentials", {
      username,
      password,
       redirect: false,
     });
     if (result?.error) {
      setError("用户名或密码错误");
    } else {
      router.push("/");
      router.refresh();
    }
    setLoading("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
     <div className="w-full max-w-sm mx-4 border border-[var(--border)] rounded-2xl p-8 bg-[var(--bg-secondary)]">
       <h1 className="text-2xl font-bold text-center mb-2">登录</h1>
       <p className="text-sm text-[var(--text-secondary)] text-center mb-6">登录后即可发布动态和互动</p>

       {/* 第三方登录 */}
       <div className="space-y-3 mb-6">
         <button onClick={() => handleOAuth("github")} disabled={!!loading}
           className="w-full flex items-center justify-center gap-3 py-2.5 rounded-full border border-[var(--border)] font-bold text-sm hover:bg-[var(--bg)] disabled:opacity-50 transition-colors">
           <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
           {loading === "github" ? "跳转中..." : "使用 GitHub 登录"}
         </button>

         <button onClick={() => handleOAuth("qq")} disabled={!!loading}
           className="w-full flex items-center justify-center gap-3 py-2.5 rounded-full border border-[var(--border)] font-bold text-sm hover:bg-[var(--bg)] disabled:opacity-50 transition-colors">
           <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M21.621 16.859c-.387-1.011-.96-1.92-1.515-2.803-.767-1.217-1.56-2.416-2.325-3.629.42-.82.825-1.658 1.118-2.535a8.694 8.694 0 00.428-2.565C19.327 1.921 16.492 0 12.003 0 7.499 0 4.672 1.92 4.672 5.326c0 .886.15 1.735.428 2.522.292.876.697 1.714 1.118 2.535-.765 1.213-1.558 2.413-2.326 3.63-.553.882-1.127 1.79-1.514 2.801-.727 1.922-.632 3.376.27 4.153.973.832 2.54.405 3.926-1.367.42-.538.781-1.146 1.082-1.815.45.112.915.18 1.394.202.352.015.697.015 1.034 0a8.79 8.79 0 001.395-.202c.301.669.662 1.277 1.082 1.815 1.386 1.772 2.953 2.207 3.927 1.367.902-.777.996-2.231.27-4.153z"/></svg>
           {loading === "qq" ? "跳转中..." : "使用 QQ 登录"}
         </button>
       </div>

       {/* 分隔线 */}
       <div className="flex items-center gap-3 mb-6">
         <div className="flex-1 border-t border-[var(--border)]"></div>
         <span className="text-xs text-[var(--text-secondary)]">或使用账号密码</span>
         <div className="flex-1 border-t border-[var(--border)]"></div>
       </div>

       {/* 密码登录 */}
       <form onSubmit={handleSubmit}>
         {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
         <input value={username} onChange={(e) => setUsername(e.target.value)}
           className="w-full border border-[var(--border)] rounded-lg px-4 py-2 mb-4 bg-[var(--bg)] outline-none focus:border-[var(--primary)]"
           placeholder="用户名" required />
         <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
           className="w-full border border-[var(--border)] rounded-lg px-4 py-2 mb-6 bg-[var(--bg)] outline-none focus:border-[var(--primary)]"
           placeholder="密码" required />
         <button type="submit"
           disabled={!!loading}
           className="w-full py-2 rounded-full bg-[var(--primary)] text-white font-bold hover:bg-[var(--primary-hover)] disabled:opacity-50">
           {loading === "credentials" ? "登录中..." : "登录"}
         </button>
       </form>
       <div className="text-center mt-4">
         <Link href="/" className="text-xs text-[var(--text-secondary)] hover:text-[var(--primary)]">← 返回首页</Link>
       </div>
     </div>
    </div>
  );
}
