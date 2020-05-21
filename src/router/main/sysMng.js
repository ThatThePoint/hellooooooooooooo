export default [
    // {
    //     path: '/setting',
    //     name: 'Setting',
    //     // redirect: '/setting-a',
    //     component: resolve => require(['@/components/main/Setting'], resolve)
    // },
    {
        path: '/account-mng',
        name: 'AccountMng',
        component: resolve => require(['@/components/main/Setting/AccountMng'], resolve)
    },

]