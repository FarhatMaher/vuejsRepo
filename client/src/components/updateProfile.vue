<template>
    <div>
        <div class="container">
        <form v-on:submit.prevent="register">
            <div class="form-group">
                <label for="userName">Nom</label>
                <input type="text" class="form-control" id="userName" aria-describedby="emailHelp" v-model="data.name">
              </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="data.email">
            </div>
            <button type="submit" class="btn btn-primary">Modifier</button>
          </form>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
    name: "updateProfile",
    data: () => ({
         data : {
             name: '',
             email: '',
            }
     })
    ,
    mounted() {
          this.getProfil();
    },

   methods: {
     register () {
        let user_id = localStorage.getItem("user_id")   
        axios.put("http://localhost:3000/users/update/"+user_id,this.data
        ).then(res => { 
            console.log(res)
            router.push({name:'Profil'})
        }).catch(err => {
            console.log(err)
        })
         
     },

        getProfil(){
        let user_id = localStorage.getItem("user_id")     
        axios.get("http://localhost:3000/users/details/"+user_id).then(res => { 
     

            this.data= res.data;
            // console.log(this.profils[0])
        }).catch(err => {
            console.log(err)
        })
     }
}
}

</script>

<style lang="stylus" scoped>

</style>