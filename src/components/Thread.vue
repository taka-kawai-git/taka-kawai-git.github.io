<template>
<div id="thread" class="">

    <!-------- Old Comments -------->

    <ul v-if="checkedAt !== 0" class="collection border-x-0 border-b-0 border-0 m-y-0">
        <li v-bind:id="'comment_' + index" class="collection-item bg-none border-0 p-x-0"
        v-for="(comment, index) in oldComments">
            <div class="container-sub m-t-1 m-b-2">
                <table class="t-fixed">
                    <tr class="border-0">
                        <td class="p-0 w-3-5 v-align-t p-r-1 center">
                            <div class="">
                                <a href="#new-comment" v-on:click="addReferenceToTextarea(index)" class="modal-trigger">
                                    <div class="fs-1 t-cell v-middle fw-b white rounded-30">
                                        <user-icon size="1.5x" class="black-text"></user-icon>
                                    </div>
                                </a>
                            </div>
                        </td>
                        <td class="p-0 v-align-t">
                            <div class="fs-0-8 m-b-0-5 grey-text text-lighten-1">
                                <span class="m-r-0-5 black-text fw-b"> {{ comment.user_id.slice(0, 4).toLowerCase() }}</span>
                                <span class="m-r-0-5">通報</span>
                                <span class="m-r-1" v-if="comment.now_added">now</span>
                                <span class="m-r-1" v-if="!comment.now_added">{{ comment.posted_at.toDate().toDateString() }}</span>
                                <span class="" v-if="!likes.includes(index)"
                                @click="updateLike(index)"><heart-icon size="1x"></heart-icon></span>
                                <span class="" v-else><heart-icon size="1x" class="red-text"></heart-icon></span>
                            </div>
                            <div v-html="getCommentWithoutReference(comment.comment)" class="fs-1 ws-pw black-text"></div>
                            <div v-html="getReferencePreview(comment.comment)" v-if="haveReference(comment.comment)"
                                class='comment-ref' @click="moveToComment('#comment_' + getReferenceIndex(comment.comment))">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </li>
    </ul>

    <!-------- Already read until here -------->

    <div  id="checked_at" v-if="checkedAt !== 0 && checkedAt !== comments.length" class="center grey lighten-4 p-y-4">
        <div class="center border-0">
            <i class="far fa-check-circle fs-3 text-theme m-r-1 v-middle"></i>
            <span class="fs-1 fw-b v-middle">ここから未読</span>
        </div>
    </div>
    
    <!-------- New Comments -------->
    
    <ul class="collection border-x-0 border-b-0 border-0 m-y-0">
        <li v-bind:id="'comment' + (index + checkedAt)" class="collection-item bg-none border-0 p-x-0"
        v-for="(comment, index) in newComments">
            <div class="container-sub m-t-1 m-b-2">
                <table class="t-fixed">
                    <tr class="border-0">
                        <td class="p-0 w-3-5 center v-align-t p-r-1">
                            <div class="">
                                <a href="#new-comment" v-on:click="addReferenceToTextarea(index + checkedAt)" class="modal-trigger">
                                    <div class="fs-1 t-cell v-middle fw-b white rounded-30">
                                        <user-icon size="1.5x" class="black-text"></user-icon>
                                    </div>
                                </a>
                            </div>
                        </td>
                        <td class="p-0 v-align-t">
                            <div class="fs-0-8 m-b-0-5 grey-text text-lighten-1">
                                <span class="m-r-0-5 black-text fw-b"> {{ comment.user_id.slice(0, 4).toLowerCase() }}</span>
                                <span class="m-r-0-5">通報</span>
                                <span class="m-r-1" v-if="comment.now_added">now</span>
                                <span class="m-r-1" v-if="!comment.now_added">{{ comment.posted_at.toDate().toDateString() }}</span>
                                <span class="" v-if="!likes.includes(index + checkedAt)"
                                @click="updateLike(index)"><heart-icon size="1x"></heart-icon></span>
                                <span class="" v-else><heart-icon size="1x" class="red-text"></heart-icon></span>
                            </div>
                            <div v-html="getCommentWithoutReference(comment.comment)" class="fs-1 ws-pw black-text"></div>
                            <div v-html="getReferencePreview(comment.comment)" v-if="haveReference(comment.comment)"
                                class='comment-ref' @click="moveToComment('#comment_' + getReferenceIndex(comment.comment))">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </li>
    </ul>

    <!-------- Add-Comment button -------->

    <!-------- PC -------->

    <div class="fixed-action-btn p-0-5 hide-on-small-only shadow rounded-30 white">
        <div class="button-floating">
        <a href="#new-comment" class="bg-none lighten-5 z-depth-0 modal-trigger m-x-0-5">
            <message-circle-icon size="2x" class="text-theme v-middle"></message-circle-icon>
        </a>
        <router-link to="/" class="bg-none lighten-5 z-depth-0 modal-trigger m-x-0-5">
            <home-icon size="2x" class="text-theme v-middle"></home-icon>
        </router-link>
        </div>
    </div>

    <!-------- Mobile -------->

    <div class="fixed-action-btn p-0-5 hide-on-med-and-up shadow rounded-30 white center">
        <a href="#new-comment" class="btn-floating bg-none lighten-5 z-depth-0 modal-trigger">
            <message-circle-icon class="text-theme v-middle"></message-circle-icon>
        </a>
    </div>

    <!-------- Modal input -------->

    <div id="new-comment" class="modal bottom-sheet rounded-10-top">
        <div class="container-100 row modal-content">
            <form @submit.prevent="saveComment" class="col p-1 s12 p-x-0 fs-1-1">
                <textarea id="modalInput" class="border-0 rounded-5 h-10 p-1"
                placeholder="コメント" v-model="comment" required></textarea>
                <button type="submit" class="btn waves-effect waves-light rounded-5 w-50 m-y-1
                bg-theme z-depth-0 right">コメントする</button>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import { getHashedColor } from '../mixins/getHashedColor'
