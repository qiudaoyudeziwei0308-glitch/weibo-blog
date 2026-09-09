 import { getComments, createComment, getPost } from "@/lib/data";
 import { auth } from "@/auth";

 export async function GET(request, { params }) {
   const comments = getComments(params.id);
   return Response.json(comments);
 }

 export async function POST(request, { params }) {
   const session = await auth();
   const body = await request.json().catch(() => ({}));
   const author = body.author?.trim() || "";
   const content = body.content?.trim() || "";

   if (!content) {
     return Response.json({ error: "评论内容不能为空" }, { status: 400 });
   }
   // 登录用户必须用自己身份评论
   if (!session && !author) {
     return Response.json({ error: "请填写昵称或先登录" }, { status: 400 });
   }
   const post = getPost(params.id);
   if (!post) {
     return Response.json({ error: "内容不存在" }, { status: 404 });
   }

   const comment = createComment(params.id, author, content, session?.user || null);
   return Response.json(comment, { status: 201 });
 }
