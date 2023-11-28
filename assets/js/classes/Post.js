import SocialVista from "./SocialVista.js";

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
}

export default Post;