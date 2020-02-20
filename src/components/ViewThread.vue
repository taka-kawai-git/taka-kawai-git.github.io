<template>
<div id="view-thread" class="container">
    <div class="fs-1-5 fw-b m-y-2">{{title}}</div>
    <ul class="collection border-0 m-t-0">
        <li class="collection-item bg-none p-x-0 border-0 m-b-2 p-t-0" v-for="(comment, index) in comments">
            <div v-bind:id="index+1" class="fs-0-8 m-b-1 grey-text text-lighten-1">
                <span class="m-r-1">{{index+1}}. 名無しさん：{{comment.posted_at.toDate().toDateString()}}</span>
                <span class="m-r-1 right">通報</span>
                <span v-if="!likes.includes(index+1)"
                @click="updateLike(index+1)" class=""><i class="far fa-heart"></i></span>
            </div>
            <div class="fs-1-2">{{comment.comment}}</div>
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
            doc_id: null,
            thread_id: null,
            title: null,
            comments: null,
            likes: []
        }
    },
    beforeRouteEnter(to, from, next) {
        var domain = firebase.auth().currentUser.email.split('@')[1];
        db.collection('domains').doc(domain).collection('threads')
        .where('thread_id', '==', to.params.thread_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.doc_id = doc.id
                    vm.thread_id = doc.data().thread_id
                    vm.title = doc.data().title
                    vm.comments = doc.data().comments
                })
            })
        })
    },
    mounted() {
        const self = this;
        db.collection('users').doc(firebase.auth().currentUser.email)
        .get().then(
            doc => {
                if(doc.exists) {
                    const likes = doc.get("likes." + self.doc_id);
                    if(typeof likes !== "undefined") self.likes = likes;
                }
                else console.log("user doesn't exists.");
            }
        )
    },
    watch: {
        '$route' : 'fetchData'
    },
    methods: {
        fetchData() {
            var domain = firebase.auth().currentUser.email.split('@')[1];
            db.collection('domains').doc(domain).collection('threads')
            .where('thread_id', '==', this.$route.params.thread_id)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.doc_id = doc.id
                    this.thread_id = doc.data().thread_id
                    this.title = doc.data().title
                    this.comments = doc.data().comments
                })
            })
        },
        updateLike(index) {
            const self = this;
            const domain = firebase.auth().currentUser.email.split('@')[1];
            const shard_id = Math.floor(Math.random() * 1).toString();

            db.collection('domains').doc(domain).collection('threads')
            .where('thread_id', '==', this.$route.params.thread_id).limit(1)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    db.collection('domains').doc(domain).collection("threads").doc(doc.id)
                    .collection('shards').doc(shard_id).update({
                        likes: firebase.firestore.FieldValue.arrayUnion(index)
                    });
                    self.addLike(doc.id, index);
                    self.likes.push(index);
                })
            })
        },
        addLike(thread_doc_id, index) {
            db.collection('users').doc(firebase.auth().currentUser.email).update({
                [`likes.${thread_doc_id}`]: firebase.firestore.FieldValue.arrayUnion(index)
            });
        }
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>