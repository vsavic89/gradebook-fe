<template>
    <div> 
        <div v-if="!user">   
            <form class="text-center border border-light p-5" method="POST" @submit.prevent="submitForm">
                <p class="h4 mb-4">Sign in</p>
                        <input maxlength="255" class="form-control mb-4" type="email" name="email" v-model="email" placeholder="E-mail" required/>
                <div class="form-group">
                    <div>
                        <input maxlength="255" class="form-control mb-4" type="password" name="password" v-model="password" placeholder="Password" required/>
                    </div>                    
                </div>
                <button class="btn btn-info btn-block my-4" type="submit">Log In</button>
            </form> 
            <errors-handler 
                :errors="showErrors"
            />
        </div>
        <div v-else>
            <h1>Restricted access, please log out.</h1>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from "vuex";
import ErrorsHandler from './ErrorsHandler';
export default {
    components: {
        ErrorsHandler
    },
    data(){
        return {
                email: '',
                password: '',
                errors: []
        }
    },
    methods: {
      ...mapActions({
        login: 'login'
      }),
        submitForm(){
            this.errors = []; 
            this.login(
            {
                email: this.email,
                password: this.password
            }).then(() => {                                              
                this.$router.push('/')
            }).catch(e => {                                
                this.errors.push(e.response.data);
            })
        }
    },
    computed: {
        showErrors(){
            return this.errors;
        },
        ...mapGetters({
            user: "getUser"
        }),
    },
}
</script>

<style>

</style>
