import SocialVista from "./SocialVista.js";

class User extends SocialVista {


  async getUser(id) {
    const finalUrl = this.getBaseUrl() + `/users/${id}`;

    try {
      const response = await axios.get(finalUrl);
      console.log(response);
      return response;
    }
    catch (error) {
      return error;
    }


  }

  async login(user, psw) {
    const finalUrl = this.getBaseUrl() + "/login";

    const bParameter = {
      username: user,
      password: psw
    };
    try {
      const response = await axios.post(finalUrl, bParameter)
      return response;
    }
    catch (error) {
      return error;
    }


  }

  isUserLogedin() {
    return localStorage.getItem("token")
  }



  async regeister(formData) {
    const finalUrl = this.getBaseUrl() + "/register";
    try {
      const response = await axios.post(finalUrl, formData)
      console.log(response);
      return response;
    }
    catch (error) {
      console.log(error);
      return error;
    }
  }


  showProfileInfo(userData) {
    const userinfo = document.getElementById("userinfo");
    const html = `
                  <img class="rounded-5 " src="${userData.profile_image}" alt="" height="30" width="30">
                  <span class="username">${userData.username}</span>
    `;
    userinfo.innerHTML = html;
  }

  hideProfileInfo() {
    document.getElementById("userinfo").innerHTML = "";
  }

  showUIforLoggedInUsers(userData) {
    const loginBtn = document.getElementById("login_btn");
    const regBtn = document.getElementById("register_btn");
    const logoutBtn = document.getElementById("logout_btn");
    const addPostcont = document.getElementById("addPost-cont");

    loginBtn.classList.add("d-none");
    regBtn.classList.add("d-none");
    logoutBtn.classList.remove("d-none");
    addPostcont.classList.remove("d-none");
    this.showProfileInfo(userData);
  }

  showUIforLoggedOutUsers() {
    const logoutBtn = document.getElementById("logout_btn");
    const loginBtn = document.getElementById("login_btn");
    const regBtn = document.getElementById("register_btn");
    const addPostcont = document.getElementById("addPost-cont");

    loginBtn.classList.remove("d-none");
    regBtn.classList.remove("d-none");
    logoutBtn.classList.add("d-none");
    addPostcont.classList.add("d-none");
    this.hideProfileInfo();
  }
}

export default User;
