<template>
<div class="formulaire">
    <form class="form">
    <div class="form-group">
        <label for="email">Adresse email</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
    </div>
    <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
    </div>
    <button type="submit" class="btnValidation" v-on:click.prevent="loginUser">Connexion</button>
    </form>
</div>
</template>


<script> 
export default {
    name: 'ConnexionForm',
    data () {
        return{
            email: '',
            password: ''
            }
        },
        
    methods:{
           loginUser() {
            let dataForm = JSON.stringify({email : this.email, password : this.password});
            async function postForm(dataToSend) {
                try {
                    let response = await fetch("http://localhost:3000/api/auth/login", {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: dataToSend,
                    });
                        if (response.ok) {
                            let responseId = await response.json();
                            localStorage.setItem("Id", responseId.userId);
                            localStorage.setItem("token", responseId.token);
                             localStorage.setItem("isAdmin", responseId.isAdmin);
                            localStorage.setItem("email", responseId.email);
                            location.replace(location.origin + "/signup#/allpost");
                        } else {
                            console.error('Retour du serveur : ', response.status);
                        }
                } catch (e) {
                    console.log(e);
                }
            }
            postForm(dataForm);
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
</style>