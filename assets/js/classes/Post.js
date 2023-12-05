import SocialVista from "./SocialVista.js";
import User from "./User.js";

class Post extends SocialVista {

  async createPost(formData) {
    const finalUrl = this.getBaseUrl() + "/posts";
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(finalUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      return response;
    }
    catch (error) {
      return error;
    }

  }

  async editPost(formData, postID) {
    const finalUrl = this.getBaseUrl() + `/posts/${postID}`;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(finalUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      return response;
    }
    catch (error) {
      return error;
    }

  }

  async deletePost(postID) {
    console.log("sssss");
    const finalUrl = this.getBaseUrl() + `/posts/${postID}`;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(finalUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);
      return response;
    }
    catch (error) {
      console.log(error);
      return error;
    }

  }

  static loadMorePosts() {

    const SVista = new SocialVista();
    const currentPageNumber = SocialVista.currentPageNumber;

    SVista.getPosts(5, currentPageNumber).then(response => {
      SVista.renderPosts(response, false);
    }).catch(error => {
      console.error(error);
    });
  }

  handleScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10)
      Post.loadMorePosts();
  }
  async getPost(postId) {
    const baseUrl = this.getBaseUrl();

    let url = `${baseUrl}/posts/${postId}`;
    try {
      const response = await axios.get(url);
      return response;
    }
    catch (error) {
      return error;
    }
  }
  renderPost(postData) {
    document.getElementById("post_cont").innerHTML = "";
    let commentsContent = "";
    const comments = postData.comments;
    comments.forEach(comment => {
      let VaidlProfileImage = this.getValidUserImage(comment.author.profile_image)
      commentsContent += `
      <!-- Comment -->
      <div class="comment mt-2 bg-body-secondary rounded-2 shadow-sm p-2">
        <img class="rounded-5" src="${VaidlProfileImage}" alt="" height="30" width="30">
        <span class="username ms-1">${comment.author.username} </span>
        <p class="comment_body mt-1"> ${comment.body}
        </p>
      </div>
      <!-- Comment End -->
      `
    });

    const user = new User();
    const loggeduser = user.getUserFromLoacalStorage();
    let validLogedinUserImage = "";
    let validAuthorUserImage = user.getValidUserImage(postData.author.profile_image);

    if (loggeduser)
      validLogedinUserImage = user.getValidUserImage(loggeduser?.profile_image);
    const html =
      `<div class="card post" id="${postData.id}">
          <div class="card-header">
            <img src="${validAuthorUserImage}" alt="" class="profile__img rounded-5" height="40" width="40">
            <span class="username ms-2 fw-bold">@${postData.author.username}</span>
          </div>
          <div class="card-body">
            <img src="${postData.image}" alt="Bild" class="img-fluid">
            <p class="dauer text-black-50">${postData.created_at}</p>
            <h5 class="card-title">${postData.title}</h5>
            <p class="card-text">${postData.body}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen"
            viewBox="0 0 16 16">
            <path
          d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
            </svg>
            <div class="comments">
              ${commentsContent}
            </div>

            <div id="add_comment_cont" class="add_comment_cont d-flex gap-2 mt-2">
              <img class="rounded-5" src="${validLogedinUserImage}" alt="" height="30" width="30">
              <input class="w-100" type="text" id="add_comment_body"></input>
              <button id="add_comment_btn" type="button" class="btn btn-outline-primary" onclick="addComment(${postData.id})"><i class="fa-solid fa-arrow-right"></i></button>
            </div>
          </div>
        </div>`;


    document.getElementById("post_cont").innerHTML = html;


  }

  async addComment(postID, commentContent) {
    const finalUrl = this.getBaseUrl() + `/posts/${postID}/comments`;
    const token = localStorage.getItem("token");

    const bodyparam = {
      body: commentContent,
    }

    try {
      const response = await axios.post(finalUrl, bodyparam, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      // refresch the View
      this.getPost(postID).then(data => {
        const postData = data.data.data;
        this.alert("Your comment has been posted successfully", "success");
        this.renderPost(postData);

        // show alert to user

      })
      console.log(response);
      // 
      return response;
    }
    catch (error) {
      this.alert(error.response.data.message, "danger");
      return error;
    }
  }
}

export default Post;