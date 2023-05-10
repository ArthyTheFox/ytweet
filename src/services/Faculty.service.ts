import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"

const API_URL = `${import.meta.env.VITE_API_URL}faculties`;

class FacultyService {
    static async faculties() {
        try {
            const { data } = await axios.get(`${API_URL}`)
            return data
        } catch (error) {
            console.log(error)
        }
    }
}

export default FacultyService;
