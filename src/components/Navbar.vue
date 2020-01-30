<template>
    <div id="navbar">
        <nav class="z-depth-0">
            <div class="nav-wrapper bg-theme border-b-grey-l3">
                <div class="container">
                    <router-link to="/" class="black-text exo-800 fs-1-5">Mavor</router-link>
                    <ul class="right">
                        <li v-if="!isLogggedIn && !isEmailVerified"><router-link to="/login" class="black-text">Login</router-link></li>
                        <li v-if="!isLogggedIn && !isEmailVerified"><router-link to="/register" class="black-text">Register</router-link></li>
                        <li v-if="isLogggedIn"><button v-on:click="logout" class="btn black">Logout</button></li>
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
