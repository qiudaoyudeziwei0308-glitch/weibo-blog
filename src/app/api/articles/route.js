 import { getAllArticles } from "@/lib/articles";
 
 export async function GET() {
   const articles = getAllArticles().map(({ content, ...rest }) => rest);
   return Response.json(articles);
 }
