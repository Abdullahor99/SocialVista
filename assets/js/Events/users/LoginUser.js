
import User from "../../classes/User.js";
addEventListener("DOMContentLoaded", function () {
  const user = new User();
  user.isUserLogedin() ? user.showUIforLoggedInUsers(JSON.parse(this.localStorage.getItem("user"))) : user.showUIforLoggedOutUsers();

  const logbtn = this.document.getElementById("submit_login");
  logbtn.addEventListener("click", function () {
    user.deletePrevErrors();
    const username = document.getElementById("login_username");
    const password = document.getElementById("login_password");

    user.login(username.value, password.value).then(data => {
      if (data?.response?.status > 400) {
        user.makeError(data.response.data.message, ".login-error-cont");
      }
      else {
        const userData = JSON.stringify(data.data.user);
        // save user in Localstorage
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", userData);

        // hide lgin Modal
        const modal = document.getElementById("login_modal");
        const modalInstanz = bootstrap.Modal.getInstance(modal);
        modalInstanz.hide();
        // show UI for logged in Users 
        user.showUIforLoggedInUsers(data.data.user);
        // show cool toast
        user.showToast("You have successfully logged in.", 5000);
      }
    });



  });
});