import Vue from 'vue'
import Router from 'vue-router'
import login from './login';
import main from './main';
import notFound from './notFound';

Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [
        ...login,
        ...main,
        ...notFound
    ]
})
