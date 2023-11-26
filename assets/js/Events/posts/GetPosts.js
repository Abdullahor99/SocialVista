import Global from "../../classes/Global.js";

addEventListener("DOMContentLoaded", function () {
  const global = new Global();
  try {
    global.getPosts(105).then((data) => {
      global.renderPosts(data);
    })
  }
  catch {
    console.log("test");
  }

})