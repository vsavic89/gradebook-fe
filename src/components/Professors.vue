<template>
    <div>
        <h2>A list of professors</h2>
        <label for="filter">Filter: </label>
        <input type="text" name="filter" v-model="searchTerm" />        
        <div v-if="filteredProfessors.length > 0">    
        <table border="1" align="center">
            <tr>
                <th>Picture</th>
                <th>Fullname</th>
                <th>Gradebook name</th>
                <th>Action</th>
            </tr>
            <tr v-for="(professor, index) in filteredProfessors" :key="index">
                <td><img width="100" height="100" :src="professor.imageUrl"/></td>
                <td>{{ professor.first_name + ' ' + professor.last_name }}</td>
                <td v-if="professor.gradebook_name">
                    {{ professor.gradebook_name }}
                </td>            
                <td v-else>
                    <p>Professor is available</p>
                </td>  
                <td><button @click="showProfessor(professor.id)">Show</button></td>
            </tr>
        </table>
        </div>
        <div v-else>            
            <h3>Sorry, no professors to show, please add one.</h3>
        </div>
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
            professors: [],
            searchTerm: '',
            errors: []
        }
    },
    computed: {
        filteredProfessors(){
            return this.professors.filter(professor => 
                professor.first_name.toLowerCase().includes(this.searchTerm.toLowerCase())
                ||
                professor.last_name.toLowerCase().includes(this.searchTerm.toLowerCase())
            )
        }
    },
    created(){
        professorsService.getAll()
            .then(response => {
                this.professors = response.data;
            }).catch(e => {
                this.errors.push(e)
            })
    },
    methods: {
        showProfessor(id){
            this.$router.push('professors/'+id);
        }
    }
}
</script>

<style>

</style>
