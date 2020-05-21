import home from './home';
import sysMng from './sysMng';
export default [{
    path: '/inf-collection',
    redirect: '/inf-collection',
    component: resolve => require(['@/components/main'], resolve),
    children: [
        ...home,
        ...sysMng,
    ]
}]