import axios from 'axios'

export default class AuthService {
  constructor() {
    this.setAxiosDefaultAuthorizationHeader();
    // axios.defaults.baseURL = 'http://localhost:8000/api'
  }
  login(email, password) {
    return axios.post('/login', {
      email, password
    }).then(({data}) => {
      window.localStorage.setItem('loginToken', data.token)
      window.localStorage.setItem('user', JSON.stringify(data.user))
      this.setAxiosDefaultAuthorizationHeader()
      return data.user;
    }).catch(e => {
        console.log(e)
    })
  }

  setAxiosDefaultAuthorizationHeader() {
    const TOKEN = window.localStorage.getItem('loginToken')
    axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`
  }

  logout() {
    window.localStorage.removeItem('loginToken')
    delete axios.defaults.headers.common['Authorization']
    window.localStorage.removeItem('user')
  }

  isAuthenticated() {
    return !!window.localStorage.getItem('loginToken') 
  }
  register(newUser){
    return axios.post('/register', newUser);
  }
}

export const authService = new AuthService()
