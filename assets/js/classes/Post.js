import Global from "./Global.js";

class Post extends Global {

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
      console.log(response);

      return response;
    }
    catch (error) {
      return error;
    }

  }
}

export default Post;