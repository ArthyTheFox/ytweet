import axios from 'axios';
import MyStore from '../store';

const API_URL = 'http://127.0.0.1:8080/api/posts';

class AuthService {
    static async postes() {
        try {
            const { data } = await axios.get(`${API_URL}`)
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    static async storePoste(poste: any) {
        console.log(poste)
        try {
          const { data } = await axios.post(`${API_URL}`, {
            content: poste.content,
            pathMedia: poste.pathMedia,
            idUser: 1,
          }, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          })
          return data
        } catch (error) {
          console.log(error)
        }
      }
}

export default AuthService;
