import { toggleLike } from "@/lib/data";
 import { auth } from "@/auth";

export async function POST(request, { params }) {
  const session = await auth();
  if (!session) return Response.json({ error: "请先登录" }, { status: 401 });
  const result = toggleLike(params.id);
   if (!result) return Response.json({ error: "内容不存在" }, { status: 404 });
   return Response.json(result);
 }
