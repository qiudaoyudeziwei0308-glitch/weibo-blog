import { getComments, createComment, getPost } from "@/lib/data";

export async function GET(request, { params }) {
  const comments = getComments(params.id);
  return Response.json(comments);
}

export async function POST(request, { params }) {
  const { author, content } = await request.json();
  if (!author || !author.trim() || !content || !content.trim()) {
    return Response.json({ error: "昵称和内容不能为空" }, { status: 400 });
  }
  const post = getPost(params.id);
  if (!post) {
    return Response.json({ error: "内容不存在" }, { status: 404 });
  }
  const comment = createComment(params.id, author.trim(), content.trim());
  return Response.json(comment, { status: 201 });
}
