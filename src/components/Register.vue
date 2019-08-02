<template>
    <div>        
        <div v-if="!user">
        <form class="text-center border border-light p-5" method="POST" @submit.prevent="register">            
            <p class="h4 mb-4">Sign up</p>
            <input maxlength="255" class="form-control mb-4" placeholder="First Name" type="text" name="first_name" v-model="newUser.first_name" required/>        
            <input maxlength="255" class="form-control mb-4" placeholder="Last Name" type="text" name="last_name" v-model="newUser.last_name" required/>            
            <input maxlength="255" class="form-control mb-4" placeholder="E-mail" type="email" name="email" v-model="newUser.email" required/>            
            <input minlength="8" class="form-control mb-4" placeholder="Password" type="password" name="password" v-model="newUser.password" required/>                                    
            <input minlength="8" class="form-control mb-4" placeholder="Confirm Password" type="password" name="password_confirmation" v-model="newUser.password_confirmation" required/>        
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="termsAndConditions" name="termsAndConditions" v-model="newUser.accept_terms_and_conditions" required>
                <label class="custom-control-label" for="termsAndConditions">I accept terms and conditions</label>
            </div>
            <button class="btn btn-info btn-block my-4" type="submit">Register</button>                        
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
import { authService } from '../services/Auth'
import ErrorsHandler from './ErrorsHandler';
import { mapGetters } from "vuex";
export default {
    components: {
        ErrorsHandler
    },
    data(){
        return {
            newUser: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirmation: '',
                accept_terms_and_conditions: false
            },
            errors: []
        }
    },
    methods: {
        register(){
            this.errors = [];            
            authService.register(this.newUser)
            .then(response => {
                var r = confirm(response.data['success'] + '\nProceed on login page?');
                if (r==true)
                    this.$router.push('/login')  
                else
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
    }
}
</script>

<style>

</style>
