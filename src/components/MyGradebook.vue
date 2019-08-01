<template>
    <div>
        <h2>My Gradebook</h2>  
        <div v-if="gradebookItemsList.length > 0">
            <button class="btn btn-danger" @click="deleteGradebook(gradebookItemsList[0].id)">Delete Gradebook</button>
            <button class="btn btn-secondary" @click="editGradebook(gradebookItemsList[0].id)">Edit Gradebook</button>
            <br><br>
            Professor: <strong>{{gradebookItemsList[0].first_name + ' ' + gradebookItemsList[0].last_name}}</strong>            
            <div>
                <button @click="addStudents">Add Students</button>
                <h3>Students list</h3>                
                <div v-if="gradebookItemsList[0].studentFirstName">
                    <table border="1" align="center">
                        <tr>
                            <th>Image</th>
                            <th>First name</th>
                            <th>Last name</th>
                        </tr>                        
                        <tr v-for="(student, index) in gradebookItemsList" :key="index">                        
                            <td><img width="100" height="100" :src="student.studentImageURL"/></td>
                            <td>{{ student.studentFirstName }}</td>
                            <td>{{ student.studentLastName }}</td>                            
                        </tr>                        
                    </table> 
                </div>
                <div v-else>
                    <p>No students to show.</p>
                </div>               
            </div>        
            <div v-if="commentsList.length >= 0">
                <h3>Comments:</h3>                
                <div v-for="(comment, index) in commentsList" :key="index">
                    <div v-if="comment">                
                        Author name: <h4>{{ comment.first_name + ' ' + comment.last_name }}</h4>
                        Created at: <p>{{ comment.created_at }}</p>
                        Content: <p>{{ comment.content }}</p>
                        <div v-if="user && (user.id === comment.user_id)">
                            <!-- <button class="btn btn-secondary" @click="editComment(index)">Edit Comment</button>                 -->
                            <button class="btn btn-danger" @click="deleteComment(index)">Delete Comment</button>               
                        </div> 
                    </div>            
                </div>
                <div v-if="user">
                    <label for="commentContent">Content: </label>
                    <textarea maxlength="1000" minlength="1" name="commentContent" v-model="newComment.content" />
                    <br>
                    <button class="btn btn-primary" @click="addComment">Add Comment</button>
                </div>
            </div>
        </div>    
        <div v-else>
            <p>No gradebook to show.</p>            
        </div>
    </div>
</template>

<script>
import { gradebooksService } from '../services/gradebooks.service';
import { commentsService } from '../services/comments.service';
import { mapGetters } from "vuex";
export default {
    data(){
        return{
            gradebookID: undefined,
            gradebook: [],
            comments: [],
            errors: [],
            newComment: {
                content: '',
                user_id: 0,
                gradebook_id: 0,
                first_name: '',
                last_name: ''
            }, 
            routeName: null           
        }
    },
    created(){  
        this.routeName = this.$router.currentRoute.name;        
        if (this.routeName === 'my-gradebook'){
            gradebooksService.getGradebookByProfessorID(this.user.id)
                .then(response => {
                    this.gradebook = response.data;
                    this.gradebookID = this.gradebook[0].id;
                    this.getComments();                      
                }).catch(e => {
                    this.errors.push(e);
                })
        }else{
            this.gradebookID = this.$router.currentRoute.params.id;
            gradebooksService.getGradebook(this.gradebookID)
                .then(response => {
                    this.gradebook = response.data;                    
                    this.gradebookID = this.gradebook[0].id;
                    this.getComments(); 
                }).catch(e => {
                    this.errors.push(e);
                })
        }           
    },
    computed: {
        ...mapGetters({
            user: "getUser"
        }),
        gradebookItemsList(){
            return this.gradebook;
        },
        commentsList(){
            return this.comments;
        }
    },
    methods: {
        getComments(){
            commentsService.getComments(this.gradebookID)
                .then(response => {
                    this.comments = response.data;                
                }).catch(e => {
                    this.errors.push(e);
                });
        },
        getDefaults(){
            this.newComment = {
                content: ''
            }
        },
        addStudents(){
            return this.$router.push('/gradebooks/'+this.gradebook[0].id+'/students/create');
        },
        addComment(){
            this.newComment.user_id = this.user.id;
            this.newComment.gradebook_id = this.gradebookID;            
            commentsService.addComment(this.newComment)
                .then(response => {      
                    this.newComment = response.data;        
                    this.newComment.first_name = this.user.first_name;
                    this.newComment.last_name = this.user.last_name;               
                    this.comments.push(this.newComment);
                    this.getDefaults();
                }).catch(e => {
                    this.errors.push(e);
                })            
        },
        editGradebook(id){
            return this.$router.push('/gradebooks/'+id+'/edit');
        },
        deleteComment(index){
            let id = this.comments[index].id;
            var r = confirm("Are you sure?");
            if (r == true) {
                commentsService.deleteComment(id)
                    .then(response => {
                        this.comments.splice(index, 1);
                    }).catch(e => {
                        this.errors.push(e);
                    });           
            }        
        },
        deleteGradebook(id){
            var r = confirm("Are you sure?");
            if (r == true) {
                gradebooksService.deleteGradebook(id)
                    .then(response => {
                        this.$router.push('/gradebooks');
                    }).catch(e => {
                        this.errors.push(e);
                    })
            }
        }
    }
}
</script>

<style>

</style>
