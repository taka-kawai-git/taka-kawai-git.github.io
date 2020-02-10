<template>
<div id="home" class="container">
    <div class="fs-1-5 fw-b m-y-1-125">最新のスレッド</div>
    <ul class="collection border-x-0 b-color-theme fs-1-1">
        <li v-for="thread in threads" v-bind:key="thread.id" class="collection-item p-x-0 bg-none b-color-theme">
            <router-link class="black-text"
            v-bind:to="{ name:'view-thread', params: { thread_id: thread.thread_id } }">
            <div>{{ thread.title }}</div>
            </router-link>
        </li>
    </ul>
    <div class="fixed-action-btn">
        <router-link to="/new" class="btn-floating btn-large light-blue z-depth-0">
            <i class="fa fa-plus"></i>
        </router-link>
    </div>
</div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase';

export default {
    name : 'home',
    data() {
        return {
            threads: []
        }
    },
    created () {
        var domain = firebase.auth().currentUser.email.split('@')[1];
        db.collection('domains').doc(domain).collection('threads')
        .orderBy('created_at').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                    'id' : doc.id,
                    'title' : doc.data().title,
                    'thread_id' : doc.data().thread_id
                }
                this.threads.push(data)
            })
        })
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>