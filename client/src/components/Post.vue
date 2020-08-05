<template>
<div class="container">
    
    <ul>
        <li v-for="post in posts" :key="post.id">
        <img style="height:200px; width:200px" :src="'http://localhost:3000/images/'+ post.path">
       <tr/>
        <b>Label:</b>  {{post.label}} <br>
        <b>description : </b> {{post.description}}
          <tr/>
        <b> publie par : </b> {{post.user.name}} à {{changeDateFormat(post.created_at)}}
        </li> 
    </ul>

   <ul>
        <li v-for="com in comments" :key="com.id">
       {{com.user.name}} a commenté  : {{changeDateFormat(com.created_at)}} <tr/>
       <b>commentaire :</b>  {{com.comments}} <br>
        </li>
    </ul>

    <input type="text" placeholder="comment" id="ex"  style="width:500px" v-model="comment.comments">
    <button type="button" @click="addComment">Ajouter un commentaire</button>

</div>
</template>

<script>
import axios from "axios"

export default {
    name : "post",

   data: () => ({

        post_id:"",
        posts: [],
        comments: [],
        comment: {
            user_id: 0,
            post_id: 0,
            status: 0,
            comments: ""
        }

    }),
    mounted(){
        this.post_id = this.$route.params.id; 
      this.getPostInfo(this.post_id);
      this.getComments(this.post_id);
    },

    methods: {

        getPostInfo(id){
    
        axios.get("http://localhost:3000/posts/"+id).then(res => { 
            console.log(res)

            this.posts= res.data;
        }).catch(err => {
            console.log(err)
        })
    },
       addComment(){
            let user_id = parseInt(localStorage.getItem("user_id"))     

           this.comment.user_id = user_id
           this.comment.post_id = parseInt(this.post_id)
      
           console.log(this.comment)
    
        axios.post("http://localhost:3000/comments/add",this.comment).then(res => { 
           this.comment = {}
           console.log(res)
           this.getComments(this.post_id)

        }).catch(err => {
            console.log(err)
        })
    },
        getComments(postId){
    
        axios.get("http://localhost:3000/comments/byPost/"+postId).then(res => { 
            console.log(res.data)

            this.comments= res.data;
        }).catch(err => {
            console.log(err)
        })
    },
     changeDateFormat(date){
            return new Date(date).toLocaleString();
     }

}
};
</script>