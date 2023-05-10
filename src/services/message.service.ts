import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"

const API_URL = `${import.meta.env.VITE_API_URL}`;

class MessageService {
  static async getMessages(id: any) {
    try {
      const { data } = await axios.get(`${API_URL}getMessages/${id}`)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static async createConversation(userSend: number, userReceive: number, titre: string = "") {
    try {
      const { data } = await axios.post(`${API_URL}createConversation`, {
        userSend: userSend,
        userReceive: userReceive,
        // titre,
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static async sendMessage(message: any) {
    try {
      const { data } = await axios.post(`${API_URL}sendMessages`, message)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  // Message : "conv créé"
  // idConv: idConv

  // static async updateUser(description:any) {
  //   try {
  //     const { data } = await axios.put(`${API_URL}/${MyStore.state.auth.user.id}`,{
  //       description: description
  //     })
  //     return data
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  static async getConversations(id: any) {
    try {
      const { data } = await axios.get(`${API_URL}getAllconversation/${id}`)
      return data
    } catch (error) {
      console.log(error)
    }
  }
}

export default MessageService;
