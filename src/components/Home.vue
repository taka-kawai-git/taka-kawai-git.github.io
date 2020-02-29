<template>
<div id="home" class="container-100">

    <!-------- Tabs -------->

    <ul id="tabs-swipe-ul" class="tabs bg-none">
        <li class="tab col s3"><a class="active" href="#tab-swipe-1">最新</a></li>
        <li class="tab col s3"><a href="#tab-swipe-2">話題</a></li>
        <li class="tab col s3"><a href="#tab-swipe-3">投票</a></li>
    </ul>

    <!-------- Latest -------->

    <div id="tab-swipe-1" class="col s12">
        <ul class="collection border-0 b-color-theme fs-1-1 m-y-0">
            <li v-for="thread in threads_latest" v-bind:key="thread.id"
            class="collection-item p-x-0 bg-none b-color-theme l-h-2-5">
                <router-link class="black-text"
                v-bind:to="{ name:'view-thread', params: { thread_id: thread.thread_id } }">
                <div class="container-sub">{{ thread.title }}</div>
                </router-link>
            </li>
        </ul>
    </div>

    <!-------- Popular -------->

    <div id="tab-swipe-2" class="col s12">
        <ul class="collection border-0 b-color-theme fs-1-1 m-y-0">
            <li v-for="thread in threads_popular" v-bind:key="thread.id"
            class="collection-item p-x-0 bg-none b-color-theme l-h-2-5">
                <router-link class="black-text"
                v-bind:to="{ name:'view-thread', params: { thread_id: thread.thread_id } }">
                <div class="container-sub">{{ thread.title }}</div>
                </router-link>
            </li>
        </ul>
    </div>

    <!-------- Popular -------->

    <div id="tab-swipe-3" class="col s12">
    </div>

    <!-------- Add-Comment button -------->

    <div class="fixed-action-btn">
        <router-link to="/new" class="btn-floating btn-large bg-theme z-depth-0">
            <i class="fa fa-plus"></i>
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
            threads_popular: []
        }
    },
    mounted() {
        var el = document.querySelector('.tabs');
        var instance = M.Tabs.init(el, {
            swipeable: true,
        });
    },
    created() {
        var domain = firebase.auth().currentUser.email.split('@')[1];
        db.collection('domains').doc(domain).collection('threads')
        .orderBy('created_at').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                    'id' : doc.id,
                    'title' : doc.data().title,
                    'thread_id' : doc.data().thread_id,
                    'num_comments': doc.data().comments.length
                }
                this.threads_latest.push(data);
                this.threads_popular.push(data);
                this.threads_popular.sort(
                    (a, b) => b.num_comments - a.num_comments);
            })
        })
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>