<template>
<div id="new-comment">
    <h3>New Comment</h3>
    <div class="row">
        <form @submit.prevent="saveComment" class="col s12">
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="comment" required>
                    <label>Comment</label>
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
            var map = new Map();
            map.set("comment", this.comment);
            map.set("like", 0);
            map.set("posted_at", firebase.firestore.FieldValue.serverTimestamp());

            db.collection('threads').where('thread_id', '==', this.$route.params.thread_id).get().update({
                comments: firebase.firestore.FieldValue.arrayUnion(map)
            })
            .then(docRef => this.$router.push('/'))
            .catch(error => console.log(err))
        }
    }
}
</script>
