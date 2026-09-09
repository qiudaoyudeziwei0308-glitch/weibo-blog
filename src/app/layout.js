import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
 import { site } from "@/lib/site";

export const metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
     <body className="min-h-screen"><AuthProvider>{children}</AuthProvider></body>
   </html>
  );
}
