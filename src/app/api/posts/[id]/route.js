import { getPost } from "@/lib/data";

export async function GET(request, { params }) {
  const post = getPost(params.id);
  if (!post) {
    return Response.json({ error: "内容不存在" }, { status: 404 });
  }
  return Response.json(post);
}
