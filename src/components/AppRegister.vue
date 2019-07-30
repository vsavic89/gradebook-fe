<template>
    <div>        
        <form class="text-center border border-light p-5" method="POST" @submit.prevent="register">            
            <p class="h4 mb-4">Sign up</p>
            <input maxlength="255" class="form-control mb-4" placeholder="First Name" type="text" name="first_name" v-model="user.first_name" required/>        
            <input maxlength="255" class="form-control mb-4" placeholder="Last Name" type="text" name="last_name" v-model="user.last_name" required/>            
            <input maxlength="255" class="form-control mb-4" placeholder="E-mail" type="email" name="email" v-model="user.email" required/>            
            <input minlength="8" class="form-control mb-4" placeholder="Password" type="password" name="password" v-model="user.password" required/>                                    
            <input minlength="8" class="form-control mb-4" placeholder="Confirm Password" type="password" name="password_confirmation" v-model="user.password_confirmation" required/>        
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="termsAndConditions" v-model="user.acceptedTermsAndCondition" required>
                <label class="custom-control-label" for="termsAndConditions">I accept terms and conditions</label>
            </div>
            <button class="btn btn-info btn-block my-4" type="submit">Register</button>                        
        </form>
    </div>
</template>

<script>
import { authService } from '../services/Auth'
export default {
    data(){
        return {
            user: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirmation: '',
                acceptedTermsAndCondition: false
            }
        }
    },
    methods: {
        register(){
            if(this.user.acceptedTermsAndCondition){
                authService.register(this.user)
                .then(() => {
                    this.$router.push('/')
                })
            }
        }
    }
}
</script>

<style>

</style>
