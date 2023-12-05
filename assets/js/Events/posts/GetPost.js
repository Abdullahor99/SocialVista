import Post from "../../classes/Post.js";

addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("postid");
  const post = new Post();
  post.getPost(id).then(data => {
    const postData = data.data.data;
    post.renderPost(postData);
  }).catch(error => {
    console.error(error);
  })
})
