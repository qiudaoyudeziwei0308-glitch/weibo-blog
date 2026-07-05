import "./globals.css";
 import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "我的微博",
  description: "分享想法，记录生活",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
     <body className="min-h-screen"><AuthProvider>{children}</AuthProvider></body>
   </html>
  );
}
