import axios from 'axios';
import MyStore from "../store";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"

const API_URL = `${import.meta.env.VITE_API_URL}user`;

class User {
  static async getUser(username: any) {
    try {
      const { data } = await axios.get(`${API_URL}/${username}`)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static async updateUser(description:any) {
    try {
      const { data } = await axios.put(`${API_URL}/${MyStore.state.auth.user.id}`,{
        description: description
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }
}

export default User;
