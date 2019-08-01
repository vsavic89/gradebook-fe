<template>
    <div>
        <h2>Professor info</h2>
        <ul>
            <li><img width="100" height="100" :src="professor.imageUrl"/></li>
            <li>Fullname: {{ professor.first_name + ' ' + professor.last_name }}</li>  
            <li v-if="professor.gradebook_name">Gradebook name: {{ professor.gradebook_name }}</li>          
            <li v-else>Gradebook name: undefined</li>
        </ul>
        <div v-if="errors.length > 0">
            <p v-for="(error, index) in errors" :key="index">
                {{ error }}
            </p>
        </div>
    </div>
</template>

<script>
import { professorsService } from '../services/professors.service';
export default {
    data(){
        return {
            professor: {},  
            errors: []          
        }
    },
    created(){
        let professorID = this.$router.currentRoute.params.id;
        professorsService.getProfessor(professorID)
            .then(response => {
                this.professor = response.data[0];
            }).catch(e => {
                this.errors.push(e)
            })

    },
}
</script>

<style>

</style>
