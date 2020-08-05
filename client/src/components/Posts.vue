<template>
<div class="container">
  
  
    <ul>
        <li v-for="post in posts" :key="post.id" @click="showPostDelails(post.id)">
        <img style="height:200px; width:200px" :src="'http://localhost:3000/images/'+ post.path">
       <tr/>
        <b>Label:</b>  {{post.label}} <br>
        <b>description : </b> {{post.description}}
          <tr/>
        <b> publie par : </b> {{post.user.name}} à {{changeDateFormat(post.created_at)}}
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
        posts:[]
    }

},
    mounted(){

        this.getAllPost();
    },



    methods: {

        getAllPost(){
    
        axios.get("http://localhost:3000/posts/list").then(res => { 
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
     }
     
}
        
    };
</script>