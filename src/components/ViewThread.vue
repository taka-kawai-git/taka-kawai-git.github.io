<template>
<div id="view-thread" class="container">
    <div class="fs-1-5 fw-b m-t-1-125">{{title}}</div>
    <ul class="collection border-0">
        <li class="collection-item bg-theme p-x-0 border-0" v-for="(comment, index) in comments">
            <div v-bind:id="index+1" class="fs-0-8 m-b-1">{{index+1}}. 名無しさん：{{comment.posted_at.toDate().toDateString()}}</div>
            <div class="fs-1-1">{{comment.comment}}</div>
        </li>
    </ul>
    <!-- <button @click="deleteEmployee" class="btn red">Delete</button> -->
    <div class="fixed-action-btn">
        <router-link v-bind:to="{name: 'new-comment', params: {thread_id: thread_id}}"
        class="btn-floating btn-large light-blue z-depth-0">
            <i class="fas fa-comment"></i>
        </router-link>
    </div>
</div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase';

export default {
    name : 'view-thread',
    data() {
        return {
            thread_id : null,
            title : null,
            comments : null,
        }
    },
    beforeRouteEnter(to, from, next) {
        var domain = firebase.auth().currentUser.email.split('@')[1];
        db.collection('domains').doc(domain).collection('threads')
        .where('thread_id', '==', to.params.thread_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.thread_id = doc.data().thread_id
                    vm.title = doc.data().title
                    vm.comments = doc.data().comments
                })
            })
        })
    },
    watch: {
        '$route' : 'fetchData'
    },
    methods: {
        fetchData() {
            db.collection('threads').where('thread_id', '==', this.$route.params.thread_id)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.thread_id = doc.data().thread_id
                    this.title = doc.data().title
                    this.comments = doc.data().comments
                })
            })
        },
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>