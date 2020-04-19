<template>
<div id="view-thread" class="container-100">

    <!-------- Title -------->

    <div class="fs-1-3 fw-b p-y-3 grey lighten-4"><div class="center"><span class="blue-text"># </span>{{ title }}</div></div>

    <!-------- Old Comments -------->

    <ul v-if="checked_at !== 0" class="collection border-0 b-color-theme m-y-0">
        <li class="collection-item bg-none b-color-theme p-x-0" v-for="(comment, index) in oldComments">
            <div class="container-sub m-t-1">
                <table class="t-fixed">
                    <tr class="border-0">
                        <td class="p-0 w-2-5 center v-align-t p-r-1">
                            <div v-bind:id="index+1" class="">
                                <i class="fas fa-user-circle fs-1-7 blue-grey-text text-lighten-4"
                                ></i>
                            </div>
                        </td>
                        <td class="p-0 v-align-t">
                            <div class="fs-0-8 m-b-1 grey-text text-lighten-2">
                                <span class="m-r-0-5">匿名</span>
                                <span class="m-r-0-5">通報</span>
                                <span class="m-r-1" v-if="comment.now_added">now</span>
                                <span class="m-r-1" v-if="!comment.now_added">{{ comment.posted_at.toDate().toDateString() }}</span>
                                <span class="" v-if="!likes.includes(index)"
                                @click="updateLike(index)"><i class="far fa-heart"></i></span>
                                <span class="" v-else><i class="far fa-heart red-text"></i></span>
                            </div>
                            <div v-html="autoLink(comment.comment)" class="fs-1-1 m-b-2 ws-pw"></div>
                        </td>
                    </tr>
                </table>
            </div>
        </li>
    </ul>

    <!-------- Already read until here -------->

    <div  id="checked_at" v-if="checked_at !== 0 && checked_at !== comments.length" class="center grey lighten-4 p-y-3">
        <div class="center b-color-theme">
            <i class="far fa-check-circle fs-3 blue-text m-r-1 v-middle"></i>
            <span class="fs-1 fw-b v-middle">ここから未読</span>
        </div>
    </div>
    
    <!-------- New Comments -------->
    
    <ul class="collection border-x-0 b-color-theme m-y-0">
        <li class="collection-item bg-none b-color-theme p-x-0" v-for="(comment, index) in newComments">
            <div class="container-sub m-t-1">
                <table class="t-fixed">
                    <tr class="border-0">
                        <td class="p-0 w-2-5 center v-align-t p-r-1">
                            <div v-bind:id="index+checked_at+1" class="">
                                <i class="fas fa-user-circle fs-1-7 blue-grey-text text-lighten-4"></i>
                            </div>
                        </td>
                        <td class="p-0 v-align-t">
                            <div class="fs-0-8 m-b-1 grey-text text-lighten-2">
                                <span class="m-r-0-5">{{ index+checked_at+1 }}. 名無しさん</span>
                                <span class="m-r-0-5">通報</span>
                                <span class="m-r-1" v-if="comment.now_added">now</span>
                                <span class="m-r-1" v-if="!comment.now_added">{{ comment.posted_at.toDate().toDateString() }}</span>
                                <span class="" v-if="!likes.includes(index)"
                                @click="updateLike(index)"><i class="far fa-heart"></i></span>
                                <span class="" v-else><i class="far fa-heart red-text"></i></span>
                            </div>
                            <div v-html="autoLink(comment.comment)" class="fs-1-1 m-b-2 ws-pw"></div>
                        </td>
                    </tr>
                </table>
            </div>
        </li>
    </ul>

    <!-------- Add-Comment button -------->

    <!-------- PC -------->

    <div class="fixed-action-btn grey lighten-4 rounded-30 p-0-5 hide-on-small-only">
        <a href="#new-comment" class="btn-floating bg-none lighten-5 z-depth-0 modal-trigger m-x-0-5">
            <i class="fas fa-comment text-theme"></i>
        </a>
        <router-link to="/" class="btn-floating bg-none lighten-5 z-depth-0 modal-trigger m-x-0-5">
            <i class="fas fa-home text-theme"></i>
        </router-link>
    </div>

    <!-------- Mobile -------->

    <div class="fixed-action-btn p-0-5 hide-on-med-and-up">
        <a href="#new-comment" class="btn-floating bg-none lighten-5 z-depth-0 modal-trigger">
            <i class="fas fa-comment text-theme"></i>
        </a>
    </div>

    <!-------- Modal input -------->

    <div id="new-comment" class="modal bottom-sheet rounded-10-top">
        <div class="container-100 row modal-content">
            <form @submit.prevent="saveComment" class="col p-1 s12 p-x-0 fs-1-1">
                <textarea class="grey lighten-3 border-0 rounded-10 h-10 p-1"
                placeholder="コメント" v-model="comment" required></textarea>
                <button type="submit" class="btn waves-effect waves-light h-3 rounded-10 w-50 m-y-1
                bg-theme z-depth-0 right">コメントする</button>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase';
