import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        // console.log(response.data)
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data.user;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'createUser', {
      username: user.pseudo,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      firstname: user.firstname,
      birthday: user.birthday,
      // idFaculty: user.idFaculty
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
  }
}

export default new AuthService();
