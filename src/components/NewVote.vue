<template>
<div id="new-vote" class="container">
    <div class="row m-t-1">
        <form @submit.prevent="saveVote" class="col s12 p-x-0 fs-1-1">

            <!-------- Title -------->

            <input type="text" class="grey lighten-3 border-0 rounded-10"
            placeholder="投票タイトル" v-model="title" required>

            <!-------- First Comment -------->

            <textarea class="grey lighten-3 border-0 rounded-10 h-10 p-1 m-b-1"
            placeholder="最初のコメント" v-model="comment" required></textarea>

            <!-------- Candidates -------->

            <input type="text" class="blue lighten-5 border-0 rounded-10"
            placeholder="候補" v-for="(candidate, index) in candidates"
            v-model="candidate.desc" v-if="candidate.enabled">
            
            <span v-if="!candidates[4].enabled" @click="addCandidate"
            class="blue lighten-5 border-0 rounded-10 h-3 valign-wrapper m-b-1">
                <i class="fa fa-plus text-theme center m-l-1"></i>
            </span>

            <!-------- Create button -------->

            <button type="submit" class="btn waves-effect waves-light h-3 rounded-10 w-50 m-y-1
            bg-theme z-depth-0 right fs-1">作成する</button>
            <router-link to="/" class="m-y-1 left fs-1">キャンセル</router-link>
        </form>
    </div>
</div>
</template>

<script>
import db from './firebaseInit';
import firebase from 'firebase';
import {uuid} from 'vue-uuid';
import { createThreadMixin } from '../mixins/createThreadMixin'

export default {
    name : 'new-vote',
    data() {
        return {
            candidates: [
                {desc: null, enabled: true},
                {desc: null, enabled: true},
                {desc: null, enabled: false},
                {desc: null, enabled: false},
                {desc: null, enabled: false}
            ]
        }
    },
    mixins: [createThreadMixin],
    created() {
        this.type = 'vote';
    },
    methods: {
        saveVote() {

            /* -------- Prepare Candidates -------- */

            var domain = firebase.auth().currentUser.email.split('@')[1];
            var candidates = [];
            var votes = [];
            for(let i = 0; i < 5; i++) {
                if(this.candidates[i].enabled){
                    candidates.push(this.candidates[i].desc);
                    votes.push(0);
                }
            }

            /* -------- Add vote info under domain/{domainId}/threads/ -------- */

            this.saveThread({
                candidates: candidates,
                votes: votes
            }, function(docRef) {
                for (let i = 0; i < process.env.VUE_APP_NUM_SHARD; i++) {
                    docRef.collection('votes_shards').doc(i.toString()).set({votes: []})
                }
            });
        },
        addCandidate() {
            for(let i = 0; i < 5; i++) {
                if(!this.candidates[i].enabled) {
                    this.candidates[i].enabled = true;
                    return;
                }
            }
        },
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>