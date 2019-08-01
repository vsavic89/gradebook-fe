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

        <div v-if="errors.length > 0">
            <p v-for="(error, index) in errors" :key="index">
                {{ error }}
            </p>
        </div>

    </div>
</template>

<script>
import { gradebooksService } from '../services/gradebooks.service';
import { professorsService } from '../services/professors.service';
export default {
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
            gradebooksService.add(this.newGradebook)
                .then(response => {
                    this.$router.push('/gradebooks')
                }).catch(e => {
                    this.errors.push(e);
                })
        },
    },
    created(){
        professorsService.getAll('onlyUnsignedProfessor')
        .then(response => {
            this.professors = response.data;
        }).catch(e => {
            this.errors.push(e);
        })
    }
}
</script>

<style>

</style>
