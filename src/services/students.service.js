import axios from 'axios'
export default class StudentsService {
    constructor(){
        axios.defaults.baseURL = 'http://localhost:8000/api'
    }
    addStudents(newStudents){
        return axios.post('students', newStudents);
    }
    getStudents(gradebookID){
        return axios.get('students/'+gradebookID);
    }
    deleteStudent(studentID){
        return axios.delete('students/' + studentID);
    }
    editStudent(student){        
        return axios.put('students/'+student.id, student);
    }
}
export const studentsService = new StudentsService()