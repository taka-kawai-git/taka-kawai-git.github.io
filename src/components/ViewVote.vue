<template>
<div id="view-vote" class="container-100">

    <!-------- Title -------->

    <div class="fs-1-3 fw-b container-sub"><div class="m-y-3 blue-text center">{{ title }}</div></div>

    <!-------- Votes -------->

    <ul class="collection border-x-0 b-color-theme m-t-0">

        <!-------- Not voted yet, show vote -------->

        <div v-if="!voted">
        <li class="collection-item bg-none b-color-theme p-x-0" v-for="(candidate, index) in candidates">
            <div class="container-sub">
                <div v-bind:id="index+1" class="fs-1-1 m-b-1">
                    <span class="m-r-0-5 fw-b blue-text align-middle">{{ index+1 }}.</span>
                    <span class="m-b-2">{{ candidate }}</span>
                    <button class="btn rounded-30 blue right" @click="updateVote(index)">投票</button>
                </div>
            </div>
        </li>
        </div>
        
        <!-------- Already voted, show the result -------->
        
        
    </ul>
</div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase';

export default {
    name : 'view-vote',
    data() {
        return {
            doc_id: null,
            vote_id: null,
            title: null,
            desc: null,
            candidates: [],
            voted: false
        }
    },
    beforeRouteEnter(to, from, next) {
        var domain = firebase.auth().currentUser.email.split('@')[1];
        db.collection('domains').doc(domain).collection('votes')
        .where('vote_id', '==', to.params.vote_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.doc_id = doc.id
                    vm.vote_id = doc.data().vote_id
                    vm.title = doc.data().title
                    vm.desc = doc.data().desc
                    vm.candidates = doc.data().candidates
                })
            })
        })
    },
    created() {
        const self = this;
        db.collection('users').doc(firebase.auth().currentUser.email)
        .get().then(
            doc => {
                if(doc.exists) {
                    const votes = doc.get("votes." + self.doc_id);
                    if(typeof votes !== "undefined") self.voted = true;
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
            db.collection('domains').doc(domain).collection('votes')
            .where('vote_id', '==', this.$route.params.vote_id)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.doc_id = doc.id
                    this.vote_id = doc.data().vote_id
                    this.title = doc.data().title
                    this.desc = doc.data().desc
                    this.candidates = doc.data().candidates
                })
            })
        },
        updateVote(index) {
            const self = this;
            const domain = firebase.auth().currentUser.email.split('@')[1];
            const shard_id = Math.floor(Math.random() * process.env.VUE_APP_NUM_SHARD).toString();

            db.collection('domains').doc(domain).collection('votes')
            .where('vote_id', '==', this.$route.params.vote_id).limit(1)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    db.collection('domains').doc(domain).collection("votes").doc(doc.id)
                    .collection('shards').doc(shard_id).update({
                        votes: firebase.firestore.FieldValue.arrayUnion(index)
                    });
                    self.addVote(doc.id, index);
                    self.voted = true;
                })
            })
        },
        addVote(vote_doc_id, index) {
            db.collection('users').doc(firebase.auth().currentUser.email).update({
                [`votes.${vote_doc_id}`]: index
            });
        }
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>