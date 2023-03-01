import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"
import MyStore from '../store';

const API_URL = 'http://127.0.0.1:8000/api/comment';

class Comment {
  static async comments(idPost:number) {
    try {
      const { data } = await axios.get(`${API_URL}/post/${idPost}`)
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static async storeComment(comment: any, idPost:number) {
    try {
      const { data } = await axios.post(`${API_URL}`, {
        idPost: idPost,
        idUser: MyStore.state.auth.user.id,
        content: comment.content
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static async storeSubComment(comment: any, idPost:number, idComment: number) {
    try {
      const { data } = await axios.post(`${API_URL}`, {
        idPost: idPost,
        idComment: idComment,
        idUser: MyStore.state.auth.user.id,
        content: comment
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }
}

export default Comment;
