class Global {
  getBaseUrl() {
    return "https://tarmeezacademy.com/api/v1";
  }
  async getPosts(limit) {
    const baseUrl = this.getBaseUrl();
    try {
      const response = await axios.get(`${baseUrl}/posts?limit=${limit}`);
      return response;
    }
    catch (error) {
      return error;
    }
  }
  renderPosts(data) {
    data = data.data.data;
    data.forEach(post => {
      const html =
        `<div class="card">
        <div class="card-header">
          <img src="${post.author.profile_image}" alt="" class="profile__img rounded-5" height="40" width="40">
          <span class="username ms-2 fw-bold">@${post.author.name}</span>
        </div>
        <div class="card-body">
          <img src="${post.image}" alt="Bild" class="img-fluid">
          <p class="dauer text-black-50">${post.created_at}</p>
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.body}</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen"
          viewBox="0 0 16 16">
          <path
            d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
          </svg>
          <span>(${post.comments_count}) Comments</span>
        </div>
      </div>`

      document.getElementById("posts").innerHTML += html;
    });
  }

  showToast(message, dauration) {
    const toast = document.getElementById("toast");
    toast.classList.add("show");

    document.querySelector(".toast-body").textContent = message;
    setTimeout(() => {
      toast.classList.remove("show");
    }, dauration);
  }
  deletePrevErrors() {
    const errors = document.querySelectorAll(".error");
    errors.forEach((error) => {
      error.remove();
    })
  }
  makeError(message, classnameForParent) {
    const errorCont = document.querySelector(classnameForParent);
    const errorDiv = document.createElement("div");
    errorDiv.textContent = message;
    errorDiv.classList.add("error");
    errorCont.appendChild(errorDiv);
  }
}

export default Global;