 import { toggleLike } from "@/lib/data";
 
 export async function POST(request, { params }) {
   const result = toggleLike(params.id);
   if (!result) return Response.json({ error: "内容不存在" }, { status: 404 });
   return Response.json(result);
 }
