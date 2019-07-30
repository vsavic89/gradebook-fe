<template>
    <div>
        <h2>A list of gradebooks</h2>
        <div v-if="gradebooks.length > 0">     
            <div class="form-group">
                <label for="filter">Search Term: </label>
                <input type="text" name="filter" v-model="searchTerm" />
            </div>
                    <ul>
                    <li v-for="(gradebook, index) in filteredGradebooks" :key="index">
                        <strong><p>Gradebook name: <button @click="goToGradebook(gradebook.id)">{{ gradebook.name }}</button></p></strong>
                        <p>Number of students: {{ gradebook.numberOfStudents }}</p>                                                                   
                        <p v-if="gradebook.professor_id">
                            Professor fullname: <button @click="goToTeacher(gradebook.professor_id)">{{ gradebook.first_name + ' ' + gradebook.last_name }}</button>
                        </p>
                        <p v-else>
                            No professor for this gradebook
                        </p>
                        <p>Created at: {{ gradebook.created_at }}</p>                    
                    </li>
                </ul>
        </div>
        <div v-else>
            <h4>Sorry, no gradebooks to show, please add one.</h4>
        </div>
    </div>
</template>

<script>
import { gradebooksService } from '../services/gradebooks.service';
export default {
    data(){
        return {
            gradebooks: [],
            searchTerm: ''
        }
    },
    created(){
        gradebooksService.getAll()
            .then(response => {
                this.gradebooks = response.data;
            }).catch(e => {
                console.log(e);
                //this.errors.push(e)
            })
    },
    computed: {
        filteredGradebooks(){
            return this.gradebooks.filter(gradebook => gradebook.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
        }
    },
    methods: {
        goToGradebook(id){
            return this.$router.push('/gradebooks/'+id);
        },
        goToTeacher(id){
            return this.$router.push('/professors/'+id);
        }
    }
}
</script>

<style>

</style>
