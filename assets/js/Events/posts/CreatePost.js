import Post from "../../classes/Post.js";
import SocialVista from "../../classes/SocialVista.js";

function resetModal() {
  document.getElementById("new_post_header").textContent = "New Post";
  document.getElementById("new_post_titel").value = "";
  document.getElementById("new_post_body").value = "";
  const submitBtnForNewPost = document.getElementById("submit_new_post");
  const submitBtnForeditPost = document.getElementById("submit_edit_post");
  submitBtnForNewPost.classList.remove("d-none");
  submitBtnForeditPost.classList.add("d-none");
}

addEventListener("DOMContentLoaded", function () {
  this.document.getElementById("addPost-cont").addEventListener("click", () => {
    resetModal();
  });

  const post = new Post();
  const submitNewPost = this.document.getElementById("submit_new_post");
  submitNewPost.addEventListener("click", function () {

    const title = document.getElementById("new_post_titel");
    const body = document.getElementById("new_post_body");
    const image = document.getElementById("new_post_img");

    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("body", body.value);
    formData.append("image", image.files[0]);

    post.createPost(formData).then(data => {
      if (data?.response?.status > 400) {
        post.alert(data.response.data.message, "danger");
      }
      else {

        // hide new_post Modal
        const modal = document.getElementById("new_post_modal");
        const modalInstanz = bootstrap.Modal.getInstance(modal);
        modalInstanz.hide();
        const SVista = new SocialVista();
        SocialVista.schonAbgefragteUrl = [];
        SVista.getPosts(5).then((data) => {
          SVista.renderPosts(data, true);
        }).catch((error) => {
          console.error(error);
        });

        post.alert("Post created successfully", "success");
      }
    });



  });
});