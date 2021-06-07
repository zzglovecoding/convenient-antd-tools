// 这个文件描述的是如何到达本组件的
export default function(LoadableWrap) {
    return [
        {
            name: '首页',
            path: '/',
            exact: true,
            component: LoadableWrap({
                loader: () => import('./Home')
            })
        }
    ];
}