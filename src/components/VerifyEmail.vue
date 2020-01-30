<template>
    <div class="">
        <div id="verify-email" class="container">
            <div class="fs-1-5 fw-b m-y-1-125">メールを送信しました！</div>
            <div class="m-b-1">Mavorのご利用にはメールアドレスのアクティベートが必要です。メールに記載されたURLをクリックしてアクティベートを行ってください。</div>
            <form>
                <button v-on:click="sendEmail" class="btn btn-large rounded-30 w-100 blue-grey">メールを再送信</button>
            </form>
            <div v-if="emailHaveSent">
                
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
            emailHaveSent: false 
        };
    },
    created() {
        let user = firebase.auth().currentUser;
        if(!user.emailVerified){
            user.sendEmailVerification({
                url: 'https://b09a6b5ec4304472868077c701c72171.vfs.cloud9.ap-northeast-1.amazonaws.com/email-verified',
                handleCodeInApp: false,
            });
        }
    },
    methods: {
        sendEmail: function(e) {
            let user = firebase.auth().currentUser;
            if(!user.emailVerified){
                if(!user.emailVerified){
                    user.sendEmailVerification({
                        url: 'https://b09a6b5ec4304472868077c701c72171.vfs.cloud9.ap-northeast-1.amazonaws.com/email-verified',
                        handleCodeInApp: false,
                    });
                }
            }
            this.emailHaveSent = true;
        }
    }
};
</script>

<style scoped>
    @import "../assets/common.css";
</style>
