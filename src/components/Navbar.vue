<template>
    <div id="navbar">
        <nav class="z-depth-0">
            <div class="nav-wrapper grey lighten-5">
                <div class="container">
                    <router-link to ="/" class="text-theme">Pigeon</router-link>
                    <ul class="right">
                        <li v-if="isLogggedIn"><span class="email text-theme">{{ currentUser }}</span></li>
                        <li v-if="isLogggedIn"><router-link to="/" class="text-theme">Dashboard</router-link></li>
                        <li v-if="!isLogggedIn"><router-link to="/login" class="text-theme">Login</router-link></li>
                        <li v-if="!isLogggedIn"><router-link to="/register" class="text-theme">Register</router-link></li>
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
            currentUser: false
        };
    },
    created() {
        if(firebase.auth().currentUser){
            this.isLogggedIn = true;
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
.email {
    padding-right: 10px;
}
</style>
