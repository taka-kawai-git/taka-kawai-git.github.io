<template>
<div id="new-comment" class="container">
    <div class="fs-1-5 m-y-1">新しいコメントを作成</div>
    <div class="row">
        <form @submit.prevent="saveComment" class="col s12">
            <input type="text" class="grey lighten-3 border-0 rounded-5"
            placeholder="コメント" v-model="comment" required>
            <button type="submit" class="btn btn-large rounded-5 w-50 blue-grey m-y-1">コメントする</button>
            <router-link to="/" class="btn btn-large rounded-5 w-50 grey m-y-1">キャンセル</router-link>
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
            comment : null
        }
    },
    methods: {
        saveComment() {
            // var map = new Map();
            // map.set("comment", this.comment);
            // map.set("like", 0);
            // map.set("posted_at", firebase.firestore.FieldValue.serverTimestamp());
            
            // db.collection('threads').where('thread_id', '==', this.$route.params.thread_id)
            // .get().then(querySnapshot => {
            //     querySnapshot.forEach(doc => {
            //         this.title = doc.id
            //     })
            // })
            
            var domain = firebase.auth().currentUser.email.split('@')[1];
            db.collection('domains').doc(domain).collection('threads')
            .where('thread_id', '==', this.$route.params.thread_id)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    db.collection('domains').doc(domain).collection("threads").doc(doc.id).update({
                        comments: firebase.firestore.FieldValue.arrayUnion({
                            comment: this.comment,
                            like: 0,
                            posted_at: new Date()
                        })
                    });
                    this.$router.push('/')
                })
            })
        }
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>