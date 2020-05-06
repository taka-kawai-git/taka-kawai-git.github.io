<template>
<div id="view-thread" class="container-100">

    <!-------- Title -------->

    <div class="fs-1-3 fw-b p-y-4"><div class="center"><span class="text-theme-grad">
    <i class="fas fa-hashtag"></i></span> {{ thread_data.title }}</div></div>

    <!-------- Thread -------->

    <Thread v-bind:thread-data="thread_data"
            v-bind:user-data="user_data">
    </Thread>
</div>
</template>

<script>
import { getThreadinfoMixin } from '../mixins/getThreadinfoMixin'
import Thread from './Thread'

export default {
    name : 'view-thread',
    mixins: [getThreadinfoMixin],
    components: {
        Thread
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>