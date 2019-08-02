<template>
    <div class="container">
        <div v-if="user">
            <h2>Professor info</h2>
            <div v-if="professor.length > 0" class="text-center border border-light p-5 m-5">
                <table border="1" width="100%">
                    <tr>
                        <th>Picture</th>
                        <th>Fullname</th>
                        <th>Gradebook name</th>
                        <th>Number of students</th>
                    </tr>
                    <td><img width="100" height="100" :src="professor[0].imageUrl"/></td>
                    <td>{{ professor[0].first_name + ' ' + professor[0].last_name }}</td>  
                    <td v-if="professor[0].gradebook_name"><button class="btn btn-primary" @click="goToGradebook(professor[0].id)">{{ professor[0].gradebook_name }}</button></td>          
                    <td v-else>undefined</td>
                    <td>{{ numberOfStudents }}</td>
                </table>
                <errors-handler 
                    :errors="showErrors"
                />
            </div>
            <div v-else>
            <p>No info to show</p> 
            </div>
        </div>
        <div v-else>
            <h1>Restricted access, please log in.</h1>
        </div>
    </div>
</template>

<script>
import { professorsService } from '../services/professors.service';
import ErrorsHandler from './ErrorsHandler';
import { mapGetters } from "vuex";
export default {
    components: {
      ErrorsHandler
    },
    data(){
        return {
            professor: [],  
            errors: []  ,
            numberOfStudents: 0        
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            let professorID = to.params.id;            
            professorsService.getProfessor(professorID)
                .then(response => {
                    vm.professor = response.data;
                    vm.numberOfStudents = vm.professor.filter(p => p.studentID !== null).length                            
                }).catch(e => {
                    vm.errors.push(e)
                })     
        })
    },
    methods: {
        goToGradebook(id){
            return this.$router.push('/gradebooks/'+id);
        }
    },
    computed: {
        showErrors(){
            return this.errors;
        },
        ...mapGetters({
            user: "getUser"
        }),
    }
}
</script>

<style>

</style>
