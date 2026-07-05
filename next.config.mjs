/** @type {import('next').NextConfig} */
const nextConfig = {};
 
 // 确保 Vercel 上 NextAuth URL 正确
 if (process.env.VERCEL) {
   nextConfig.env = {
     NEXTAUTH_URL: "https://weibo-blog.vercel.app",
   };
 }
 
export default nextConfig;
