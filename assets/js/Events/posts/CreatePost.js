import Post from "../../classes/Post.js";

addEventListener("DOMContentLoaded", function () {
  const post = new Post();
  console.log("new post");
  const submitNewPost = this.document.getElementById("submit_new_post");
  submitNewPost.addEventListener("click", function () {
    console.log("new post click");
    post.deletePrevErrors();
    const title = document.getElementById("new_post_titel");
    const body = document.getElementById("new_post_body");
    const image = document.getElementById("new_post_img");

    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("body", body.value);
    formData.append("image", image.files[0]);

    post.createPost(formData).then(data => {
      if (data?.response?.status > 400) {
        post.makeError(data.response.data.message, ".new_post_error_cont");
      }
      else {

        // hide new_post Modal
        const modal = document.getElementById("new_post_modal");
        const modalInstanz = bootstrap.Modal.getInstance(modal);
        modalInstanz.hide();
        post.showToast("Post created successfully", 5000);
      }
    });



  });
});