<template>
<div id="home" class="container-100 h-100">

    <!-------- Tabs -------->

    <ul id="tabs-swipe-ul" class="tabs white sticky">
        <li class="tab col s3"><a class="active" href="#tab-swipe-1"><span>最新</span></a></li>
        <li class="tab col s3"><a href="#tab-swipe-2"><span>話題</span></a></li>
        <li class="tab col s3"><a href="#tab-swipe-3" id="tab-vote"><span>投票</span></a></li>
        <li v-if="isEnvDev()" class="tab col s3"><a href="#tab-swipe-4"><span>機能</span></a></li>
    </ul>

    <!-------- Latest -------->

    <div id="tab-swipe-1" class="col s12">
        <ul id="tab-swipe-1-ul" class="collection border-x-0 b-color-theme fs-1-1 m-y-0">
            <li class="collection-item p-x-0 bg-none b-color-theme l-h-2-5">
                <router-link class="black-text"
                v-bind:to="{
                    name:'view-thread',
                    params: { thread_id: 'tweet' }
                }">
                <div class="container-sub"><span>つぶやき</span><span class="new badge white float-n grey-text border-badge">固定</span></div>
                </router-link>
            </li>
            <li v-for="thread in threads_latest" v-bind:key="thread.id"
            class="collection-item p-x-0 bg-none b-color-theme l-h-2-5">
                <router-link class="black-text"
                v-bind:to="{
                    name:'view-thread',
                    params: { thread_id: thread.thread_id },
                    hash: '#checked_at'
                }">
                <div class="container-sub">
                <span class="">{{ thread.title }}</span>
                <span v-if="thread.num_unreads != 0" class="new badge blue float-n rounded-30 p-y-0-5-p">
                    {{thread.num_unreads}}</span></div>
                </router-link>
            </li>
        </ul>
    </div>

    <!-------- Popular -------->

    <div id="tab-swipe-2" class="col s12">
        <ul class="collection border-x-0 b-color-theme fs-1-1 m-y-0">
            <li v-for="(thread, index) in threads_popular" v-bind:key="thread.id"
            class="collection-item p-x-0 bg-none b-color-theme l-h-2-5">
                <router-link class="black-text"
                v-bind:to="{ name:'view-thread', params: { thread_id: thread.thread_id } }">
                <div class="container-sub">
                    <table class="t-fixed">
                        <tr class="border-0">
                            <td class="p-0 w-35p center">
                                <span class="m-r-1 text-theme fw-b">{{ index + 1 }}.</span>
                            </td>
                            <td class="p-0">{{ thread.title }}</td>
                        </tr>
                    </table>
                </div>
                </router-link>
            </li>
        </ul>
    </div>

    <!-------- Questionnaire -------->

    <div id="tab-swipe-3" class="col s12">
        <ul class="collection border-x-0 b-color-theme fs-1-1 m-y-0">
            <li v-for="vote in votes" v-bind:key="vote.id"
            class="collection-item p-x-0 bg-none b-color-theme l-h-2-5">
                <router-link class="black-text"
                v-bind:to="{ name:'view-vote', params: { vote_id: vote.vote_id } }">
                <div class="container-sub">{{ vote.title }}</div>
                </router-link>
            </li>
        </ul>
    </div>

    <!-------- Others -------->

    <div v-if="isEnvDev()" id="tab-swipe-4" class="col s12">
        <div class="row">
            <div class="col s4 m3 l2 center p-y-2">
                <router-link to="/score">
                    <i class="fas fa-medal fs-2-3 blue-text m-b-1"></i>
                    <div class="fs-0-8 blue-text text-lighten-2">スコア</div>
                </router-link>
            </div>
            <div class="col s4 m3 l2 center p-y-2">
                <router-link to="/view-score">
                    <i class="fas fa-lightbulb fs-2-3 blue-text m-b-1"></i>
                    <div class="fs-0-8 blue-text text-lighten-2">新規事業</div>
                </router-link>
            </div>
        </div>
    </div>


    <!-------- Add-Thread button -------->

    <div v-if="!isVoteActive" class="fixed-action-btn">
        <router-link to="/new-thread" class="btn-floating btn-large bg-none z-depth-0">
            <i class="fa fa-plus text-theme-grad"></i>
        </router-link>
    </div>
    <div v-if="isVoteActive" class="fixed-action-btn">
        <router-link to="/new-vote" class="btn-floating btn-large bg-none z-depth-0">
            <i class="fas fa-chart-bar text-theme-grad"></i>
        </router-link>
    </div>
</div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase';
import M from 'materialize-css'

export default {
    name : 'home',
    data() {
        return {
            threads_latest: [],
            threads_popular: [],
            votes: [],
            isVoteActive: false,
            checked_at: {}
        }
    },
    mounted() {

        /* -------- Enable Materialize tab -------- */

        var el = document.querySelector('.tabs');
        var instance = M.Tabs.init(el, {
            swipeable: true,
        });

        /* -------- Watch active tab  -------- */

        const target = document.getElementById('tab-vote')
        const observer = new MutationObserver(mutations => {
            mutations.forEach((mutation) => {
                if(mutation.target.className == "active") this.isVoteActive = true;
                else this.isVoteActive = false;
            })
        })

        observer.observe(target, {
            attributes: true,
            attributeFilter: ['class']
        })

        document.querySelector(".tabs-content").setAttribute('style', 'height:100%;');
    },
    created() {

        /* -------- Get user domain -------- */

        var domain = firebase.auth().currentUser.email.split('@')[1];

        /* -------- Get Threads data -------- */

        db.collection('domains').doc(domain).collection('threads')
        .orderBy('created_at', 'desc').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                if(doc.data().thread_id == 'tweet') return true;
                const data = {
                    'id' : doc.id,
                    'title' : doc.data().title,
                    'thread_id' : doc.data().thread_id,
                    'num_comments': doc.data().comments.length,
                    'num_unreads': doc.data().comments.length
                }
                this.threads_latest.push(data);
                this.threads_popular.push(data);
                this.threads_popular.sort(
                    (a, b) => b.num_comments - a.num_comments);
            })
        })

        /*-------- Get user data --------*/

        db.collection('users').doc(firebase.auth().currentUser.email)
        .get().then(
            doc => {
                if(doc.exists) {
                    this.checked_at = doc.data().checked_at;
                    this.updateNumOfUnread();
                }
                else {
                    this.checked_at = null;
                    console.log("user doesn't exists.");
                }
            }
        )

        /* -------- Get Votes data -------- */

        db.collection('domains').doc(domain).collection('votes')
        .orderBy('created_at').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                    'id' : doc.id,
                    'title' : doc.data().title,
                    'vote_id' : doc.data().vote_id,
                }
                this.votes.push(data);;
            })
        })
    },
    updated() {
        this.$nextTick(() => {
            document.querySelector(".tabs-content").setAttribute('style', 'height:'
            + document.getElementById("tab-swipe-1-ul").offsetHeight + 'px');
        });
    },
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    methods: {
        updateNumOfUnread: function() {
            if(this.checked_at === null) {
                return;
            }
            this.threads_latest.forEach((thread, index, array) => {
                if(thread.id in this.checked_at) {
                    array.splice(index, 1, {
                        'id' : thread.id,
                        'title' : thread.title,
                        'thread_id' : thread.thread_id,
                        'num_comments': thread.num_comments,
                        'num_unreads': thread.num_comments - this.checked_at[thread.id]
                    })
                }
            })
        },
        isEnvDev : function() {
            return process.env.NODE_ENV == 'development';
        }
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>