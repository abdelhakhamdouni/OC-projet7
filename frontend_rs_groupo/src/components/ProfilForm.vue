<template>
<div class="headerInscrr">
    <h2 class="title2">Profil</h2>
    <p class="inscrP">Ici, vous pouvez modifier votre prenom ou supprimer votre compte du forum...</p>
    <ProfilForm/>
</div>
</template>

<script>
import ProfilForm from '../components/ProfilForm'
export default {
    name: 'Profil',
    components: {
    ProfilForm
    }
}
</script>


<style scoped>
.headerInscr{
display: flex;
flex-direction: column;
align-items: center;
}

.title2{
    text-align: center;
    color: rgb(105, 11, 11);
    border: 2px solid black;
    border-radius: 8px;
    box-shadow: 10px 5px 5px red;
}

.inscrP{
    text-align: center;
    font-style: italic;
}

 @media all and (max-width: 599px)
 {
  .headerInscr{
      margin-bottom:50px;
  }   
 }
</style>