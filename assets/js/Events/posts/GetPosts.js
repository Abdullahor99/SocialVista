import SocialVista from "../../classes/SocialVista.js";

addEventListener("DOMContentLoaded", function () {
  const SVista = new SocialVista();
  try {
    SVista.getPosts(5).then((data) => {
      SVista.renderPosts(data);
    })
  }
  catch {
    console.error("getPosts");
  }

})