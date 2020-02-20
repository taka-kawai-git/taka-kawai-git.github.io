<template>
<div id="new-comment" class="container m-t-1">
    <div class="row">
        <form @submit.prevent="saveComment" class="col s12 p-x-0">
            <input type="text" class="grey lighten-3 border-0 rounded-10 h-10"
            placeholder="コメント" v-model="comment" required>
            <button type="submit" class="btn h-3 rounded-10 w-50 m-y-1 bg-theme-grad right">コメントする</button>
            <router-link to="/" class="m-y-1 left">キャンセル</router-link>
        </form>
    </div>
</div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase'
export default {
    name : 'new-comment',
    data() {
        return {
            comment: null
        }
    },
    methods: {
        saveComment() {
            var domain = firebase.auth().currentUser.email.split('@')[1];
            db.collection('domains').doc(domain).collection('threads')
            .where('thread_id', '==', this.$route.params.thread_id)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    db.collection('domains').doc(domain).collection("threads").doc(doc.id).update({
                        comments: firebase.firestore.FieldValue.arrayUnion({
                            comment: this.comment,
                            like: 0,
                            posted_at: new Date(),
                            user_id: firebase.auth().currentUser.uid
                        })
                    });
                    this.$router.push({ name: 'view-thread',
                    params: { thread_id: this.$route.params.thread_id } })
                })
            })
        }
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>