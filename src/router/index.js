import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Menu from '@/components/Menu';
import Terms from '@/components/Terms';
import NewThread from '@/components/NewThread';
import ViewThread from '@/components/ViewThread';
import NewComment from '@/components/NewComment';
import NewVote from '@/components/NewVote';
import Login from '@/components/Login';
import EmailVerified from '@/components/EmailVerified';
import VerifyEmail from '@/components/VerifyEmail';
import Register from '@/components/Register';
import firebase from 'firebase';
import UUID from 'vue-uuid';
 
Vue.use(Router);
Vue.use(UUID);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                requiresEmailVerified: true
            }
        },
        {
            path: '/menu',
            name: 'menu',
            component: Menu,
            meta: {
                requiresEmailVerified: true
            }
        },
        {
            path: '/terms',
            name: 'terms',
            component: Terms,
            meta: {
                requiresEmailVerified: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                requiresGuest: true
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                requiresGuest: true
            }
        },
        {
            path: '/email-verified',
            name: 'email-verified',
            component: EmailVerified,
            // meta: {
            //     requiresGuest: true
            // }
        },
        {
            path: '/verify-email',
            name: 'verify-email',
            component: VerifyEmail,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/new-thread',
            name: 'new-thread',
            component: NewThread,
            meta: {
                requiresEmailVerified: true
            }
        },
        {
            path: '/new-vote',
            name: 'new-vote',
            component: NewVote,
            meta: {
                requiresEmailVerified: true
            }
        },
        {
            path: '/thread/:thread_id',
            name: 'view-thread',
            component: ViewThread,
            meta: {
                requiresEmailVerified: true
            }
        },
        {
            path: '/thread/:thread_id/new',
            name: 'new-comment',
            component: NewComment,
            meta: {
                requiresEmailVerified: true
            }
        },
    ]
})

// Nav Guards
router.beforeEach((to, from, next) => {
    
    if(to.matched.some(record => record.meta.requiresAuth)) {
        // ログインしてなかったらログインへ
        if(!firebase.auth().currentUser){
            next({
                path: '/login',
                query: {
                    redirect: to.fullpath
                }
            });
        // ログインしてて　かつ　メールも確認済だったらホームへ
        }else if(firebase.auth().currentUser.emailVerified){
            next({
                path: '/',
                query: {
                    redirect: to.fullpath
                }
            });
        // それ以外は通す
        }else{
            next();
        }
    }else if(to.matched.some(record => record.meta.requiresEmailVerified)) {
        // ログインしてなかったらログインへ
        if(!firebase.auth().currentUser){
            next({
                path: '/login',
                query: {
                    redirect: to.fullpath
                }
            });
        // ログインしてて　かつ　メール確認がまだだったらメール送信画面へ
        }else if(!firebase.auth().currentUser.emailVerified){
            next({
                path: '/verify-email',
                query: {
                    redirect: to.fullpath
                }
            });
        // それ以外は通す
        }else{
            next();
        }
    }else if(to.matched.some(record => record.meta.requiresGuest)){
        // ログインしてなかったら通す
        if(!firebase.auth().currentUser){
            next();
        // ログインしてて　かつ　メール確認がまだだったらメール送信画面へ
        }else if(!firebase.auth().currentUser.emailVerified){
            next({
                path: '/verify-email',
                query: {
                    redirect: to.fullpath
                }
            });
        // ログインしてて　かつ　メール確認も済みだったらホームへ
        }else{
            next({
                path: '/',
                query: {
                    redirect: to.fullpath
                }
            });
        }
    }else{
        // Proceed to route
        next();
    }
});

export default router;
