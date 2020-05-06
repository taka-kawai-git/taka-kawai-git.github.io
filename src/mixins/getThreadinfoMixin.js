import db from '../components/firebaseInit'
import firebase from 'firebase'

export const getThreadinfoMixin = {
    data() {
        return {

            /*-------- Thread data --------*/

            thread_data: {comments: []},

            /*-------- User data --------*/

            user_data: {likes: [], checked_at: []},

            /*-------- Helper --------*/

            isThreadDataFetched: false,
            isUserDataFetched: false
        }
    },
    beforeRouteEnter(to, from, next) {

        /*-------- Get domain --------*/

        var domain = firebase.auth().currentUser.email.split('@')[1];

        /*-------- Get thread data --------*/

        db.collection('domains').doc(domain).collection('threads')
        .where('thread_id', '==', to.params.thread_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.thread_data = doc.data();
                    vm.thread_data.docId = doc.id;
                    vm.isThreadDataFetched = true;
                })
            })
        })
    },
    mounted() {

        /*-------- Get user data --------*/

        db.collection('users').doc(firebase.auth().currentUser.email)
        .get().then(
            doc => {
                if(doc.exists) {
                    this.user_data = doc.data();
                }
                this.isUserDataFetched = true;

                /* [ToDo] Can be done in Thread.vue at isUserData Fetched timing. */

                this.updateCheckedAt(this.thread_data.docId, this.thread_data.comments.length);
            }
        )
    },
    watch: {
        '$route' : 'fetchData'
    },
    methods: {
        fetchData() {

            /* [TODO] Can use doc_id. */

            var domain = firebase.auth().currentUser.email.split('@')[1];
            db.collection('domains').doc(domain).collection('threads')
            .where('thread_id', '==', this.$route.params.thread_id)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.thread_data = doc.data();
                    this.thread_data.docId = doc.id;
                    this.isThreadDataFetched = true;
                })
            })
        },
        updateCheckedAt(thread_doc_id, index) {
            db.collection('users').doc(firebase.auth().currentUser.email).update({
                [`checked_at.${thread_doc_id}`]: index
            });
        }
    }
}