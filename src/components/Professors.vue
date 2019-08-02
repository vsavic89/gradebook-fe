<template>
    <div>
        <div v-if="user">
            <h2>A list of professors</h2>
            <label for="filter">Find professors by fullname: </label>
            <input type="text" name="filter" v-model="searchTerm" placeholder="(type here)"/>        
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
            <errors-handler 
                :errors="showErrors"
            />
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
        },
        showErrors(){
            return this.errors;
        },
        ...mapGetters({
            user: "getUser"
        }),
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {            
            vm.errors = [];
            professorsService.getAll()
                .then(response => {
                    vm.professors = response.data;
                }).catch(e => {
                    vm.errors.push(e)                    
                })  
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
