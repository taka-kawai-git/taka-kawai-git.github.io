<template>
<div id="view-vote" class="container-100">

    <!-------- Title -------->

    <div class="fs-1-3 fw-b p-y-4 border-theme border-b"><div class="center">
    <hash-icon size="1.1x" class="text-theme v-align-m"></hash-icon>
    <span class="v-align-m"> {{ thread_data.title }}</span>
    </div></div>

    <!-------- Votes -------->

    <div class="p-1 shadow rounded-10 container-sub m-y-2">
        <ul class="collection border-0 m-0">

            <!-------- Not voted yet, show vote -------->

            <div v-if="isUserDataFetched && !isVoted" class="">
            <li class="collection-item bg-none border-0 p-x-0 p-b-0" v-for="(candidate, index) in candidates">
                <div v-bind:id="index+1" class="fs-1-1">
                    <!--<span class="m-r-0-5 fw-b blue-text align-middle">{{ index+1 }}</span>-->
                    <!--<span class="m-b-2">{{ candidate }}</span>-->
                    <button class="btn rounded-30 bg-theme-grad z-depth-0 w-100" @click="updateVote(index)">{{ candidate }}</button>
                </div>
            </li>
            <div class="p-t-10p"></div>
            </div>

            <!-------- Already voted, show the result -------->

            <div v-if="isUserDataFetched && isVoted" class="">
            <li class="collection-item bg-none border-0 p-x-0 p-b-0" v-for="(ratio, index) in ratios">
                <div class="p-absolute fw-b fs-1 h-2-5 valign-wrapper">
                    <span class="m-l-1 m-r-0-5">{{ ratio }}% </span><span class="">{{ candidates[index] }}</span>
                </div>
                <div v-bind:id="index+1" class="bg-theme-grad h-2-5 rounded-10 border-0" v-bind:style="{width: ratio + '%'}">
                </div>
            </li>
            <div class="p-t-10p"></div>
            <div class="p-y-10p border-t">
                <span class="">投票数 </span><span class="blue-text">{{ deno }}</span>
            </div>
            </div>

        </ul>
    </div>

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
import { HashIcon } from 'vue-feather-icons';

export default {
    name : 'view-vote',
    mixins: [getThreadinfoMixin],
    components: {
        Thread,
        HashIcon
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