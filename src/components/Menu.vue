<template>
<div id="menu" class="container">
    <ul class="collection border-0 m-y-1-125 fs-1-2">
        <li class="collection-item p-x-0 bg-none w-100 border-theme l-h-2"><div class="black-text">
            <user-icon stroke-width="1" class="v-align-m m-r-1"></user-icon>匿名</div>
        </li>
        <li class="collection-item p-x-0 bg-none w-100 border-theme l-h-2">
            <at-sign-icon stroke-width="1" class="v-align-m m-r-1"></at-sign-icon>{{domain}}
        </li>
        <li class="collection-item p-x-0 bg-none w-100 border-theme l-h-2">
            <router-link to="/" class="black-font"><div class="black-text">
                <home-icon stroke-width="1" class="v-align-m m-r-1"></home-icon>トップ</div>
            </router-link>
        </li>
        <li class="collection-item p-x-0 bg-none w-100 border-theme l-h-2">
            <router-link to="/terms" class="black-font"><div class="black-text">
                <book-icon stroke-width="1" class="v-align-m m-r-1"></book-icon>利用規約</div>
            </router-link>
        </li>
        <li class="collection-item p-x-0 bg-none w-100 border-theme l-h-2">
            <div v-on:click="logout" class="">
                <log-out-icon stroke-width="1" class="v-align-m m-r-1"></log-out-icon>ログアウト
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import firebase from 'firebase';
import { UserIcon, AtSignIcon, HomeIcon, BookIcon, LogOutIcon } from 'vue-feather-icons';

export default {
    name : 'menu',
    data() {
        return {
        }
    },
    components: {
        UserIcon,
        AtSignIcon,
        HomeIcon,
        BookIcon,
        LogOutIcon
    },
    computed: {
        domain: function() {
            return firebase.auth().currentUser.email.split('@')[1];
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