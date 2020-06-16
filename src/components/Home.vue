<template>
<div id="home" class="container-100 h-100">

    <!-------- Tabs -------->

    <ul id="tabs-swipe-ul" class="tabs white sticky border-b border-theme">
        <li class="tab col s3"><a class="active" href="#tab-swipe-1"><span>KPT</span></a></li>
        <li class="tab col s3"><a href="#tab-swipe-2"><span>議論</span></a></li>
        <li class="tab col s3"><a href="#tab-swipe-3" id="tab-vote"><span>投票</span></a></li>
        <li v-if="isEnvDev()" class="tab col s3"><a href="#tab-swipe-4"><span>機能</span></a></li>
    </ul>

    <!-------- KPT -------->

    <div id="tab-swipe-1" class="col s12">
        <ul id="tab-swipe-1-ul" class="collection border-0 fs-1-1 m-y-0">
            <li v-for="thread in threads_kpt" v-bind:key="thread.id"
            class="collection-item p-x-0 border-0 l-h-2-5 thread-item">
                <router-link class="black-text"
                v-bind:to="{
                    name:'view-thread',
                    params: { thread_id: thread.thread_id },
                    hash: '#checked_at'
                }">
                <div class="container-sub">
                    <span class="m-r-1 p-0-5 rounded-5 float-n white lighten-4 pink-text ff-exo fs-0-9"
                        v-bind:class="typeColor(thread.type)">{{ thread.type }}</span>
                    <span class="">{{ thread.title }}</span>
                    <span v-if="thread.num_unreads != 0" class="new badge blue float-n rounded-30 p-y-0-5-p">
                        {{thread.num_unreads}}</span>
                </div>
                </router-link>
            </li>
        </ul>
    </div>

    <!-------- Discussion -------->

    <div id="tab-swipe-2" class="col s12">
        <ul id="tab-swipe-2-ul" class="collection border-0 fs-1-1 m-y-0">
            <li class="collection-item p-x-0 border-0 l-h-2-5 thread-item">
                <router-link class="black-text"
                v-bind:to="{
                    name:'view-thread',
                    params: { thread_id: 'tweet' }
                }">
                <div class="container-sub">
                    <span class="m-r-1 p-0-5 rounded-5 float-n white lighten-4 orange-text ff-exo fs-0-9">D</span>
                    <span>つぶやき</span><span class="new badge white float-n grey-text border-badge">固定</span></div>
                </router-link>
            </li>
            <li v-for="thread in threads_discussion" v-bind:key="thread.id"
            class="collection-item p-x-0 border-0 l-h-2-5 thread-item">
                <router-link class="black-text"
                v-bind:to="{
                    name:'view-thread',
                    params: { thread_id: thread.thread_id },
                    hash: '#checked_at'
                }">
                <div class="container-sub">
                    <span class="m-r-1 p-0-5 rounded-5 float-n white lighten-4 ff-exo fs-0-9"
                        v-bind:class="typeColor(thread.type)">{{ thread.type }}</span>
                    <span class="">{{ thread.title }}</span>
                    <span v-if="thread.num_unreads != 0" class="new badge blue float-n rounded-30 p-y-0-5-p">
                        {{thread.num_unreads}}</span>
                </div>
                </router-link>
            </li>
        </ul>
    </div>

    <!-------- Popular -------->

    <!--<div id="tab-swipe-2" class="col s12">-->
    <!--    <ul class="collection border-0 fs-1-1 m-y-0">-->
    <!--        <li v-for="(thread, index) in threads_discussion" v-bind:key="thread.id"-->
    <!--        class="collection-item p-x-0 border-0 l-h-2-5 thread-item">-->
    <!--            <router-link class="black-text"-->
    <!--            v-bind:to="{ name:'view-thread', params: { thread_id: thread.thread_id } }">-->
    <!--            <div class="container-sub">-->
    <!--                <table class="t-fixed">-->
    <!--                    <tr class="border-0">-->
    <!--                        <td class="p-0 w-35p center">-->
    <!--                            <span class="m-r-1 text-theme fw-b">{{ index + 1 }}</span>-->
    <!--                        </td>-->
    <!--                        <td class="p-0">{{ thread.title }}</td>-->
    <!--                    </tr>-->
    <!--                </table>-->
    <!--            </div>-->
    <!--            </router-link>-->
    <!--        </li>-->
    <!--    </ul>-->
    <!--</div>-->

    <!-------- Questionnaire -------->

    <div id="tab-swipe-3" class="col s12">
        <ul class="collection border-0 fs-1-1 m-y-0">
            <li v-for="thread in threads_vote" v-bind:key="thread.id"
            class="collection-item p-x-0 border-0 l-h-2-5 thread-item">
                <router-link class="black-text"
                v-bind:to="{ name:'view-vote', params: { thread_id: thread.thread_id } }">
                <div class="container-sub">
                    <span class="m-r-1 p-0-5 rounded-5 float-n white lighten-4 ff-exo fs-0-9"
                        v-bind:class="typeColor(thread.type)">{{ thread.type }}</span>
                    <span class="">{{ thread.title }}</span>
                    <span v-if="thread.num_unreads != 0" class="new badge blue float-n rounded-30 p-y-0-5-p">
                        {{thread.num_unreads}}</span>
                </div>
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

    <div v-if="!isVoteActive" class="fixed-action-btn p-0-5 shadow rounded-30 white">
        <router-link to="/new-thread" class="btn-floating bg-none z-depth-0">
            <i class="fa fa-plus text-theme"></i>
        </router-link>
    </div>
    <div v-if="isVoteActive" class="fixed-action-btn p-0-5 shadow rounded-30 white">
        <router-link to="/new-vote" class="btn-floating bg-none z-depth-0">
            <i class="fas fa-chart-bar text-theme"></i>
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
            threads_kpt: [],
            threads_discussion: [],
            threads_vote: [],
            isVoteActive: false,
            checked_at: {}
        }
    },
    mounted() {

        /* -------- Enable Materialize tab -------- */

        var el = document.querySelector('.tabs');
        var instance = M.Tabs.init(el, {
            swipeable: false,
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
                    'type' : doc.data().type.slice(0, 1),
                    'num_comments': doc.data().comments.length,
                    'num_unreads': 0
                }
                if(doc.data().type == ('Discussion')) {
                    this.threads_discussion.push(data);
                    // this.threads_popular.push(data);
                    // this.threads_popular.sort((a, b) => b.num_comments - a.num_comments);
                } else if(doc.data().type == 'Vote') {
                    this.threads_vote.push(data);
                } else {
                    this.threads_kpt.push(data);
                }
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
    },
    // updated() {
    //     this.$nextTick(() => {
    //         document.querySelector(".tabs-content").setAttribute('style', 'height:'
    //         + document.getElementById("tab-swipe-1-ul").offsetHeight + 'px');
    //     });
    // },
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
            this.threads_kpt.forEach((thread, index, array) => {
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
    },
    computed: {
        typeColor: function(type) {
            return function (type) {
                if(type == "D") return "orange-text"
                else if(type == "K") return "blue-text"
                else if(type == "P") return "pink-text"
                else if(type == "T") return "green-text"
                else if(type == "V") return "purple-text"
            };
        }
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>