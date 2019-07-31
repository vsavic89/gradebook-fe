<template>
    <div>
        <h2>My Gradebook</h2>  
        <div v-if="gradebook">
            <strong>{{gradebook.first_name + ' ' + gradebook.last_name}}</strong>
        </div>    
        <div v-else>
            <p>No default gradebook for you.</p>
        </div>
    </div>
</template>

<script>
import { gradebooksService } from '../services/gradebooks.service';
import { mapGetters } from "vuex";
export default {
    data(){
        return{
            gradebook: undefined,
            errors: []
        }
    },
    created(){
        gradebooksService.getGradebook(this.user.id)
            .then(response => {
                this.gradebook = response.data[0];
            }).catch(e => {
                this.errors.push(e);
            })
    },
    computed: {
        ...mapGetters({
            user: "getUser"
        })
    }
}
</script>

<style>

</style>
