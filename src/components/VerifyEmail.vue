<template>
    <div class="">
        <div id="verify-email" class="container">
            <div class="fs-1-5 fw-b m-y-1-125">メールを送信しました！</div>
            <div class="m-b-1">Mavorのご利用にはメールアドレスのアクティベートが必要です。メールに記載されたURLをクリックしてアクティベートを行ってください。</div>
            <button v-on:click="reload" class="btn btn-large rounded-5 w-100 blue-grey">画面再読み込み</button>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'verify-email',
    data: function() {
        return {
        };
    },
    created() {
        let user = firebase.auth().currentUser;
        if(!user.emailVerified){
            var returnUrl;
            if(process.env.NODE_ENV == "development") {
                returnUrl = 'https://b09a6b5ec4304472868077c701c72171.vfs.cloud9.ap-northeast-1.amazonaws.com/email-verified'
            }else if(process.env.NODE_ENV == "production") {
                returnUrl = 'https://taka-kawai-git.github.io/index.html#/'
            }
            
            user.sendEmailVerification({
                url: returnUrl,
                handleCodeInApp: false,
            });
        }
    },
    methods: {
        reload: function(e) {
            firebase.auth().currentUser.reload();
        }
    }
};
</script>

<style scoped>
    @import "../assets/common.css";
</style>
