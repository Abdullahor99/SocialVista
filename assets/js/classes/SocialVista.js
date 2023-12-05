class SocialVista {
  // TODO: umbenen zu nextPageNumber
  static currentPageNumber = 0;
  static schonAbgefragteUrl = [];

  getBaseUrl() {
    return "https://tarmeezacademy.com/api/v1";
  }

  async getPosts(limit, currentPage = 0) {

    const baseUrl = this.getBaseUrl();

    let url = `${baseUrl}/posts?limit=${limit}`;
    if (currentPage > 0) {
      url += `&page=${currentPage}`;
    }
    if (SocialVista.schonAbgefragteUrl.includes(url))
      return null;

    SocialVista.schonAbgefragteUrl.push(url);
    try {
      const response = await axios.get(url);
      return response;
    }
    catch (error) {
      return error;
    }
  }

  async getUserPosts(userid) {

    const baseUrl = this.getBaseUrl();
    let url = `${baseUrl}/users/${userid}/posts`;

    try {
      const response = await axios.get(url);
      return response;
    }
    catch (error) {
      return error;
    }
  }
  getUserFromLoacalStorage() {
    return JSON.parse(localStorage.getItem("user"));
  }

  renderPosts(data, reload = true) {
    if (!data)
      return;
    if (reload)
      document.getElementById("posts").innerHTML = "";

    let editButtonHTMLContent = "";


    const posts = data.data.data;
    posts.forEach(post => {

      // standard Image feestlegen falls der Benuzer kein Bild hat.
      let userImage = this.getValidUserImage(post.author.profile_image);

      // prüfen ob Post image exestiert..
      let imgHTML = "";
      if (Object.keys(post.image).length != 0)
        imgHTML = `<img src="${post.image}" alt="Bild" class="img-fluid"></img>`;

      // prüfen ob post titel gesetzt ist..
      let postTitelHTML = "";
      if (post.title !== null)
        postTitelHTML = `<h5 class="card-title">${post.title}</h5>`;



      if (post.author.id === this.getUserFromLoacalStorage()?.id) {
        editButtonHTMLContent = `
        <div>
        <button type="button" class="edit-btn btn btn-light ms-1" onclick="editpostclicked('${encodeURIComponent(JSON.stringify(post))}')"><i class="fa-solid fa-pen-to-square"></i></button>
        <button type="button" class="delete-btn btn btn-danger" onclick="deletepostclicked('${encodeURIComponent(JSON.stringify(post))}')"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
      }

      const html =
        `<div class="card post" id="${post.id}">
        <div class="card-header">
          <div class= "user-infos" onclick="profileclicked(${post.author.id})">
            <img src="${userImage}" alt="" class="profile__img rounded-5" height="40" width="40">
            <span class="username ms-2 fw-bold">@${post.author.name}</span>
          </div>
          ${editButtonHTMLContent}
        </div>
        <div class="card-body" onclick="postclicked(${post.id})">
         ${imgHTML}
          <p class="dauer text-black-50">${post.created_at}</p>
          ${postTitelHTML}
          <p class="card-text">${post.body}</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen"
          viewBox="0 0 16 16">
          <path
            d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
          </svg>
          <span>(${post.comments_count}) Comments</span>
        </div>
      </div>`
      editButtonHTMLContent = "";
      document.getElementById("posts").innerHTML += html;
    });


    if (data.data.hasOwnProperty("meta"))
      SocialVista.currentPageNumber = ++data.data.meta.current_page
  }

  alert(message, type) {

    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    if (!alertPlaceholder)
      return;

    const wrapper = document.createElement('div');
    const id = this.generateRandomId(8);

    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert" id="${id}">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('');

    alertPlaceholder.append(wrapper);
    const bsAlert = new bootstrap.Alert(`#${id}`);
    setTimeout(() => {
      if (bsAlert._element != null)
        bsAlert.close();
    }, 5000);
  }



  generateRandomId(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  }
  getValidUserImage(imgObj) {
    let userImage = "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg";
    if (Object.keys(imgObj).length != 0)
      userImage = imgObj;
    return userImage;
  }
}

export default SocialVista;