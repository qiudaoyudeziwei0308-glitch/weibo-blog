 import NextAuth from "next-auth";
 import Credentials from "next-auth/providers/credentials";
 
 const ADMIN_USER = process.env.ADMIN_USER || "admin";
 const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
 
 export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [
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
