<template>
    <div class="">
        <div id="verify-email" class="container">
            <div class="fs-1-5 fw-b m-y-1-125">メールを送信しました！</div>
            <div class="m-b-1">Companyのご利用にはメールアドレスのアクティベートが必要です。<br>メールに記載されたURLをクリックしてアクティベートを行ってください。</div>
            <button v-on:click="reload" class="btn waves-effect waves-light rounded-10 w-100 bg-theme z-depth-0 m-y-1 h-3">画面再読み込み</button>
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
            var returnUrl = null;
            if(process.env.NODE_ENV == "development") {
                returnUrl = 'https://b09a6b5ec4304472868077c701c72171.vfs.cloud9.ap-northeast-1.amazonaws.com/email-verified'
            } else if(process.env.NODE_ENV == "production") {
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
            this.$router.go({path: this.$router.path});
        }
    }
};
</script>

<style scoped>
    @import "../assets/common.css";
</style>