import M from 'materialize-css'
import VueScrollTo from 'vue-scrollto'

export default {
    name : 'view-thread',
    data() {
        return {

            /*-------- Thread data --------*/

            doc_id: null,
            thread_id: null,
            title: null,
            comments: [],

            /*-------- User data --------*/

            likes: [],
            checked_at: 0,

            /*-------- Modal input --------*/

            comment: null
        }
    },
    beforeRouteEnter(to, from, next) {
        var domain = firebase.auth().currentUser.email.split('@')[1];
        db.collection('domains').doc(domain).collection('threads')
        .where('thread_id', '==', to.params.thread_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.doc_id = doc.id
                    vm.thread_id = doc.data().thread_id
                    vm.title = doc.data().title
                    vm.comments = doc.data().comments
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
                    const likes = doc.get("likes." + this.doc_id);
                    const checked_at = doc.get("checked_at." + this.doc_id);
                    if(typeof likes !== "undefined") this.likes = likes;
                    if(typeof checked_at !== "undefined") this.checked_at = checked_at;
                }
                else {
                    this.checked_at = this.comments.length;
                    console.log("user doesn't exists.");
                }
                this.updateCheckedAt(this.doc_id, this.comments.length);
            }
        )

        /*-------- Initialize Modal input --------*/

        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});
    },
    updated () {
        this.$nextTick(() => {
            var element = document.querySelector('#checked_at');
            if(element == null) return;
            VueScrollTo.scrollTo(element, 300, {});
        });
    },
    watch: {
        '$route' : 'fetchData'
    },
    methods: {
        fetchData() {
            var domain = firebase.auth().currentUser.email.split('@')[1];
            db.collection('domains').doc(domain).collection('threads')
            .where('thread_id', '==', this.$route.params.thread_id)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.doc_id = doc.id
                    this.thread_id = doc.data().thread_id
                    this.title = doc.data().title
                    this.comments = doc.data().comments
                })
            })
        },
        updateCheckedAt(thread_doc_id, index) {
            db.collection('users').doc(firebase.auth().currentUser.email).update({
                [`checked_at.${thread_doc_id}`]: index
            });
        },
        updateLike(index) {
            const self = this;
            const domain = firebase.auth().currentUser.email.split('@')[1];
            const shard_id = Math.floor(Math.random() * process.env.VUE_APP_NUM_SHARD).toString();

            db.collection('domains').doc(domain).collection('threads')
            .where('thread_id', '==', this.$route.params.thread_id).limit(1)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    db.collection('domains').doc(domain).collection("threads").doc(doc.id)
                    .collection('shards').doc(shard_id).update({
                        likes: firebase.firestore.FieldValue.arrayUnion(index)
                    });
                    self.addLike(doc.id, index);
                    self.likes.push(index);
                })
            })
        },
        addLike(thread_doc_id, index) {
            db.collection('users').doc(firebase.auth().currentUser.email).update({
                [`likes.${thread_doc_id}`]: firebase.firestore.FieldValue.arrayUnion(index)
            });
        },
        saveComment() {
            var domain = firebase.auth().currentUser.email.split('@')[1];
            db.collection('domains').doc(domain).collection('threads')
            .where('thread_id', '==', this.$route.params.thread_id)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    db.collection('domains').doc(domain).collection("threads").doc(doc.id).update({
                        comments: firebase.firestore.FieldValue.arrayUnion({
                            comment: this.comment,
                            posted_at: new Date(),
                            user_id: firebase.auth().currentUser.uid
                        })
                    });
                })
            })
            this.comments.push({
                comment: this.comment,
                user_id: firebase.auth().currentUser.uid,
                now_added: true,
            });
            var elem = document.querySelector('.modal');
            M.Modal.getInstance(elem).close();
        },
        autoLink(str) {
            var regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; // ']))/;
            var regexp_makeLink = function(all, url, h, href) {
                return '<a href="h' + href + '">' + url + '</a>';
            }
            return str.replace(regexp_url, regexp_makeLink);
        }
    },
    computed: {
        oldComments: function() {
            
            return this.comments.slice(0, this.checked_at);
        },
        newComments: function() {
            return this.comments.slice(this.checked_at, this.comments.length);
        },
        // colorObject: function(random_num) {
        //     var color = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan',
        //     'teal', 'green', 'light-green', 'orange', 'deep-orange', 'brown',
        //     'blue-grey'];
        //     // grey, yellow, lime, amber
        //     return function (random_num) {
        //         return color[Math.floor(random_num * color.length)] + '-text';
        //     };
        // }
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>