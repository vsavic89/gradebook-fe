import axios from 'axios'
export default class ProfessorsService {
    constructor(){
        axios.defaults.baseURL = 'http://localhost:8000/api'
    }
    getAll(onlyUnsignedProfessor){
        if (!onlyUnsignedProfessor)
            return axios.get('professors')
        else 
            return axios.get('professors/onlyUnsignedProfessors');
    }
    getProfessor(id){
        return axios.get('professors/'+id);
    }
}
export const professorsService = new ProfessorsService()