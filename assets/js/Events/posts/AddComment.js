import Post from "../../classes/Post.js";

window.addComment = function (PostID) {
  const commentContent = document.getElementById("add_comment_body");
  const post = new Post();
  post.addComment(PostID, commentContent.value);
}
