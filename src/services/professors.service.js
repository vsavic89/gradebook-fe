import axios from 'axios'
export default class ProfessorsService {
    constructor(){
        axios.defaults.baseURL = 'http://localhost:8000/api'
    }
    getAll(){        
        return axios.get('professors');
    }
    getProfessor(id){
        return axios.get('professors/'+id);
    }
}
export const professorsService = new ProfessorsService()