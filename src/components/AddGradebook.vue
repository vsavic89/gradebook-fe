<template>
    <div>
        <h2>Create New Gradebook</h2>
        <form method="POST" @submit.prevent="addGradebook">
            <div class="form-group">
                <label for="name">Gradebook name: </label>
                <input minlength="2" type="text" name="name" v-model="newGradebook.name" /><br>
                <label for="selectProfessor">Select Professor: </label>
                <select name="selectProfessor" v-model="newGradebook.professor_id">
                    <option v-for="(professor, index) in professors" :key="index" :value="professor.id">
                        {{ professor.first_name + ' ' + professor.last_name }}
                    </option>
                </select>
                <br>
                <button type="submit">Submit</button>
            </div>
        </form>
        <button @click="cancel">Cancel</button>        
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
