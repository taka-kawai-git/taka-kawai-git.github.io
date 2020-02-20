<template>
<div id="new-thread" class="container m-t-1">
    <div class="row">
        <form @submit.prevent="saveThread" class="col s12 p-x-0">
            <input type="text" class="grey lighten-3 border-0 rounded-10"
            placeholder="スレッドタイトル" v-model="title" required>
            <input type="text" class="grey lighten-3 border-0 rounded-10 h-10"
            placeholder="最初のコメント" v-model="comment" required>
            <button type="submit" class="btn h-3 rounded-10 w-50 m-y-1 bg-theme-grad right">作成する</button>
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
            db.collection('domains').doc(domain).collection('threads').add({
                thread_id: this.thread_id,
                title: this.title,
                num_shards: process.env.VUE_APP_NUM_SHARD,
                comments:
                    [{
                        comment: this.comment,
                        like: 0,
                        posted_at: date
                    }],
                created_at: date
                
            })
            .then(docRef => {
                for (let i = 0; i < process.env.VUE_APP_NUM_SHARD; i++) {
                    docRef.collection('shards').doc(i.toString()).set({likes: []})
                }
                this.$router.push({ name: 'view-thread', params: { thread_id: this.thread_id } })
            })
            .catch(error => console.log(err))
        }
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>