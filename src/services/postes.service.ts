import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"
import MyStore from '../store';

const API_URL = `${import.meta.env.VITE_API_URL}post`;

class Poste {
  static async postes() {
    try {
      const { data } = await axios.get(`${API_URL}`, {
        params: {
          idUserConnected: MyStore.state.auth.user.id
        }
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static async poste($idPoste: Number) {
    try {
      const { data } = await axios.get(`${API_URL}/${$idPoste}`,{
        params: {
          idUserConnected: MyStore.state.auth.user.id
        }
      })
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static async posteByUser(username: any) {
    try {
      const { data } = await axios.get(`${API_URL}/user/${username}`,{
        params: {
          idUserConnected: MyStore.state.auth.user.id
        }
      })
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static async postByLiked(username: any) {
    try {
      const { data } = await axios.get(`${API_URL}/user/${username}/like`,{
        params: {
          idUserConnected: MyStore.state.auth.user.id
        }
      })
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static async storePoste(poste: any) {
    // console.log(poste.pathMedia.name)
    try {
      const { data } = await axios.post(`${API_URL}`, {
        content: poste.content,
        pathMedia: poste.pathMedia,
        userId: MyStore.state.auth.user.id,
        published: 0
      }, {
        headers: {
          // 'Content-Type': 'application/json',
          "Content-Type": "multipart/form-data",
        }
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static async likePost(idPost: number) {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}newLike`, {
        idUser: MyStore.state.auth.user.id,
        idPost: idPost
      })

      return data
    } catch (error) {
      console.log(error)
    }
  }

  static async unlikePost(idLike:number) {
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}deleteLike/${idLike}`)
      return data
    } catch (error) {
      console.log(error)
    }
  }
}

export default Poste;
