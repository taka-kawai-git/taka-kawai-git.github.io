import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import NewThread from '@/components/NewThread';
import ViewThread from '@/components/ViewThread';
import NewComment from '@/components/NewComment';
import Login from '@/components/Login';
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
                requiresAuth: true
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
            path: '/new',
            name: 'new-thread',
            component: NewThread,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/:thread_id',
            name: 'view-thread',
            component: ViewThread,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/:thread_id/new',
            name: 'new-comment',
            component: NewComment,
            meta: {
                requiresAuth: true
            }
        },
    ]
})

// Nav Guards
router.beforeEach((to, from, next) => {
    // Check for requiresAuth
    if(to.matched.some(record => record.meta.requiresAuth)) {
        // Check if NOT logged in
        if(!firebase.auth().currentUser){
            // Go to Login
            next({
                path: '/login',
                query: {
                    redirect: to.fullpath
                }
            });
        }else{
            next();
        }
    }else if(to.matched.some(record => record.meta.requiresGuest)){
        // Check if logged in
        if(firebase.auth().currentUser){
            // Go to Login
            next({
                path: '/',
                query: {
                    redirect: to.fullpath
                }
            });
        }else{
            // Proceed to route
            next();
        }
    }else{
        // Proceed to route
        next();
    }
});

export default router;
