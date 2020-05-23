<template>
    <div id="reset-password">
        <div class="container">
            <div class="row">
                <div class="col s12 m8 offset-m2">
                    <div v-if="!haveSuccessed" class="center">
                        <div class="fs-1-5 fw-b m-y-2 font-bold">パスワードをリセットする</div>
                        <div v-if="haveError" class="m-y-1 p-1 red lighten-5 fw-b red-text border m-b-2">
                            ご登録されているメールアドレスではないようです。メールアドレスのご確認をお願い致します。
                        </div>
                        <form>
                            <input type="text" class="grey lighten-3 border-0 rounded-10" id="email"
                            placeholder="メールアドレス" v-model="email">
                            <button v-on:click="resetPassword" class="btn waves-effect waves-light
                            rounded-10 w-100 bg-theme z-depth-0 m-y-1 h-3">リセット用メールを送信</button>
                        </form>
                    </div>
                    <div v-else class="center m-t-5">
                        <i class="far fa-check-circle fs-3 green-text text-lighten-1 m-b-2"></i>
                        <div class="fw-b p-1 fs-1-5">パスワードリセット用の<br>メールが送信されました。</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'reset-password',
    data: function() {
        return {
            email: '',
            haveError: false,
            haveSuccessed: false,
        };
    },
    methods: {
        resetPassword () {
            firebase.auth().sendPasswordResetEmail(this.email).then(
                () => {
                    this.haveSuccessed = true;
                },
                (err) => {
                    this.haveError = true;
                    console.log(err)
                }
            )
        }
    },
};
</script>

<style scoped>
    @import "../assets/common.css";
</style>
