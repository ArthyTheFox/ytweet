import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"
import MyStore from '../store';

const API_URL = `${import.meta.env.VITE_API_URL}post`;

class Poste {
  static async postes() {
    try {
      const { data } = await axios.get(`${API_URL}`, {params: {
        idUserConnected: MyStore.state.auth.user.id
      }})
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static async poste($idPoste:Number) {
    try {
      const { data } = await axios.get(`${API_URL}/${$idPoste}`)
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
}

export default Poste;
