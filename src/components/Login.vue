<template>
    <div class="">
        <div class="container">
            <div class="row">
                <div class="col s12 m8 offset-m2">
                    <div class="login center">
                        <h4>Login</h4>
                        <form>
                            <div class="input-field">
                                <i class="fas fa-envelope prefix font-size-1-5-r top-1-r"></i>
                                <input type="text" id="email" v-model="email">
                                <label class="" for="email">Email</label>
                            </div>
                            <div class="input-field">
                                <i class="fas fa-lock prefix font-size-1-5-r top-1-r"></i></i>
                                <input type="password" id="password" v-model="password">
                                <label class="" for="password">Password</label>
                            </div>
                            <button v-on:click="login" class="btn btn-large rounded-30 blue-grey">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'login',
    data: function() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login: function(e) {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(
                user => {
                    alert(`You are logged in as ${user.user.email}`);
                    this.$router.go({path: this.$router.path});
                },
                err => {
                    console.log(err);
                    alert(err.message);
                }
            )
            e.preventDefault();
        }
    }
};
</script>

<style scoped>
    @import "../assets/common.css";
</style>
