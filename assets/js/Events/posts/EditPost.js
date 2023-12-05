import Post from "../../classes/Post.js";
import SocialVista from "../../classes/SocialVista.js";
import { setUserInformaiton } from "../../sites/Profile.js";

function showModalForEdit(postClickedData) {
  const editModal = new bootstrap.Modal(document.getElementById('new_post_modal'), {});
  document.getElementById("new_post_header").textContent = "Edit Post";
  document.getElementById("new_post_titel").value = postClickedData.title;
  document.getElementById("new_post_body").value = postClickedData.body;
  const submitBtnForNewPost = document.getElementById("submit_new_post");
  const submitBtnForeditPost = document.getElementById("submit_edit_post");
  submitBtnForNewPost.classList.add("d-none");
  submitBtnForeditPost.classList.remove("d-none");
  editModal.toggle();
}


window.editpostclicked = function (post) {
  const postClickedData = JSON.parse(decodeURIComponent(post));
  // show modal for edit..
  showModalForEdit(postClickedData);
  const submitBtn = document.getElementById("submit_edit_post");
  submitBtn.addEventListener("click", function () {
    // do the request
    const tempPost = new Post();

    const title = document.getElementById("new_post_titel");
    const body = document.getElementById("new_post_body");
    const image = document.getElementById("new_post_img");
    console.log(body.value);

    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("body", body.value);
    formData.append("image", image.files[0]);
    formData.append("_method", "put");


    tempPost.editPost(formData, postClickedData.id).then(data => {
      if (data?.response?.status > 400) {
        console.log(data);
        let errorMessage = data.response.data.error_message;
        if (!errorMessage)
          errorMessage = data.response.data.message;

        tempPost.alert(errorMessage, "danger");
      }
      else {

        // hide edit_post Modal
        const modal = document.getElementById("new_post_modal");
        const modalInstanz = bootstrap.Modal.getInstance(modal);
        modalInstanz.hide();
        const SVista = new SocialVista();
        SocialVista.schonAbgefragteUrl = [];
        // hier muss geprüft werden von wo ich die editere wenn von Profile soll ich nur user Posts holen wenn nicht erste 5 posts 
        if (isUserInProfilePage()) {
          const userid = SVista.getUserFromLoacalStorage().id;
          setUserInformaiton(userid);
          tempPost.alert("Post edited successfully", "success");
        }
        else {
          SVista.getPosts(5, true).then((data) => {
            SVista.renderPosts(data);
            tempPost.alert("Post edited successfully", "success");
          }).catch((error) => {
            console.error(error);
          });
        }

      }

    });
  })


}

export function isUserInProfilePage() {
  const pathname = window.location.pathname;
  const pageName = pathname.split('/').pop();
  if (pageName == "profile.html")
    return true;
  else return false;
}
