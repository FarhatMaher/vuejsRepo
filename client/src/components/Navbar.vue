<template>
    <div>
       <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Groupomania</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li v-if="token  != null ">
               <router-link class="nav-link" to="/posts">Publication</router-link>
           </li>
       <li v-if="token  != null ">
               <router-link class="nav-link" to="/post/add">Ajouter une publication</router-link>
           </li>
              <li v-if="token  != null ">
               <router-link class="nav-link" to="/profil">Mon profil</router-link>
           </li>

          <li v-if="token  != null ">
               <a class="nav-link" @click="logOut()">Déconnexion</a>
           </li>
           

          </ul>
        </div>
      </nav> 
    </div>
</template>

<script>
import router from '../router'
import EventBus from './EventBus'
EventBus.$on('logged-in', test => {
  console.log(test)
})
export default {
  name : "navbar",
  data(){
    return {
      auth: '',
      token: localStorage.usertoken,
    }
  },
  methods: {
    logOut(){
      localStorage.clear();
      router.push({name:'Login'})
    }
  },
}
</script>