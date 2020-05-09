<template>
    <div id="navbar">
        <nav class="z-depth-0 bg-none">
            <div class="nav-wrapper">
                <div class="container">
                    <router-link to="/" class="black-text exo-800 fs-1-5">Company</router-link>
                    <ul v-if="!isLogggedIn && !isEmailVerified" class="right">
                        <li><router-link to="/login" class="black-text fw-b">ログイン</router-link></li>
                        <li><router-link to="/register" class="black-text fw-b">新規登録</router-link></li>
                    </ul>
                    <div v-if="isLogggedIn && isEmailVerified" class="right"><router-link to="/menu" class="black-text">
                        <img class="v-align-m" src="../assets/image/menu.svg"/>
                    </router-link></div>
                    <div v-if="isLogggedIn && !isEmailVerified" class="right"><button v-on:click="logout" class="button-naked fw-b">ログアウト</button></div>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'navbar',
    data() {
        return {
            isLogggedIn: false,
            isEmailVerified: false,
            currentUser: false
        };
    },
    created() {
        if(!firebase.auth().currentUser){
            return;
        } else if (!firebase.auth().currentUser.emailVerified) {
            this.isLogggedIn = true;
            this.isEmailVerified = false;
            this.currentUser = firebase.auth().currentUser.email;
        } else {
            this.isLogggedIn = true;
            this.isEmailVerified = true;
            this.currentUser = firebase.auth().currentUser.email;
        }
    },
    methods: {
        logout: function() {
            firebase.auth().signOut().then(() => {
                this.$router.go({path: this.$router.path});
            });
        }
    }
}
</script>

<style scoped>
@import "../assets/common.css";
</style>
