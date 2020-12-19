<template>
<div class="headerInscr">
    <h2 class="title2">Le Mur</h2>
    <p class="inscrP">Ici, vous pouvez lire ce que vos collègues ont écrit ou partagé...</p>
    <Post/>
</div>
</template>

<script>
import Post from '../components/Post'
export default {
    name: 'AllPost',
    components: {
    Post
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
</style>