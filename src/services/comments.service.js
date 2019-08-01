import axios from 'axios'
export default class CommentsService {
    constructor(){
        axios.defaults.baseURL = 'http://localhost:8000/api'
    }
    addComment(newComment){
        return axios.post('comments', newComment);
    }
    getComments(gradebookID){        
        return axios.get('comments/'+ gradebookID)
    }
    deleteComment(id){
        return axios.delete('comments/' + id);
    }
}
export const commentsService = new CommentsService()