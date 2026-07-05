 "use client";
 import { useState } from "react";
 import { signIn } from "next-auth/react";
 import { useRouter } from "next/navigation";
 
 export default function LoginPage() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const router = useRouter();
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     setError("");
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
   };
 
   return (
     <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
       <form onSubmit={handleSubmit} className="w-full max-w-sm mx-4 border border-[var(--border)] rounded-2xl p-8 bg-[var(--bg-secondary)]">
         <h1 className="text-2xl font-bold text-center mb-6">登录</h1>
         {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
         <input value={username} onChange={(e) => setUsername(e.target.value)}
           className="w-full border border-[var(--border)] rounded-lg px-4 py-2 mb-4 bg-[var(--bg)] outline-none focus:border-[var(--primary)]"
           placeholder="用户名" required />
         <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
           className="w-full border border-[var(--border)] rounded-lg px-4 py-2 mb-6 bg-[var(--bg)] outline-none focus:border-[var(--primary)]"
           placeholder="密码" required />
         <button type="submit"
           className="w-full py-2 rounded-full bg-[var(--primary)] text-white font-bold hover:bg-[var(--primary-hover)]">
           登录
         </button>
       </form>
     </div>
   );
 }
