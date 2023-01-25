import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken" 
import MyStore from '../store';

const API_URL = 'http://127.0.0.1:8000/api/posts';

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
        // console.log(poste.pathMedia.name)
        try {
          const { data } = await axios.post(`${API_URL}`, {
            content: poste.content,
            pathMedia: poste.pathMedia,
            userId: 1,
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

export default AuthService;
