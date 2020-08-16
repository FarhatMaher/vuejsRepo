<template>
    <div>
      <div class="container">
        <form>
            <div class="form-group">
              <label for="exampleFormControlInput1">titre</label>
              <input type="text" class="form-control" v-model="post.label" id="exampleFormControlInput1" placeholder="name@example.com">
            </div>
        
  <div class="form-group">
              <label >Type de publication</label>
              <input type="text" class="form-control" v-model="post.post_type" placeholder="3">
            </div>

            <div class="form-group">
              <label for="exampleFormControlTextarea1">Desciption</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" v-model="post.description" rows="3"></textarea>
            </div>

          </form>
          <form>
            <div class="form-group">
              <label for="exampleFormControlFile1">Média</label>
              <input type="file" id="file" ref="file" v-on:change="handleFileUpload()">
            </div>
          </form>
         <button type="button" @click="addPost" class="btn btn-primary">Envoyer</button>
    </div>
    </div>
</template>
<script>
import axios from "axios"
export default {

name: "addPost",
   data: () => ({
        post : {
            
            label :"",
            description: "",
            post_type: "",
            user_id: ""
        },
        file: "",
        token: localStorage.token

    })
,
 methods: {
      handleFileUpload(){
    this.file = this.$refs.file.files[0];
      },
 
        addPost(){
            
            let user_id = localStorage.getItem("user_id")         
            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('titre', this.post.label);
            formData.append('content', this.post.description);
            formData.append('userId', user_id);
        this.post_type= ""
        this.description= ""
        this.label= ""

        axios.post("http://localhost:3000/posts/create",formData, {
            headers: {
                'Content_Type': 'multupart/form-data',
                'Authorization': 'Bearer ' + this.token
            }
        }).then(res => { 
                console.log(res)
                alert("post ajoute avec succes")
        }).catch(err => {
            console.log(err)
        })
         
     }

}
        

}

</script>
<style  scoped>

</style>