export default [
    // {
    //     path: '/home',
    //     name: 'Home',
    //     component: resolve => require(['@/components/main/Home'],resolve)
    // },
    {
        path: '/inf-collection',
        name: 'InfCollection',
        component: resolve => require(['@/components/main/InfCollection'],resolve)   
    },
    {
        path: '/data-analysis',
        name: 'DataAnalysis',
        component: resolve => require(['@/components/main/DataAnalysis'],resolve)   
    }
]