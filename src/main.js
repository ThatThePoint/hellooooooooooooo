// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import Cookie from 'js-cookie';
import "babel-polyfill"
// import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false




router.beforeEach((to, from, next) => {
    const userInfo = Cookie.get("userInfo") ? JSON.parse(Cookie.get("userInfo")) : null

    // console.log(userInfo)
    // console.log(to)
    if (to.name == 'Login'  ) {
        
        next();
    }else if(( to.name =='AccountMng')&&userInfo&&userInfo.currentMember&&userInfo.currentMember.memberType=='3'){
        next({
            name:'InfCollection',
            query: {
                _t: new Date().getTime()
            }
        });
    }else if(userInfo){
        next()
    } else {
        next({
            name: 'Login',
            query: {
                _t: new Date().getTime()
            }
        });
    }
})
Vue.use(ElementUI)
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})