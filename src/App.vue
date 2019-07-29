<template>
  <div id="app">
     <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="/">Gradebook</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <div v-if="!user">
                <router-link to="/login">Login | </router-link>
              </div>
              <div v-else>
                <a href @click="logout()">
                  <router-link to="/logout">Logout | </router-link>
                </a>
              </div>
            </li>
            <li class="nav-item">
               <router-link to="/register"> Register | </router-link>
            </li>
          </ul>
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
  components: {
  },
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
    logout() {
      authService.logout();
      this.$router.push('/login');
    }
  }
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
</style>
