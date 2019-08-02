<template>
    <div>
        <h2>A list of gradebooks</h2>
        <div v-if="gradebooks.length > 0">     
            <div class="form-group">
                <label for="filter">Find gradebook by name: </label>
                <input type="text" name="filter" v-model="searchTerm" placeholder="(type here)"/>
            </div>
            <table border="1" width="100%">
                <tr>
                    <th>Gradebook name </th>
                    <th>Professor fullname</th>
                    <th>Created at</th>
                </tr>
                <tr v-for="(gradebook, index) in filteredGradebooks" :key="index">
                    <td><button class="btn btn-primary" @click="goToGradebook(gradebook.id)">{{ gradebook.name }}</button></td>
                    <td v-if="gradebook.professor_id">
                        <div v-if="user">
                            <button class="btn btn-secondary" @click="goToTeacher(gradebook.professor_id)">
                                {{ gradebook.first_name + ' ' + gradebook.last_name }}
                            </button>
                        </div>
                        <div v-else>
                            <strong>{{ gradebook.first_name + ' ' + gradebook.last_name }}</strong>
                        </div>
                    </td>
                    <td v-else>
                        No professor for this gradebook
                    </td>
                    <td>{{ formatDate(gradebook.created_at, 'dddd, MMMM Do YYYY') }}</td>                    
                </tr>
            </table>
            <div v-if="showMoreVisible">
                <button class="btn btn-success" @click="showMore">Show More</button>
            </div>
        </div>
        <div v-else>
            <h4>Sorry, no gradebooks to show, please add one.</h4>
        </div>
        <errors-handler 
                :errors="showErrors"
        />
    </div>
</template>

<script>
import { gradebooksService } from '../services/gradebooks.service';
import { mapGetters } from "vuex";
import ErrorsHandler from './ErrorsHandler';
import { dateMixin } from '../mixins/mixins';
export default {
    mixins: [
        dateMixin
    ],
    components: {
      ErrorsHandler
    },
    data(){
        return {
            gradebooks: [],
            searchTerm: '',
            errors: [],
            currentPage: 0,
            rowsPerPage: 10,
            totalPages: undefined
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.getGradebooks();
        })
    },
    computed: {
        ...mapGetters({
            user: "getUser"
        }),
        filteredGradebooks(){
            return this.gradebooks.filter(gradebook => gradebook.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
        },
        showErrors(){
            return this.errors;
        },
        showMoreVisible(){
            if((this.rowsPerPage*this.currentPage) >= this.totalPages){
                return false
            }else{
                return true;
            }
        }
    },
    methods: {
        getGradebooks(){
            this.errors = [];
            this.currentPage++;
            gradebooksService.getAll(this.currentPage, this.rowsPerPage)
                .then(response => {
                    this.gradebooks = response.data.data;
                    this.totalPages = response.data.total;
                }).catch(e => {
                    this.errors.push(e)
                })
        },
        goToGradebook(id){
            return this.$router.push('/gradebooks/'+id);
        },
        goToTeacher(id){
            return this.$router.push('/professors/'+id);
        },
        showMore(){
            this.getGradebooks();
        }
    }
}
</script>

<style>

</style>
