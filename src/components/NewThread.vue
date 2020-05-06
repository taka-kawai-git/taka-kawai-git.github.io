<template>
<div id="new-thread" class="container">
    <div class="row m-t-1">
        <form @submit.prevent="saveThread(null, null)" class="col s12 p-x-0 fs-1-1">

            <!-------- Title -------->

            <input type="text" class="grey lighten-3 border-0 rounded-10"
            placeholder="スレッドタイトル" v-model="title" required>

            <!-------- First Comment -------->

            <textarea class="grey lighten-3 border-0 rounded-10 h-10 p-1"
            placeholder="最初のコメント" v-model="comment" required></textarea>

            <!-------- Create button -------->

            <button type="submit" class="btn waves-effect waves-light h-3 rounded-10 w-50 m-y-1
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
        this.type = 'normal';
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>