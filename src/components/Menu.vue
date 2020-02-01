<template>
<div id="menu" class="container">
    <ul class="collection border-0">
        <li class="collection-item p-x-0 bg-theme"><button v-on:click="logout" class="btn black rounded-5">Logout</button></li>
    </ul>
</div>
</template>

<script>
import firebase from 'firebase';
export default {
    name : 'menu',
    data() {
        return {
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