<template>
    <div>
        <div class="container">
        <form v-on:submit.prevent="register">
            <div class="form-group">
                <label for="userName">Nom</label>
                <input type="text" class="form-control" id="userName" aria-describedby="emailHelp" v-model="name">
              </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">Valider</button>
          </form>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'


export default {
    data() {
     return {
         name: '',
         email: '',
         password: ''
     }
    },
   methods: {
     register () {
        axios.post("http://localhost:3000/users/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          role_id: 2 
           
        }).then(res => { 
            console.log(res)
            router.push({name:'Login'})
        }).catch(err => {
            console.log(err)
        })
         
     }
     }
}

</script>

<style lang="stylus" scoped>

</style>