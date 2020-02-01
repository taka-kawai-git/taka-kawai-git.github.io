<template>
    <div class="">
        <div class="container">
            <div class="row">
                <div class="col s12 m8 offset-m2">
                    <div class="center">
                        <div class="fs-1-5 fw-b m-y-2 font-bold">登録</div>
                        <form>
                            <input type="text" class="grey lighten-3 border-0 rounded-5" id="email"
                            placeholder="メールアドレス" v-model="email">
                            <input type="password" class="grey lighten-3 border-0 rounded-5" id="password"
                            placeholder="パスワード" v-model="password">
                            <button v-on:click="register" class="btn btn-large rounded-5 w-100 blue-grey m-y-1">登録</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'register',
    data: function() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        register: function(e) {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(
                user => {
                    console.log('Logged in as ' + user.user.email);
                    this.$router.go({path: this.$router.path});
                },
                err => {
                    alert(err.message);
                }
            )
            e.preventDefault();
        }
    }
};
</script>

<style scoped>
    @import "../assets/common.css";
</style>