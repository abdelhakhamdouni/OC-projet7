<template>
<div class="formulaire">
    <form class="form">
       
        <div class="form-group">
            <label for="body">Contenu</label>
            <textarea class="form-control" id="body" v-model="content" rows=5 cols=33 required placeholder="Ecrire un article ou partagez un lien vers un article de votre choix..."></textarea>
        </div>

        <div class="form-group">
            <label for="image_URL">Image</label>
            <input type="text" class="form-control" id="image_URL" v-model="image_URL" max-length=50 required>
        </div>

        <button type="submit" class="btnValidation" v-on:click.prevent="createComment">Partager</button>
    </form>
</div>
</template>


<script>
export default {
    name: 'CreateCommentForm',
    data () {
        return {
            id: '',
            body: '',
            image_URL: ''

        }
    },

    methods:{
        createComment() {

            // methode fetch 
        }
    }
}
</script>

<style scoped lang="scss">
.btnValidation{
    background-color: #024601;
    color:#f0e8c7;
    font-weight: bold;
}

.form-group{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
}

label{
    color:black;
}
</style>