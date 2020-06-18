<template>
<div id="new-thread" class="container">
    <div class="row m-t-1">
        <form @submit.prevent="saveThread(null, null)" class="col s12 p-x-0 fs-1-1">

            <!-------- Type -------->

            <div class="m-b-1">
                <input type="radio" v-model="type" value="Discussion" id="discussion"/>
                <label for="discussion" class="label amber-text border rounded-30 p-0-5 fs-1 m-r-0-5 fw-b"
                    v-bind:class="typeColor('Discussion')">Discussion</label>
                <input type="radio" v-model="type" value="Vote" id="vote"/>
                <label for="vote" class="label purple-text border rounded-30 p-0-5 fs-1 m-r-0-5 fw-b"
                    v-bind:class="typeColor('Vote')">Vote</label>
                <input type="radio" v-model="type" value="Keep" id="keep"/>
                <label for="keep" class="label light-blue-text border rounded-30 p-0-5 fs-1 m-r-0-5 fw-b"
                    v-bind:class="typeColor('Keep')">Keep</label>
                <input type="radio" v-model="type" value="Problem" id="problem"/>
                <label for="problem" class="label pink-text border rounded-30 p-0-5 fs-1 m-r-0-5 fw-b"
                    v-bind:class="typeColor('Problem')">Problem</label>
                <input type="radio" v-model="type" value="Try" id="try"/>
                <label for="try" class="label green-text border rounded-30 p-0-5 fs-1 m-r-0-5 fw-b"
                    v-bind:class="typeColor('Try')">Try</label>
            </div>

            <!-------- Title -------->

            <input type="text" class="grey lighten-4 border-0 rounded-10"
            placeholder="スレッドタイトル" v-model="title" required>

            <!-------- First Comment -------->

            <textarea class="grey lighten-4 border-0 rounded-10 h-10 p-1"
            placeholder="最初のコメント" v-model="comment" required></textarea>

            <!-------- Create button -------->

            <button type="submit" class="btn waves-effect waves-light rounded-5 w-50 m-y-1
            bg-theme z-depth-0 right">作成する</button>
            <router-link to="/" class="m-y-1 left fs-1">キャンセル</router-link>
        </form>
    </div>
</div>
</template>

<script>
import { createThreadMixin } from '../mixins/createThreadMixin'

export default {
    name : 'new-thread',
    mixins: [createThreadMixin],
    created() {
        this.type = 'Discussion';
    },
    methods : {
        typeColor(type) {
            if(type !== this.type) return ""
            else if(type == "Keep") return "light-blue"
            else if(type == "Problem") return "pink"
            else if(type == "Try") return "green"
            else if(type == "Discussion") return "amber"
            else if(type == "Vote") return "purple"
        }
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>