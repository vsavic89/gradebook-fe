<template>
    <div>
        <h1>Please register...</h1>
        <form method="POST" @submit.prevent="register">
            <div>
                <label for="firstName">First Name: </label>
                <input type="text" name="first_name" v-model="user.first_name" required/>
            </div>
            <div>
                <label for="lastName">Last Name: </label>
                <input type="text" name="last_name" v-model="user.last_name" required/>
            </div>
            <div>
                <label for="email">Email: </label>
                <input type="email" name="email" v-model="user.email" required/>
            </div>
            <div>
                <label for="password">Password: </label>
                <input type="password" name="password" v-model="user.password" required/>
            </div>
            <div>
                <label for="passwordConfirmation">Confirm Password: </label>
                <input type="password" name="password_confirmation" v-model="user.password_confirmation" required/>
            </div>
            <div>
                <label for="termsAndConditions">I accept terms and conditions </label>
                <input type="checkbox" name="termsAndConditions" v-model="user.acceptedTermsAndCondition" required/>
            </div>
            <button type="submit">Register</button>
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
