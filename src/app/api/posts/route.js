import { getPosts, createPost } from "@/lib/data";

export async function GET() {
  const posts = getPosts();
  return Response.json(posts);
}

export async function POST(request) {
  const { content } = await request.json();
  if (!content || !content.trim()) {
    return Response.json({ error: "内容不能为空" }, { status: 400 });
  }
  const post = createPost(content.trim());
  return Response.json(post, { status: 201 });
}
