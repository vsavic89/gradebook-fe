<template>
    <div>
        <h2>Professor info</h2>
        <div v-if="professor.length > 0">
            <ul>
                <li><img width="100" height="100" :src="professor[0].imageUrl"/></li>
                <li>Fullname: {{ professor[0].first_name + ' ' + professor[0].last_name }}</li>  
                <li v-if="professor[0].gradebook_name">Gradebook name: {{ professor[0].gradebook_name }}</li>          
                <li v-else>Gradebook name: undefined</li>
                <li>Number of students: {{ numberOfStudents }}</li>
            </ul>
            <errors-handler 
                :errors="showErrors"
            />
        </div>
        <div v-else>
           <p>No info to show</p> 
        </div>
    </div>
</template>

<script>
import { professorsService } from '../services/professors.service';
import ErrorsHandler from './ErrorsHandler';
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
    computed: {
        showErrors(){
            return this.errors;
        },
    }
}
</script>

<style>

</style>
