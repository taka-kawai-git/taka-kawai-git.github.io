<template>
    <div id="login">
        <div class="container">
            <div class="row">
                <div class="col s12 m8 offset-m2">
                    <div class="center">
                        <div class="fs-1-5 fw-b m-y-2 font-bold">ログイン</div>
                        <form>
                            <input type="text" class="grey lighten-3 border-0 rounded-10" id="email"
                            placeholder="メールアドレス" v-model="email">
                            <input type="password" class="grey lighten-3 border-0 rounded-10" id="password"
                            placeholder="パスワード" v-model="password">
                            <button v-on:click="login" class="btn waves-effect waves-light
                            rounded-10 w-100 bg-theme z-depth-0 m-y-1 h-3">ログイン</button>
                        </form>
                    </div>
                    <router-link to="/reset-password" class="right">
                        パスワードを忘れた場合
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'login',
    data: function() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login: function(e) {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
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
