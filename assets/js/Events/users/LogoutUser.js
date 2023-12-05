
import User from "../../classes/User.js";

addEventListener("DOMContentLoaded", function () {
  const logout = document.getElementById("logout_btn");
  logout.addEventListener("click", function () {
    // delete token
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    const user = new User();
    user.showUIforLoggedOutUsers();
    user.alert("You have successfully logged out.", "success");
  });
});