import db from '../components/firebaseInit'
import firebase from 'firebase';
import M from 'materialize-css'
import VueScrollTo from 'vue-scrollto'
import { MessageCircleIcon, UserIcon, HomeIcon, HeartIcon } from 'vue-feather-icons';

export default {
    name : 'thread',
    mixins: [getHashedColor],
    props: {
        threadData : {
            type: Object,
            default: {comments:[]},
            required: true
        },
        userData: {
            type: Object,
            default: {},
            required: true
        }
    },
    components: {
        MessageCircleIcon,
        UserIcon,
        HomeIcon,
        HeartIcon
    },
    watch: {
        threadData: function(newData, oldData) {
            this.docId = newData.docId;
            this.comments = newData.comments;
        },
        userData: function(newData, oldData) {
            if(typeof newData.likes[this.docId] !== "undefined") {
                this.likes = newData.likes[this.docId];
            }
            if(typeof newData.checked_at[this.docId] !== "undefined") {
                this.checkedAt = newData.checked_at[this.docId];
            }
        }
    },
    data() {
        return {
            
            /*-------- Thread data pointer --------*/
            
            docId: null,
            comments: [],

            /*-------- User data pointer --------*/

            likes: [],
            checkedAt: 0,

            /*-------- Modal input --------*/

            comment: null
        }
    },
    mounted() {

        /*-------- Initialize Modal input --------*/

        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});
    },
    updated () {
        
        /* [TODO] Move Next to updated */
        
        this.moveToComment('#checked_at');
    },
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
    methods: {
        updateLike(index) {
            const self = this;
            const domain = firebase.auth().currentUser.email.split('@')[1];
            const shard_id = Math.floor(Math.random() * process.env.VUE_APP_NUM_SHARD).toString();

            /*[TODO] Can use doc_id. */

            db.collection('domains').doc(domain).collection('threads')
            .where('thread_id', '==', this.$route.params.thread_id).limit(1)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    db.collection('domains').doc(domain).collection("threads").doc(doc.id)
                    .collection('likes_shards').doc(shard_id).update({
                        likes: firebase.firestore.FieldValue.arrayUnion(index)
                    });
                    self.addLikeToUser(doc.id, index);
                    self.likes.push(index);
                })
            })
        },
        
        /*[TODO] Can use doc_id. */
        
        addLikeToUser(thread_doc_id, index) {
            db.collection('users').doc(firebase.auth().currentUser.email).update({
                [`likes.${thread_doc_id}`]: firebase.firestore.FieldValue.arrayUnion(index)
            });
        },
        saveComment() {
            var domain = firebase.auth().currentUser.email.split('@')[1];
            
            /*[TODO] Can use doc_id. */
            
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
            
            /*[TODO] Do not change property in Child. */
            
            this.comments.push({
                comment: this.comment,
                user_id: firebase.auth().currentUser.uid,
                now_added: true,
            });

            var elem = document.querySelector('.modal');
            M.Modal.getInstance(elem).close();

            /*[TODO] Remove textarea contents here. */

        },
        moveToComment(selecter) {
            this.$nextTick(() => {
                var element = document.querySelector(selecter);
                if(element == null) return;
                VueScrollTo.scrollTo(element, 300, {});
            });
        },
        autoLink(str) {
            var regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; // ']))/;
            var regexp_makeLink = function(all, url, h, href) {
                return '<a href="h' + href + '">' + url + '</a>';
            }
            return str.replace(regexp_url, regexp_makeLink);
        },
        getCommentWithoutReference(str) {
            return this.autoLink(str.replace(/>>([1-9][0-9]*|0)/, '').trim());
        },
        getReferencePreview(str) {
            if(!str.match(/>>([1-9][0-9]*|0)/)) {
                return '';
            }
            var index = this.getReferenceIndex(str);
            return this.autoLink(this.comments[index].comment.replace(/>>([1-9][0-9]*|0)/, '').trim());
        },
        haveReference(str) {
            if(str.match(/>>([1-9][0-9]*|0)/g) == null) {
                return false;
            } else {
                return true;
            }
        },
        getReferenceIndex(str) {
            var ref = str.match(/>>([1-9][0-9]*|0)/g);
            if(ref != null) {
                return parseInt(ref[0].replace(/[^0-9]/g, ''), 10);
            }
            return null;
        },
        addReferenceToTextarea(index) {
            var modalInput = document.getElementById("modalInput");
            modalInput.value = ">>" + index;
            return true;
        }
    },
    computed: {
        oldComments: function() {
            return this.comments.slice(0, this.checkedAt);
        },
        newComments: function() {
            return this.comments.slice(this.checkedAt, this.comments.length);
        },
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>