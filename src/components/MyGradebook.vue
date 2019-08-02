<template>
    <div>  
        <div v-if="gradebookItemsList.length > 0">
            <h2 v-if="routeName==='my-gradebook'">My Gradebook</h2>
            <h2>Gradebook name: {{ gradebookItemsList[0].name }}</h2>
            <div v-if="user">
                <button class="btn btn-danger" @click="deleteGradebook(gradebookID)">Delete Gradebook</button>
                <button class="btn btn-secondary" @click="editGradebook(gradebookID)">Edit Gradebook</button>
            </div>
            <br><br>
            <div v-if="gradebookItemsList[0].first_name">
                Professor: <strong>{{gradebookItemsList[0].first_name + ' ' + gradebookItemsList[0].last_name}}</strong>
            </div>
            <div v-else>
                Professor not assigned for this gradebook.
            </div>            
            <div v-if="user">
                <button @click="addStudents">Add Students</button>
            </div>
                <div>
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
            <div v-if="commentsList.length > 0">
                <h3>Comments:</h3>                
                <div v-for="(comment, index) in commentsList" :key="index">
                    <div v-if="comment">                
                        Author name: <h4>{{ comment.first_name + ' ' + comment.last_name }}</h4>
                        Created at: <p>{{ comment.created_at }}</p>
                        Content: <p>{{ comment.content }}</p>
                        <div v-if="user && (user.id === comment.user_id)">
                            <button class="btn btn-danger" @click="deleteComment(index)">Delete Comment</button>               
                        </div> 
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
        <div v-else>
            <p>No gradebook to show.</p>            
        </div>
        <errors-handler 
                :errors="showErrors"
        />
    </div>
</template>

<script>
import { gradebooksService } from '../services/gradebooks.service';
import { commentsService } from '../services/comments.service';
import { mapGetters } from "vuex";
import ErrorsHandler from './ErrorsHandler';
export default {
    components: {
      ErrorsHandler
    },
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
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.routeName = to.name;      
            if (vm.routeName === 'my-gradebook'){            
                gradebooksService.getGradebookByProfessorID(vm.user.id)
                    .then(response => {
                        vm.gradebook = response.data;
                        if (vm.gradebook.length > 0){
                            vm.gradebookID = vm.gradebook[0].id;
                            vm.getComments();                      
                        }
                    }).catch(e => {
                        vm.errors.push(e);
                    })
            }else{
                vm.gradebookID = to.params.id;
                gradebooksService.getGradebook(vm.gradebookID)
                    .then(response => {
                        vm.gradebook = response.data;                 
                        vm.getComments(); 
                    }).catch(e => {
                        vm.errors.push(e);
                    })
            }      
        })
    },
    computed: {
        ...mapGetters({
            user: "getUser"
        }),
        gradebookItemsList(){
            return this.gradebook.filter(g => g.studentFirstName !== undefined);
        },
        commentsList(){
            return this.comments;
        },
        showErrors(){
            return this.errors;
        },
    },
    methods: {
        getComments(){
            this.errors = [];
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
            this.errors = [];
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
            this.errors = [];
            let id = this.comments[index].id;
            var r = confirm("Are you sure?");
            if (r == true) {
                commentsService.deleteComment(id)
                    .then(() => {
                        this.comments.splice(index, 1);
                    }).catch(e => {
                        this.errors.push(e);
                    });           
            }        
        },
        deleteGradebook(id){
            this.errors = [];
            var r = confirm("Are you sure?");
            if (r == true) {
                gradebooksService.deleteGradebook(id)
                    .then(() => {
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
