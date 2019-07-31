import axios from 'axios'
export default class GradebooksService {
    constructor(){
        axios.defaults.baseURL = 'http://localhost:8000/api'
    }
    getAll(){        
        return axios.get('gradebooks');
    }
    add(gradebook){
        return axios.post('gradebooks/create', gradebook);
    }
    getGradebook(professorID){
        return axios.get('gradebooks/professors/'+professorID)
    }
}
export const gradebooksService = new GradebooksService()