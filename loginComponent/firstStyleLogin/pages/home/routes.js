import lazyload from 'Components/lazyload/Lazyload';
const Search = lazyload(() => import('Pages/home/pages/search/Search'));

export default [
    {
        path: 'search',
        component: Search
    },
    // 组件的路由可以像以前一样写在这里
];