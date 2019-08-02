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
            <li class="nav-item">                                       
              <router-link class="nav-link" to="/gradebooks">Gradebooks</router-link>                
            </li>
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
                <a href="#" @click="logoutUser" class="underline-remove">              
                <router-link class="nav-link btn btn-outline-success my-2 my-sm-0" to="/logout">                  
                    Logout                    
                </router-link>
                </a>
            </div>
          <div v-if="!user">
              <router-link class="nav-link btn btn-outline-danger my-2 my-sm-0" to="/register">Register</router-link>
          </div>            
        </div>
        </div>
      </nav>     
    </header>
    <main role="main">          
      <router-view/>    
      <div class="container">  
        <div v-if="$router.currentRoute.path === '/'">
          <img src="./assets/onlineGradebook.png"/><br>
          <h1>Welcome to Online Gradebook</h1>    
          <h2>:-)</h2>  
          <blockquote class="quote-card">
            <p>
              The most exciting website since 1991. 
            </p>
      
            <cite>
              Bill Gates
            </cite>
          </blockquote>
        </div>
      </div>
    </main>    
    <footer class="container">      
        <p>&copy; 2019 Vladimir Savic</p>
    </footer>
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
a:hover.underline-remove {   
    text-decoration: none;
}
ul {
  list-style-type: none;
}
.quote-card {
  background: #fff;
  color: #222222;
  padding: 20px;
  padding-left: 50px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(34, 34, 34, 0.12);
  position: relative;
  overflow: hidden;
  min-height: 120px;
}
.quote-card p {
  font-size: 18px;
  line-height: 1.5;
  margin: 0;
  max-width: 80%;
}
.quote-card cite {
  font-size: 16px;
  margin-top: 10px;
  display: block;
  font-weight: 200;
  opacity: 0.8;
}
.quote-card:before {
  font-family: Georgia, serif;
  content: "“";
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 5em;
  color: rgba(238, 238, 238, 0.8);
  font-weight: normal;
}
.quote-card:after {
  font-family: Georgia, serif;
  content: "”";
  position: absolute;
  bottom: -110px;
  line-height: 100px;
  right: -32px;
  font-size: 25em;
  color: rgba(238, 238, 238, 0.8);
  font-weight: normal;
}
</style>
