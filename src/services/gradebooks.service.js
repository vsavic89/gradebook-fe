import axios from 'axios'
export default class GradebooksService {
    constructor(){
        axios.defaults.baseURL = 'http://localhost:8000/api'
    }
    getAll(){        
        return axios.get('gradebooks');
    }
}
export const gradebooksService = new GradebooksService()