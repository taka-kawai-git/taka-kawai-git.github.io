<template>
<div id="view-vote" class="container-100">

    <!-------- Title -------->

    <div class="fs-1-3 fw-b p-y-4"><div class="center"><span class="text-theme-grad">
    <i class="fas fa-hashtag"></i></span> {{ title }}</div></div>

    <!-------- Description -------->

    <div class="border-b">
    <div class="fs-1 container-sub m-y-1-125">{{ desc }}</div>
    </div>

    <!-------- Votes nunmber and Time Limit -------->

    <div class="border-b">
    <div class="fs-1-2 fw-b container-sub m-y-1-125 center">
        <span class="m-r-1">投票数</span><span class="blue-text">{{ this.deno }}</span>
    </div>
    </div>

    <!-------- Votes -------->

    <ul class="collection border-0 m-t-0">

        <!-------- Not voted yet, show vote -------->

        <div v-if="isFetched && !isVoted">
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
        
        <div v-if="isFetched && isVoted" class="m-y-1-125">
        <li class="collection-item bg-none border-0 p-x-0 p-b-0" v-for="(ratio, index) in ratios">
            <div class="container-sub">
                <div class="p-absolute fw-b fs-1 h-2-5 valign-wrapper">
                    <span class="m-l-1 m-r-0-5">{{ ratio }}% </span><span class="">{{ candidates[index] }}</span>
                </div>
                <div v-bind:id="index+1" class="bg-theme-grad h-2-5 rounded-10 border-0" v-bind:style="{width: ratio + '%'}">
                </div>
            </div>
        </li>
        </div>
        
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
            votes: [],
            isVoted: false,
            isFetched: false,
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
                    vm.votes = doc.data().votes
                    vm.candidates = doc.data().candidates
                })
            })
        });
    },
    created() {
        const self = this;
        db.collection('users').doc(firebase.auth().currentUser.email)
        .get().then(
            doc => {
                if(doc.exists) {
                    const votes = doc.get("votes." + self.doc_id);
                    if(typeof votes !== "undefined") {
                        self.isVoted = true;
                    }
                }
                else console.log("user doesn't exists.");
                self.isFetched = true;
            }
        )
    },
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
    watch: {
        '$route' : 'fetchData'
    },
    computed: {
        ratios: function() {
            var ratios = [];
            this.votes.forEach(vote => {
                ratios.push(Math.round((vote/this.deno * 100) * 10)/10);
            })
            return ratios;
        },
        deno: function() {
            var deno = 0;
            this.votes.forEach(vote => {
                deno += vote;
            })
            return deno;
        }
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
                    self.isVoted = true;
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