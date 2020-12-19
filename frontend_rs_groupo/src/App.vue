<template>
  <div id="app">
    <header>
     <div class="" v-if =" id === null">
      <router-link to="/signup">Inscription</router-link> |
      <router-link to="/login">Connexion</router-link> |
     </div>
    <div class="crud">  
        <router-link to="/allpost">Voir tous les posts</router-link> |
        <router-link to="/create">Créer un post</router-link> |
        <a href="#" v-on:click="exitUser">Exit</a> 
    </div> 
      <Header/>
    </header>

    <body class="bg-body">
      <router-view/>
    </body>

    <footer>
     <Footer/>
    </footer>

  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
     },
  data(){
    return {
      id: ''
    }
  },
  mounted() {
    let idUser = localStorage.getItem('Id');
    console.log(idUser);
    this.id = idUser;
  },
  methods: {
    exitUser (){
       localStorage.removeItem('Id');
       localStorage.removeItem('token');
       localStorage.removeItem('email');
       location.replace(location.origin + "/signup#/signup");
       location.reload();
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
 @media all and (max-width: 599px)
 {
.bg-body{
margin-bottom: 100px;
}
}

</style>
