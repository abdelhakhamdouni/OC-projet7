<template>
<div id="post">
    <h3 class="manager-title font-italic">Le coin de publication...</h3>
           
    <article class="publication" v-for="(post, id) in posts" v-bind:key="id">
        <p class="idPost">N° {{post.id}}</p>
        <p class="titlePost">{{post.title}}</p>
        <p class="bodyPost">{{post.body}}</p>  
        <p class="ImagePost">{{post.image_URL}}</p>
        <p class="updatedPost" >Date de publication : {{post.updatedAt}}</p>
    </article>

    <button class="btnValidation" v-on:click="deletePost" >Supprimer l'article</button>
</div>
</template>


<script>
export default {
    name: 'Post',
    data () {
        return{
            id: '',
            title: '',
            body:'',
            image_URL: '',
            updateAt: ''
            }
        },
    mounted(){

         //Obtenir tous les posts avec fetch ???
         
      //Obtenir tous les posts
      fetch("http://localhost:3000/api/post",  {
             headers: {
                'authorization': 'bearer ' + localStorage.getItem('token')
            }})
      .then (response => response.json())
      .then(data=>this.posts = data)
    }, 


    methods: {
           deletePost() {
        let idPost = JSON.stringify({id: this.idPost});
            async function postForm(dataForm) {
    try {
        let response = await fetch("http://localhost:3000/api/posts", {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': 'bearer ' + localStorage.getItem('token')
            },
            body: dataForm
        });
        if (response.ok) {
            let responseId = await response.json();
            console.log(responseId)
            location.reload();
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        console.log(e);
    }
}
postForm(idPost);
   }
  }}
</script>


<style scoped lang="scss">
.btnValidation{
    background-color: #024601;
    color:#f0e8c7;
    font-weight: bold;
}
</style>