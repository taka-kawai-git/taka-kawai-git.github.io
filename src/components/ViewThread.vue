<template>
<div id="view-thread" class="container">
    <div class="fs-1-5 fw-b m-y-2">{{title}}</div>
    <ul class="collection border-0 m-t-0">
        <li class="collection-item bg-none p-x-0 border-0 m-b-2 p-t-0" v-for="(comment, index) in comments">
            <div v-bind:id="index+1" class="fs-0-8 m-b-1 grey-text">
                <span class="m-r-1">{{index+1}}. 名無しさん：{{comment.posted_at.toDate().toDateString()}}</span>
                <span class="m-r-1">通報</span>
                <span @click="incrementLike" class=""><i class="far fa-heart"></i></span>
            </div>
            <div class="fs-1-2 fw-b">{{comment.comment}}</div>
        </li>
    </ul>
    <!-- <button @click="deleteEmployee" class="btn red">Delete</button> -->
    <div class="fixed-action-btn">
        <router-link v-bind:to="{name: 'new-comment', params: {thread_id: thread_id}}"
        class="btn-floating btn-large bg-theme-grad z-depth-1">
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
        incrementLike() {
            var domain = firebase.auth().currentUser.email.split('@')[1];
            db.collection('domains').doc(domain).collection('threads')
            .where('thread_id', '==', this.$route.params.thread_id)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    db.collection('domains').doc(domain).collection("threads").doc(doc.id).update({
                        comments: firebase.firestore.FieldValue.arrayUnion({
                            like: firebase.firestore.FieldValue.increment(1)
                        })
                    });
                    // this.$router.push('/')
                })
            })
        }
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>