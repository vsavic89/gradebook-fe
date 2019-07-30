<template>
    <div>
        <h2>Add professor</h2>
        <div @click="addProfessor">
            <label for="first_name">First name: </label>
            <input type="text" name="first_name" v-model="newProfessor.first_name"/>
            <label for="last_name">Last name: </label>
            <input type="text" name="first_name" v-model="newProfessor.last_name"/>
            <button>Submit</button>
        </form>
    </div>
</template>

<script>
import { professorsService } from '../services/professors.service';
export default {
    data(){
        return {
            images: []
        }
    },
    addProfessor(){
        
    },
    computed: {
        setImageList(){
            
        }
    }
}
</script>

<style>

</style>
