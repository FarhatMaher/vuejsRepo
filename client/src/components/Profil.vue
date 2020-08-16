<template>
<div class="container">
  
    Nom : {{profil.name}}
    <tr/>
    Email : {{profil.email}}
    <tr/>
    Total des publications publiées : {{totalPost}}
    <tr/>
    <router-link class="nav-link" to="/profil/update">Modifier mon profil</router-link>
    <router-link class="nav-link" to="/profil/updatePassword">mot de passe oublié ?</router-link>

    <a type="button" href="javascript:;" v-on:click="DeleteUser(profil.id)" >Supprimer mon compte </a>
</div>
</template>
<script>
import axios from "axios"
import router from "../router"
export default {
    name: "profil",
    data: () => ({
        profil:{
            name:""
        },
        totalPost: 0,
        token: ""
    }),

   mounted(){
        this.token = localStorage.getItem("token")

        this.getProfil();
        this.getAllPost();
    },



    methods: {

        getProfil(){
       
        let user_id = localStorage.getItem("user_id")     
        axios.get("http://localhost:3000/users/details/"+user_id,this.getHeaders( this.token)).then(res => { 
     

            this.profil= res.data;
        }).catch(err => {
            console.log(err)
        })
         
     } ,
     showPostDelails(id){
        this.$router.push({name: 'postDetails', params: {id: id}})
     },
     DeleteUser(id) {

   if(confirm("Do you really want to delete?")){

                axios.delete('http://localhost:3000/users/'+id,this.getHeaders(this.token))
                .then(() => {
                    alert("votre compte a été supprimé avec success")
                    localStorage.clear()
                          router.push({name:'Login'})
                })
                .catch(error => {
                    console.log(error);
                })
   }
   },

        getAllPost(){
        let user_id = localStorage.getItem("user_id")   
        axios.get("http://localhost:3000/posts/ByUser/"+user_id,this.getHeaders(this.token)).then(res => { 
            console.log(res)

            this.totalPost= res.data.length;
        }).catch(err => {
            console.log(err)
        })
         
},
 getHeaders(token) {

    const config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    return config
}



}
};
</script>