<template>
<div id="new-vote" class="container">
    <div class="row m-t-1">
        <form @submit.prevent="saveVote" class="col s12 p-x-0 fs-1-1">

            <!-------- Title -------->

            <input type="text" class="grey lighten-3 border-0 rounded-10"
            placeholder="投票タイトル" v-model="title" required>

            <!-------- Description -------->

            <textarea class="grey lighten-3 border-0 rounded-10 h-10 p-1"
            placeholder="説明" v-model="desc" required></textarea>

            <!-------- Candidates -------->

            <input type="text" class="grey lighten-3 border-0 rounded-10"
            placeholder="候補" v-for="(candidate, index) in candidates"
            v-model="candidate.desc" v-if="candidate.enabled">
            
            <div v-if="!candidates[4].enabled" @click="addCandidate">
                <i class="fa fa-plus text-theme"></i>
            </div>
            
            <hr>

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

export default {
    name : 'new-vote',
    data() {
        return {
            vote_id: null,
            title: null,
            desc: null,
            candidates: [
                {desc: null, enabled: true},
                {desc: null, enabled: true},
                {desc: null, enabled: false},
                {desc: null, enabled: false},
                {desc: null, enabled: false}
            ]
        }
    },
    created() {
        this.vote_id = this.$uuid.v1();
    },
    methods: {
        saveVote() {
            var domain = firebase.auth().currentUser.email.split('@')[1];
            var date = new Date();

            var candidates = [];
            var votes = [];
            for(let i = 0; i < 5; i++) {
                if(this.candidates[i].enabled){
                    candidates.push(this.candidates[i].desc);
                    votes.push(0);
                }
            }

            /* -------- Create vote under domain/{domainId}/votes/ -------- */

            db.collection('domains').doc(domain).collection('votes').add({
                vote_id: this.vote_id,
                title: this.title,
                desc: this.desc,
                candidates: candidates,
                votes: votes,
                num_shards: process.env.VUE_APP_NUM_SHARD,
                created_at: date
            })
            .then(docRef => {

                /* -------- Create Shards under domain/{domainId}/vote/{voteId}/ -------- */

                for (let i = 0; i < process.env.VUE_APP_NUM_SHARD; i++) {
                    docRef.collection('shards').doc(i.toString()).set({votes: []})
                }
                // this.$router.push({ name: 'home', params: { view_id: this.view_id } })
                this.$router.push({ name: 'home', params: { view_id: this.view_id } })
            })
            .catch(error => console.log(error))
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