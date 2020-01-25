<template>
<div id="home" class="container">
    <ul>
        <li><h4>Threads</h4></li>
        <li v-for="thread in threads" v-bind:key="thread.id" class="">
            <router-link class=""
            v-bind:to="{ name:'view-thread', params: { thread_id: thread.thread_id } }">
                {{ thread.title }}
            </router-link>
        </li>
    </ul>
    <div class="fixed-action-btn">
        <router-link to="/new" class="btn-floating btn-large light-blue z-depth-0">
            <i class="fa fa-plus"></i>
        </router-link>
    </div>
</div>
</template>

<script>
import db from './firebaseInit'
export default {
    name : 'home',
    data() {
        return {
            threads: []
        }
    },
    created () {
        db.collection('threads').orderBy('time').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                    'id' : doc.id,
                    'title' : doc.data().title,
                    'thread_id' : doc.data().thread_id
                }
                this.threads.push(data)
            })
        })
    }
}
</script>
