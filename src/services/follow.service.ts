import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"
import MyStore from '../store';

const API_URL = `${import.meta.env.VITE_API_URL}follow`;

class FollowService {
    static async follow(idUserFollow: number) {
        try {
            const { data } = await axios.post(`${API_URL}`, {
                idUserFollow: idUserFollow
            },
                {
                    params: {
                        idUserConnected: MyStore.state.auth.user.id
                    }
                })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    static async unfollow(idUserFollow: number) {
        try {
            const { data } = await axios.delete(`${API_URL}`, {
                params: {
                    idUserFollow: idUserFollow,
                    idUserConnected: MyStore.state.auth.user.id
                }
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    static async getFollow() {
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

    static async getFollowByUser(idUserFollow:number) {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}followByUser`, {
                    params: {
                        idUserFollow: idUserFollow,
                        idUserConnected: MyStore.state.auth.user.id
                    }
                })
            return data
        } catch (error) {
            console.log(error)
        }
    }

}

export default FollowService;
