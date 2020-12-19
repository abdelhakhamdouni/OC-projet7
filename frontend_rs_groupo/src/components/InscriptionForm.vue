<template>
<div class="formulaire">
    <form class="form">
        <div class="form-group">
            <label for="first_name">Prenom</label>
            <input type="text" class="form-control" id="first_name" v-model="first_name" required>
        </div>
        <div class="form-group">
            <label for="last_name">Nom</label>
            <input type="text" class="form-control" id="last_name" v-model="last_name" required>
        </div>
        <div class="form-group">
            <label for="email">Adresse mail</label>
            <input type="email" class="form-control" id="email" v-model="email" required>
        </div>
        <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" class="form-control" id="password" v-model="password" required>
        </div>
        <div class="form-group">
            <label for="image_URL">Photo</label>
            <input type="image_URL" class="form-control" id="image_URL" v-model="image_URL" required>
        </div>
        <button type="submit" class="btnValidation" v-on:click.prevent="signUpUser">Inscription</button>
    </form>
</div>
</template>


<script>
export default {
    name: 'InscriptionForm',
    data() { return {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        image_URL: ''
        }
    },

    methods: {
        signUpUser(){
            let dataForm = JSON.stringify({first_name: this.first_name, last_name: this.last_name,email: this.email, password: this.password, image_URL: this.image_URL});
            async function signUp(dataForm) {
                try {
                let response = await fetch("http://localhost:3000/api/auth/signup", {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: dataForm,
                });
                    if (response.ok) {
                        let responseId = await response.json();
                        console.log(responseId);
                    
                    } else {
                        console.error('Retour du serveur : ', response.status);
                    }
                } catch (e) {
                console.log(e);
                }
            }
            signUp(dataForm)
            window.location.href = "http://localhost:8080/signup#/login";
           
            
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