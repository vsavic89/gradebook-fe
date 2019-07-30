<template>
    <div>    
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
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { authService } from '../services/Auth';
export default {
    data(){
        return {
                email: '',
                password: ''
        }
    },
    methods: {
      ...mapActions({
        login: 'login'
      }),
        submitForm(){
            this.login(
            {
                email: this.email,
                password: this.password
            }).then(() => {
                this.$router.push('/')
            })           
        }
    }
}
</script>

<style>

</style>
