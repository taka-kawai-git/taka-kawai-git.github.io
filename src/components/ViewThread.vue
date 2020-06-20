<template>
<div id="view-thread" class="container-100">

    <!-------- Title -------->

    <div class="fs-1-3 fw-b p-y-4 border-theme border-b"><div class="center">
    <hash-icon size="1.1x" class="text-theme v-align-m"></hash-icon>
    <span class="v-align-m"> {{ thread_data.title }}</span></div></div>

    <!-------- Thread -------->

    <Thread v-bind:thread-data="thread_data"
            v-bind:user-data="user_data">
    </Thread>
</div>
</template>

<script>
import { getThreadinfoMixin } from '../mixins/getThreadinfoMixin'
import Thread from './Thread'
import { HashIcon } from 'vue-feather-icons';

export default {
    name : 'view-thread',
    mixins: [getThreadinfoMixin],
    components: {
        Thread,
        HashIcon
    }
}
</script>

<style scoped>
    @import "../assets/common.css";
</style>