<template>
<div class="container">
  
  
    <ul>
        <li v-for="post in posts" :key="post.id" >
        <img @click="showPostDelails(post.id)" style="height:200px; width:200px" :src="'http://localhost:3000/'+ post.media.path">
       <tr/>
        <b>Label:</b>  {{post.titre}} <br>
        <b>description : </b> {{post.content}}
          <tr/>
        <b> publie par : </b> {{post.user.name}} à {{changeDateFormat(post.created_at)}}
            <button v-if="post.user.id==userId" type="button" @click="deletePost(post.id)">supprimer un post</button>

        </li> 
        
    </ul>

</div>
</template>
<script>
import axios from "axios"

export default {
    name: "posts",
    data()  {
    return {
        posts:[],
        token: "",
        userId: localStorage.user_id
    }

},
    mounted(){

    this.token = localStorage.getItem("token")
        this.getAllPost();
    },



    methods: {

        getAllPost(){
    
        axios.get("http://localhost:3000/posts/list",this.getHeaders(this.token)).then(res => { 
            console.log(res)
            this.posts= res.data.reverse();
        }).catch(err => {
            console.log(err)
        })
         
     } ,
     showPostDelails(id){
        this.$router.push({name: 'postDetails', params: {id: id}})
     },
     changeDateFormat(date){
            return new Date(date).toLocaleString();
     },
        deletePost(id) {

   if(confirm("Do you really want to delete?")){

                axios.delete('http://localhost:3000/posts/'+id,this.getHeaders(this.token))
                .then(() => {
                    alert("Votre publication à été avec success"),
                    this.getAllPost()
                 })
                .catch(error => {
                    console.log(error);
                })
   }
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