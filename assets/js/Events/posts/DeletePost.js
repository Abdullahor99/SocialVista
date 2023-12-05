import Post from "../../classes/Post.js";
import SocialVista from "../../classes/SocialVista.js";
import { isUserInProfilePage } from "./EditPost.js";
import { setUserInformaiton } from "../../sites/Profile.js";

window.deletepostclicked = function (post) {
  console.log("start function delete");
  const postClickedData = JSON.parse(decodeURIComponent(post));
  // show modal for delete..
  const deleteModal = new bootstrap.Modal(document.getElementById('delete_post_modal'), {});
  deleteModal.toggle();
  // if confirm clicked dann...
  const confirmbtn = document.getElementById("confirm_delete");
  console.log(confirmbtn);
  confirmbtn.addEventListener('dblclick', function (event) {
    event.preventDefault();
  });
  setTimeout(() => {
    confirmbtn.addEventListener("click", function () {
      console.log("click");
      const tempPost = new Post();
      tempPost.deletePost(postClickedData.id).then(data => {
        if (data?.response?.status > 400) {
          tempPost.alert(data.response.data.message, "danger");
          return;
        }
        else {
          // hide delete_post Modal
          deleteModal.hide();
          const SVista = new SocialVista();
          SocialVista.schonAbgefragteUrl = [];
          if (isUserInProfilePage()) {
            const userid = SVista.getUserFromLoacalStorage().id;
            setUserInformaiton(userid);
            tempPost.alert("Post deleted successfully", "success");
          }
          else {
            SVista.getPosts(5, true).then((data) => {
              SVista.renderPosts(data);
              tempPost.alert("Post deleted successfully", "success");
            }).catch((error) => {
              console.error(error);
            });
          }


        }
      })
    })
  }, 1000);

}