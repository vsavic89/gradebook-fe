<template>
    <div class="container">
        <h2>Create New Gradebook</h2>
        <div class="text-center border border-light p-5 m-5">
                <label class="mb-2" for="name">Gradebook name: </label>
                <input class="m-4 form-control mb-2" minlength="2" type="text" name="name" v-model="newGradebook.name" /><br>
                <label for="selectProfessor">Select Professor: </label>
                <select class="browser-default custom-select m-4" name="selectProfessor" v-model="newGradebook.professor_id">
                    <option v-for="(professor, index) in professors" :key="index" :value="professor.id">
                        {{ professor.first_name + ' ' + professor.last_name }}
                    </option>
                </select>
                <button class="btn btn-primary m-2" @click="addGradebook">Submit</button>
                <button class="btn btn-secondary" @click="cancel">Cancel</button>   
        </div>     
        <errors-handler 
            :errors="showErrors"
        />
    </div>
</template>

<script>
import { gradebooksService } from '../services/gradebooks.service';
import { professorsService } from '../services/professors.service';
import ErrorsHandler from './ErrorsHandler';
export default {
    components: {
      ErrorsHandler
    },
    data(){
        return {
            newGradebook: {
                name: '',
                professor_id: undefined
            },
            professors: [],
            errors: []
        }
    },
    methods: {
        cancel(){
            this.$router.push('/gradebooks');
        },
        addGradebook(){ 
            this.errors = [];        
            if(this.newGradebook.name !== ''){   
                gradebooksService.add(this.newGradebook)
                    .then(response => {
                        this.$router.push('/gradebooks')
                    }).catch(e => {
                        this.errors.push(e);
                    })
            }else{
                this.errors.push({message: 'Gradebook name is not filled!'})
            }
        },
    },
    beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.errors = [];
      professorsService.getAll('onlyUnsignedProfessor')
        .then(response => {
            vm.professors = response.data;
        }).catch(e => {
            vm.errors.push(e);
        })      
      })
    },
    computed: {
        showErrors(){
            return this.errors;
        }
    }
}
</script>

<style>

</style>
