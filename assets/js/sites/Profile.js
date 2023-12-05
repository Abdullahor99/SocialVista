import SocialVista from "../classes/SocialVista.js";
import User from "../classes/User.js";

addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("userid");
  if (id)
    setUserInformaiton(id);
  else {
    const SVista = new SocialVista();
    const localuser = SVista.getUserFromLoacalStorage();

    if (localuser) {
      setUserInformaiton(localuser.id)
    }
    else {
      // zeige den user dass er sich anmelden soll
      // toggle login modal;
      const modal = document.getElementById("login_modal");
      const modalInstanz = new bootstrap.Modal(modal, {});
      modalInstanz.toggle();
    }
  }
})

export function setUserInformaiton(id) {
  const user = new User();
  user.getUser(id).then(userdata => {
    userdata = userdata.data.data;
    console.log(userdata);
    const profile__img = document.querySelector(".so_top_icon img");
    const username = document.querySelector("h3.username");
    const comentsCount = document.querySelector(".anzahlcomments span");
    const postsCount = document.querySelector(".anzahlposts span");
    const userFullName = document.querySelector(".user-fullname");
    const userEmail = document.querySelector(".user-email");

    if (!profile__img || !username || !comentsCount || !postsCount || !userFullName || !userEmail)
      return
    profile__img.src = user.getValidUserImage(userdata.profile_image);
    username.textContent = userdata.username;
    comentsCount.textContent = userdata.comments_count;
    postsCount.textContent = userdata.posts_count;
    userFullName.textContent = userdata.name;
    userEmail.textContent = userdata.email;

    // get user's post

    const SVista = new SocialVista();
    SVista.getUserPosts(id).then(postsdata => {
      // render it
      SVista.renderPosts(postsdata, true);
    }).catch(error => {
      console.error(error);
    })

  }).catch(error => {
    console.error(error);
  })
}