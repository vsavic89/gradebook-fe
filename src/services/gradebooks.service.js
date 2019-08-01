import axios from 'axios'
export default class GradebooksService {
    constructor(){
        axios.defaults.baseURL = 'http://localhost:8000/api'
    }
    getAll(currentPage, rowsPerPage){        
        return axios.get('gradebooks?current_page='+currentPage+'&rows_per_page='+rowsPerPage);
    }
    getGradebook(id){        
        return axios.get('gradebooks/'+id);
    }
    add(gradebook){
        return axios.post('gradebooks/create', gradebook);
    }
    getGradebookByProfessorID(professorID){
        return axios.get('gradebooks/%?professorID='+professorID)
    }
    deleteGradebook(id){
        return axios.delete('gradebooks/' + id);
    }
}
export const gradebooksService = new GradebooksService()