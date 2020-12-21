<template>
<div class="formulaire">
    <form class="form">
        <div class="form-group">
            <label for="first_name">Nouveau prenom</label>
            <input type="text" class="form-control" id="first_name" v-model="first_name">
        </div>
       
       
        <button type="submit" class="btnValidation " v-on:click="updateUser">Modifier le profil</button>
    </form>
    <button class="btnValidation" v-on:click="deleteUser">Supprimer le profil</button>
</div>
</template>

<script>
export default {
    name: 'ProfilForm',
    data () {
        return {
        first_name: '',
        
        }
    },
    methods:{
    deleteUser() {
        let idUser = parseInt(localStorage.getItem("Id"));
        const dataForm = JSON.stringify({id: idUser});
        async function postForm(dataForm) {
            try {
                let response = await fetch("http://localhost:3000/api/auth/delete/:id", {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': 'bearer ' + localStorage.getItem('token')
                    },
                    body: dataForm
                });
                    if (response.ok) {
                        let responseId = await response.json();
                        console.log(responseId);
                        localStorage.removeItem('Id');
                        localStorage.removeItem('token');
                        localStorage.removeItem('isAdmin');
                        window.location.href = "http://localhost:8080/signup#/signup"
                    } else {
                        console.error('Retour du serveur : ', response.status);
                    }
            } catch (e) {
            console.log(e);
            }
        }
        postForm(dataForm);
    },
    updateUser() {
        let idUser = parseInt(localStorage.getItem("Id"));
        let dataForm = JSON.stringify({id: idUser, first_name: this.first_name });
        async function postForm(dataForm) {
            try {
                let response = await fetch("http://localhost:3000/api/auth/:id", {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': 'bearer ' + localStorage.getItem('token')
                    },
                    body: dataForm,
                });
                    if (response.ok) {
                        let responseId = await response.json();
                        console.log(responseId);
                        //Répondre ok modifcation
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
label{
    color:black;
}

</style>