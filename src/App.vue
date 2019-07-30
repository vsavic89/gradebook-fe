<template>
  <div id="app">
     <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="/">Online Gradebook</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <div v-if="user">  
              <li class="nav-item">                                       
                <router-link class="nav-link" to="/gradebooks">Gradebooks</router-link>                
              </li>
            </div>
            <div v-if="user">  
              <li class="nav-item">                              
                  <router-link class="nav-link" to="/professors">All Professors</router-link>                                  
              </li>
            </div>
            <div v-if="user">
              <li class="nav-item">  
                  <router-link class="nav-link" to="/my-gradebook">My Gradebook</router-link>
              </li>
            </div>
            <div v-if="user">
              <li class="nav-item">  
                  <router-link class="nav-link" to="/gradebooks/create">Add Gradebook</router-link>
              </li>
            </div>
            <div v-if="user">
              <li class="nav-item">  
                  <router-link class="nav-link" to="/professors/create">Add Professor</router-link>
              </li>
            </div>
          </ul>
        <div class="form-inline mt-2 mt-md-0">         
            <div v-if="!user">                             
                <router-link class="nav-link btn btn-outline-primary my-2 my-sm-0 mr-sm-2" to="/login">Login</router-link>                                  
            </div>
            <div v-else>                
                <router-link class="nav-link btn btn-outline-success my-2 my-sm-0" to="/logout"><a class="underline-remove" @click="logoutUser()">Logout</a></router-link>
            </div>
          <div v-if="!user">
              <router-link class="nav-link btn btn-outline-danger my-2 my-sm-0" to="/register">Register</router-link>
          </div>            
        </div>
        </div>
      </nav>     
    </header>
    <router-view/>
  </div>
</template>
<script>
import { authService } from "./services/Auth";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {      
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser"
    })
  },
  methods: {
    ...mapActions({
      setUser : 'setUser'
    }),
    ...mapActions({
      logout: 'logout'
    }),
    logoutUser() {
      this.logout();
      this.$router.push('/');
    }
  },
};
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a.underline-remove {
    text-decoration: none;
}
ul {
  list-style-type: none;
}
</style>
