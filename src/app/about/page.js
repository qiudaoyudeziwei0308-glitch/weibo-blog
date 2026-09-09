 "use client";
 import Header from "@/components/Header";
 import Link from "next/link";
 import { site } from "@/lib/site";

 export default function About() {
   const { name, tagline, avatar, about } = site.profile;
   const initial = name[0];

   return (
     <div className="min-h-screen">
       <Header />
       <main className="max-w-2xl mx-auto px-4 py-8">
         <div className="mb-6">
           <Link href="/" className="text-sm text-[var(--primary)] hover:underline">&larr; 返回首页</Link>
         </div>
         <div className="bg-[var(--bg-secondary)] rounded-2xl p-8 border border-[var(--border)]">
           <div className="flex flex-col items-center mb-6">
             {avatar ? (
               <img src={avatar} alt={name} className="w-20 h-20 rounded-full object-cover mb-4" />
             ) : (
               <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-purple-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
                 {initial}
               </div>
             )}
             <h1 className="text-2xl font-bold">{name}</h1>
             <p className="text-[var(--text-secondary)] mt-1">{tagline}</p>
           </div>

           <div className="space-y-4 text-sm leading-relaxed whitespace-pre-line">
             {about}
           </div>

           {site.socials.length > 0 && (
             <div className="flex gap-3 mt-6 pt-6 border-t border-[var(--border)]">
               {site.socials.map((s) => (
                 <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                   className="px-4 py-1.5 rounded-full border border-[var(--border)] text-sm hover:bg-[var(--bg)]">
                   {s.label}
                 </a>
               ))}
             </div>
           )}
         </div>
       </main>
     </div>
   );
 }
