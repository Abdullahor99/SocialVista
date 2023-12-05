import User from "../../classes/User.js";

addEventListener("DOMContentLoaded", function () {
  const user = new User();

  const logbtn = this.document.getElementById("submit_reg");
  logbtn.addEventListener("click", function () {

    const username = document.getElementById("reg_username");
    const name = document.getElementById("reg_name");
    const email = document.getElementById("reg_email");
    const img = document.getElementById("reg_img");
    const password = document.getElementById("reg_password");

    const formData = new FormData();
    formData.append("username", username.value);
    formData.append("name", name.value);
    formData.append("email", email.value);
    formData.append("image", img.files[0]);
    formData.append("password", password.value);

    user.regeister(formData).then(data => {
      if (data?.response?.status > 400)
        user.alert(data.response.data.message, "danger");

      else {
        const userData = JSON.stringify(data.data.user);
        // save user in Localstorage
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", userData);

        // hide lgin Modal
        const modal = document.getElementById("reg_modal");
        const modalInstanz = bootstrap.Modal.getInstance(modal);
        modalInstanz.hide();

        user.showUIforLoggedInUsers(data.data.user);
        // show cool toast that the user 
        user.alert("You have successfully registered.", "success");
      }
    });



  });
});