<template>
    <div id="register">
        <div class="container">
            <div class="row">
                <div class="col s12 m8 offset-m2">
                    <div v-if="!haveSuccessed" class="center">
                        <div class="fs-1-5 fw-b m-y-2 font-bold">新規登録</div>
                        <form>
                            <input type="text" class="grey lighten-3 border-0 rounded-10" id="email"
                            placeholder="メールアドレス" v-model="email">
                            <input type="password" class="grey lighten-3 border-0 rounded-10" id="password"
                            placeholder="パスワード" v-model="password">
                            <button v-on:click="register" class="btn waves-effect waves-light
                            rounded-10 w-100 bg-theme z-depth-0 m-y-1 h-3">登録</button>
                        </form>
                    </div>
                    <div v-else class="center m-t-5">
                        <i class="far fa-check-circle fs-3 green-text text-lighten-1 m-b-2"></i>
                        <div class="fw-b p-1 fs-1-5">アドレス確認用のメールが<br>送信されました。</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase';

export default {
    name: 'register',
    data: function() {
        return {
            email: '',
            password: '',
            haveError: false,
            haveSuccessed: false,
        };
    },
    methods: {
        register: function(e) {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(
                user => {
                    console.log('Logged in as ' + user.user.email);
                    this.registerUser(user);
                    this.haveSuccessed = true;
                },
                err => {
                    alert(err.message);
                }
            )
            e.preventDefault();
        },
        
        registerUser: function(user) {
            var self = this;
            var domain = user.user.email.split('@')[1];
            db.collection('users').doc(user.user.email).set({
                email: user.user.email,
                domain: domain,
                created_at: new Date(),
                likes: {},
                votes: {}
            })
            .then(function() {
                console.log("user created");
                self.updateOrRegisterDomain(domain);
            })
            .catch(error => console.log(error))
        },
        
        updateOrRegisterDomain: function(domain) {
            var self = this;
            var domainRef = db.collection("domains").doc(domain);
            domainRef.get().then(function(doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    self.updateDomain(domainRef);
                } else {
                    console.log("No such document!");
                    self.registerDomain(domainRef, domain);
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        },
        
        updateDomain: function(domainRef) {
            var self = this;
            domainRef.update({
                participants: firebase.firestore.FieldValue.increment(1)
            })
            .then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                console.error("Error updating document: ", error);
            });
        },
        
        registerDomain: function(domainRef, domain) {
            var self = this;
            var data = {
                create_at: new Date(),
                domain: domain,
                participants: 1
            }
            domainRef.set(data)
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error updating document: ", error);
            });
        }
    }
};
</script>

<style scoped>
    @import "../assets/common.css";
</style>