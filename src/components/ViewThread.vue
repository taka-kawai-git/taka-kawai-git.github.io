<template>
<div id="view-thread">
    <ul class="collection with-header m-t-0 border-0">
        <li class="collection-header"><span class="fs-1-5">{{title}}</span></li>
        <li class="collection-item p-l-20 border-0" v-for="(comment, index) in comments">
            <span class="fs-0-8">{{index+1}}. 名無しさん：{{comment.posted_at.toDate().toDateString()}}</span>
            </br>
            <span class="fs-1-5">{{comment.comment}}</span>
        </li>
    </ul>
    <!-- <button @click="deleteEmployee" class="btn red">Delete</button> -->
    <div class="fixed-action-btn">
        <router-link v-bind:to="{name: 'new-comment', params: {thread_id: thread_id}}"
        class="btn-floating btn-large blue-grey z-depth-0">
            <i class="fas fa-comment"></i>
        </router-link>
    </div>
</div>
</template>

<script>
import db from './firebaseInit'
export default {
    name : 'view-thread',
    data() {
        return {
            thread_id : null,
            title : null,
            comments : null,
        }
    },
    beforeRouteEnter(to, from, next) {
        db.collection('threads').where('thread_id', '==', to.params.thread_id)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.thread_id = doc.data().thread_id
                    vm.title = doc.data().title
                    vm.comments = doc.data().comments
                })
            })
        })
    },
    watch: {
        '$route' : 'fetchData'
    },
    methods: {
        fetchData() {
            db.collection('threads').where('thread_id', '==', this.$route.params.thread_id)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.thread_id = doc.data().thread_id
                    this.title = doc.data().title
                    this.comments = doc.data().comments
                })
            })
        },
        deleteEmployee() {
            if(confirm('Are you sure?')){
                db.collection('threads').where('thread_id', '==', this.$route.params.thread_id)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete()
                        this.$router.push('/')
                    })
                })
            }
        }
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>