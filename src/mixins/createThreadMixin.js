import db from '../components/firebaseInit';
import firebase from 'firebase';
import { uuid } from 'vue-uuid';

export const createThreadMixin = {
    data() {
        return {
            thread_id : null,
            title: null,
            comment : null,
            type: null,
        }
    },
    created() {
        this.thread_id = this.$uuid.v1();
    },
    methods: {
        saveThread(additionalObj, callback) {
            var domain = firebase.auth().currentUser.email.split('@')[1];
            var date = new Date();

            /* ---- Create thread under domain/{domainId}/threads/ ---- */

            var likes = [];
            for (let i = 0; i < process.env.VUE_APP_MAX_NUM_COMMENTS; i++) {
                likes.push(0);
            }
            
            var fields = {
                thread_id: this.thread_id,
                title: this.title,
                likes: likes,
                num_shards: process.env.VUE_APP_NUM_SHARD,
                type: this.type,
                comments:
                    [{
                        comment: this.comment,
                        posted_at: date,
                        user_id: firebase.auth().currentUser.uid
                    }],
                created_at: date
            }
            
            if(additionalObj !== null) {fields = Object.assign(fields, additionalObj)}

            db.collection('domains').doc(domain).collection('threads').add(fields)
            .then(docRef => {

                /* ---- Create Shards under domain/{domainId}/thread/{threadId}/ ---- */

                for (let i = 0; i < process.env.VUE_APP_NUM_SHARD; i++) {
                    docRef.collection('likes_shards').doc(i.toString()).set({likes: []})
                }
                
                if(callback !== null) callback(docRef);
                
                this.$router.push({ name: 'view-thread', params: { thread_id: this.thread_id } });
            })
            .catch(error => console.log(error))
        }
    }
}