import axios from 'axios'
export default class UsersService {
    constructor(){
        axios.defaults.baseURL = 'http://localhost:8000/api'
    }
    /*login(user){
        return axios.post('/login', user);
    }*/
    /*
    register(user){
        return axios.post('/register', user);
    }
    */
}
export const usersService = new UsersService()