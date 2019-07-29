<template>
    <div>
        <h1>Please login...</h1>
        <form method="POST" @submit.prevent="login">
            <div>
                <label for="email">Email: </label>
                <input type="email" name="email" v-model="email"/>
            </div>
            <div>
                <label for="password">Password: </label>
                <input type="password" name="password" v-model="password"/>
            </div>
            <button class="btn btn-primary" type="submit">Login</button>
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
        login(){
            authService.login(this.email, this.password)
                .then(response => {
                    this.$router.push('/')
                }).catch(e => {
                    console.log(e)
                })
        }
    }
}
</script>

<style>

</style>
