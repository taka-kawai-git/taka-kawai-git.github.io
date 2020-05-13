<template>
<div id="view-vote" class="container-100">

    <!-------- Title -------->

    <div class="fs-1-3 fw-b p-y-4 grey lighten-4"><div class="center">
    <i class="fas fa-hashtag text-theme"></i> {{ thread_data.title }}</div></div>


    <!-------- Votes nunmber and Time Limit -------->

    <div class="border-b border-theme">
    <div class="fs-1-2 fw-b container-sub m-y-1-125 center">
        <span class="m-r-1">投票数</span><span class="blue-text">{{ deno }}</span>
    </div>
    </div>

    <!-------- Votes -------->

    <ul class="collection border-0 m-t-0">

        <!-------- Not voted yet, show vote -------->

        <div v-if="isUserDataFetched && !isVoted">
        <li class="collection-item bg-none border-theme p-x-0" v-for="(candidate, index) in candidates">
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
        
        <div v-if="isUserDataFetched && isVoted" class="m-y-1-125">
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

    <!-------- Thread -------->

    <Thread v-bind:thread-data="thread_data"
            v-bind:user-data="user_data">
    </Thread>
</div>
</template>

<script>
import { getThreadinfoMixin } from '../mixins/getThreadinfoMixin'
import Thread from './Thread'
import db from './firebaseInit'
import firebase from 'firebase';

export default {
    name : 'view-vote',
    mixins: [getThreadinfoMixin],
    components: {
        Thread
    },
    data() {
        return {
            votes: [],
            candidates: [],
            isVoted: false,
        }
    },
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
    watch: {
        isThreadDataFetched: function() {
            this.votes = this.thread_data.votes;
            this.candidates = this.thread_data.candidates;
        },
        isUserDataFetched: function() {
            if(typeof this.user_data.votes[this.thread_data.docId] !== "undefined") {
                this.isVoted = true;
            }
        }
    },
    computed: {
        ratios: function() {
            var ratios = [];
            this.votes.forEach(vote => {
                if(this.deno == 0) {
                    ratios.push(0);
                } else {
                    ratios.push(Math.round((vote/this.deno * 100) * 10)/10);
                }
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
        updateVote(index) {
            const self = this;
            const domain = firebase.auth().currentUser.email.split('@')[1];
            const shard_id = Math.floor(Math.random() * process.env.VUE_APP_NUM_SHARD).toString();

            db.collection('domains').doc(domain).collection('threads')
            .where('thread_id', '==', this.$route.params.thread_id).limit(1)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    db.collection('domains').doc(domain).collection("threads").doc(doc.id)
                    .collection('votes_shards').doc(shard_id).update({
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