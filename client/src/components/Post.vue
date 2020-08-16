<template>
<div class="container">
    
    <ul>
        <li v-for="post in posts" :key="post.id">
        <img style="height:200px; width:200px" :src="'http://localhost:3000/'+ post.media.path">
       <tr/>
        <b>titre:</b>  {{post.titre}} <br>
        <b>contenu : </b> {{post.content}}
          <tr/>
        <b> publie par : </b> {{post.user.name}} à {{changeDateFormat(post.created_at)}}
        <button v-if="post.user.id==userId" type="button" @click="deletePost(post.id)">supprimer un post</button>
        <button v-if="post.user.id==userId" type="button" @click="goToUpdatePost()">modifier un post</button>

        </li> 
        
    </ul>

   <ul>
        <li v-for="com in comments" :key="com.id">
           
       {{com.user.name}} a commenté  : {{changeDateFormat(com.created_at)}} <tr/>
    <input type="text" placeholder="comment" id="ex"  style="width:500px" v-model="com.contenu">

       
    <button v-if="com.user.id==userId" type="button" @click="deleteComment(com.id)">supprimer commentaire</button>

    
    <button v-if="com.user.id==userId" type="button" @click="updateComment(com.id,com.contenu)">modifier commentaire</button>

        </li>
    </ul>

    <input type="text" placeholder="comment" id="ex"  style="width:500px" v-model="comment.contenu">
    <button type="button" @click="addComment">Ajouter un commentaire</button>

</div>
</template>

<script>
import axios from "axios"
import router from "../router"

export default {
    name : "post",

   data: () => ({

        post_id:"",
        posts: [],
        comments: [],
        comment: {
            userId: 0,
            postId: 0,
            status: 0,
            contenu: ""
        },
        update: true,
         commentUpdate: {
            userId: 0,
            postId: 0,
            status: 0,
            contenu: ""
        },
        token: "",
        userId: localStorage.user_id

    }),
    mounted(){
            this.token = localStorage.getItem("token")

        this.post_id = this.$route.params.id; 
      this.getPostInfo(this.post_id);
      this.getComments(this.post_id);
    },

    methods: {

        getPostInfo(id){
    
        axios.get("http://localhost:3000/posts/"+id,this.getHeaders(this.token)).then(res => { 
            console.log(res)

            this.posts= res.data;
        }).catch(err => {
            console.log(err)
        })
    },
       addComment(){
            let user_id = localStorage.getItem("user_id")  
           this.comment.userId = user_id
           this.comment.postId = this.post_id
      
           console.log(this.comment)
    
        axios.post("http://localhost:3000/comments/add",this.comment,this.getHeaders(this.token)).then(res => { 
           this.comment = {}
           console.log(res)
           this.getComments(this.post_id)

        }).catch(err => {
            console.log(err)
        })
    },
        getComments(postId){
    
        axios.get("http://localhost:3000/comments/byPost/"+postId,this.getHeaders(this.token)).then(res => { 
            console.log(res.data)

            this.comments= res.data;
        }).catch(err => {
            console.log(err)
        })
    },
     changeDateFormat(date){
            return new Date(date).toLocaleString();
     },
      deletePost(id) {

   if(confirm("Do you really want to delete?")){

                axios.delete('http://localhost:3000/posts/'+id,this.getHeaders(this.token))
                .then(() => {
                    alert("Votre publication à été avec success"),
                    router.push({name:'Posts'})

                 })
                .catch(error => {
                    console.log(error);
                })
   }
   }
   ,
      deleteComment(id) {

   if(confirm("Do you really want to delete?")){

                axios.delete('http://localhost:3000/comments/'+id,this.getHeaders(this.token))
                .then(() => {
                    alert("Votre Commentaire à été avec success"),
                             this.getComments(this.post_id);
                 })
                .catch(error => {
                    console.log(error);
                })
   }
   },
   updateComment(id,contenu){
       let user_id = localStorage.getItem("user_id")  
           this.comment.userId = user_id
           this.comment.postId = this.post_id
            this.comment.contenu = contenu
           console.log(this.comment)
    
        axios.put("http://localhost:3000/comments/"+id,this.comment,this.getHeaders(this.token)).then(res => { 
           this.comment = {}
           console.log(res)
           this.getComments(this.post_id)

        }).catch(err => {
            console.log(err)
        })
   }
   
   ,goToUpdatePost(){

                    router.push({name:'postUpdate' ,params: {id: this.post_id}})

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