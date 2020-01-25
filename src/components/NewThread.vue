<template>
<div id="new-thread" class="container">
    <div class="fs-1-5 m-y-1">新しいスレッドの作成</div>
    <div class="row">
        <form @submit.prevent="saveThread" class="col s12">
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="thread_id" required>
                    <label>Thread #ID</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="title" required>
                    <label>タイトル</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="comment" required>
                    <label>コメント</label>
                </div>
            </div>
            <button type="submit" class="btn">Submit</button>
            <router-link to="/" class="btn grey">Cancel</router-link>

        </form>
    </div>
</div>
</template>

<script>
import db from './firebaseInit'
import {uuid} from 'vue-uuid'

export default {
    name : 'new-thread',
    data() {
        return {
            thread_id : null,
            title: null,
            comment: null
        }
    },
    created() {
        this.thread_id = this.$uuid.v1();
    },
    methods: {
        saveThread() {
            db.collection('threads').add({
                thread_id: this.thread_id,
                title: this.title,
                comment: this.comment
            })
            .then(docRef => this.$router.push('/'))
            .catch(error => console.log(err))
        }
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>