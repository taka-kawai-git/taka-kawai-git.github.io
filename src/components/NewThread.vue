<template>
<div id="new-thread" class="container m-t-1">
    <div class="row">
        <form @submit.prevent="saveThread" class="col s12 p-x-0 fs-1-2">
            <input type="text" class="grey lighten-3 border-0 rounded-10"
            placeholder="スレッドタイトル" v-model="title" required>
            <textarea class="grey lighten-3 border-0 rounded-10 h-10 p-1"
            placeholder="最初のコメント" v-model="comment" required></textarea>
            <button type="submit" class="btn h-3 rounded-10 w-50 m-y-1 bg-theme-grad right fs-1">作成する</button>
            <router-link to="/" class="m-y-1 left">キャンセル</router-link>
        </form>
    </div>
</div>
</template>

<script>
import db from './firebaseInit';
import firebase from 'firebase';
import {uuid} from 'vue-uuid';

export default {
    name : 'new-thread',
    data() {
        return {
            thread_id : null,
            title: null,
            comment : null
        }
    },
    created() {
        this.thread_id = this.$uuid.v1();
    },
    methods: {
        saveThread() {
            var domain = firebase.auth().currentUser.email.split('@')[1];
            var date = new Date();

            /* ---- Create thread under domain/{domainId}/threads/ ---- */

            var likes = [];
            for (let i = 0; i < process.env.VUE_APP_MAX_NUM_COMMENTS; i++) {
                likes.push(0);
            }

            db.collection('domains').doc(domain).collection('threads').add({
                thread_id: this.thread_id,
                title: this.title,
                likes: likes,
                num_shards: process.env.VUE_APP_NUM_SHARD,
                comments:
                    [{
                        comment: this.comment,
                        posted_at: date,
                        user_id: firebase.auth().currentUser.uid
                    }],
                created_at: date
                
            })
            .then(docRef => {

                /* ---- Create Shards under domain/{domainId}/thread/{threadId}/ ---- */

                for (let i = 0; i < process.env.VUE_APP_NUM_SHARD; i++) {
                    docRef.collection('shards').doc(i.toString()).set({likes: []})
                }
                this.$router.push({ name: 'view-thread', params: { thread_id: this.thread_id } })
            })
            .catch(error => console.log(error))
        }
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>