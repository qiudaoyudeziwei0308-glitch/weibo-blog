import { getPosts, createPost } from "@/lib/data";
 import { auth } from "@/auth";

export async function GET() {
  const posts = getPosts();
  return Response.json(posts);
}

export async function POST(request) {
  const session = await auth();
  if (!session) return Response.json({ error: "请先登录" }, { status: 401 });
  const { content } = await request.json();
  if (!content || !content.trim()) {
    return Response.json({ error: "内容不能为空" }, { status: 400 });
  }
  const post = createPost(content.trim(), session.user);
  return Response.json(post, { status: 201 });
}
