<template>
<div id="view-thread">
    <ul class="collection with-header">
        <li class="collection-header"><h4>{{title}}</h4></li>
        <li class="collection-item" v-for="(comment, index) in comments">
            {{index+1}}. 名無しさん：{{comment.posted_at}}
            {{comment.comment}}
        </li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
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
