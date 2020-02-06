<template>
<div id="menu" class="container">
    <ul class="collection border-0 m-y-1-125 fs-1-2">
        <li class="collection-item p-x-0 bg-theme w-100 b-color-theme">
            <div v-on:click="logout" class="">ログアウト</div>
        </li>
        <li class="collection-item p-x-0 bg-theme w-100 b-color-theme">
            <router-link to="/terms" class="black-font"><div class="black-text">利用規約</div></router-link>
        </li>
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