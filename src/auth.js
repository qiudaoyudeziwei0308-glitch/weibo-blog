import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
 import GitHub from "next-auth/providers/github";

 const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

 // QQ 自定义 OAuth 提供商
 const QQProvider = {
   id: "qq",
   name: "QQ",
   type: "oauth",
   authorization: {
     url: "https://graph.qq.com/oauth2.0/authorize",
     params: { scope: "get_user_info" },
   },
   token: {
     url: "https://graph.qq.com/oauth2.0/token",
     async conform(response) {
       const text = await response.text();
       const params = new URLSearchParams(text);
       return new Response(JSON.stringify({ access_token: params.get("access_token") }), { headers: { "content-type": "application/json" } });
     },
   },
   userinfo: {
     async request({ tokens }) {
       const meRes = await fetch("https://graph.qq.com/oauth2.0/me?access_token=" + tokens.access_token);
       const meText = await meRes.text();
       const m = meText.match(/callback\(\s*({.*?})\s*\)/);
       if (!m) return { id: "qq_" + Date.now(), name: "QQ用户" };
       const { openid, client_id } = JSON.parse(m[1]);
       const infoRes = await fetch("https://graph.qq.com/user/get_user_info?access_token=" + tokens.access_token + "&oauth_consumer_key=" + client_id + "&openid=" + openid);
       const info = await infoRes.json();
       return { id: openid, name: info.nickname || "QQ用户", image: info.figureurl_qq_1 || "" };
     },
   },
   clientId: process.env.QQ_CLIENT_ID || "",
   clientSecret: process.env.QQ_CLIENT_SECRET || "",
   profile: (p) => p,
 };

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // 只在配置了环境变量时启用 GitHub 登录
    ...(process.env.GITHUB_CLIENT_ID ? [GitHub] : []),
    // 只在配置了环境变量时启用 QQ 登录
    ...(process.env.QQ_CLIENT_ID ? [QQProvider] : []),
    Credentials({
       name: "credentials",
       credentials: {
         username: { label: "用户名", type: "text", placeholder: "用户名" },
         password: { label: "密码", type: "password", placeholder: "密码" },
       },
       async authorize(credentials) {
         if (!credentials?.username || !credentials?.password) return null;
         if (credentials.username === ADMIN_USER && credentials.password === ADMIN_PASSWORD) {
           return { id: "1", name: ADMIN_USER, email: ADMIN_USER + "@blog.local" };
         }
         return null;
       },
     }),
   ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
   session: { strategy: "jwt" },
   callbacks: {
     async jwt({ token, user }) {
       if (user) token.id = user.id;
       return token;
     },
     async session({ session, token }) {
       if (token && session.user) session.user.id = token.id;
       return session;
     },
   },
 });
