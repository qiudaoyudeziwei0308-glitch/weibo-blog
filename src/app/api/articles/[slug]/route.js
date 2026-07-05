 import { getArticleBySlug } from "@/lib/articles";
 
 export async function GET(request, { params }) {
   const article = getArticleBySlug(params.slug);
   if (!article) return Response.json({ error: "文章不存在" }, { status: 404 });
   return Response.json(article);
 }
