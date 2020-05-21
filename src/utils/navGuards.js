import router from '../router'
import Cookie from 'js-cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
    NProgress.start(); // 开启Progress
    // document.body.scrollTop = 0;// 新页面top值为0
    if (to.name === 'Login' || Cookie.get('EuserName')) {
        next();
    } else {
        next({
            name: 'Login',
            query: {
                _t: new Date().getTime()
            }
        });
    }
});
router.afterEach(() => {
    NProgress.done(); // 结束Progress
});
