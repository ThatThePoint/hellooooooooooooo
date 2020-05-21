export default [{
    path: '/',
    // name: 'Login',
    component: resolve => require(['@/components/login'], resolve)
}, {
    path: '/login',
    name: 'Login',
    component: resolve => require(['@/components/login'], resolve)
}]