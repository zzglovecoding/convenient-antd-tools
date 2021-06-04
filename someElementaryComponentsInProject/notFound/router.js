export default function(LoadableWrap) {
    return [
        {
            name: 'notFound',
            path: '*',
            exact: true,
            component: LoadableWrap({
                loader: () => import('./NotFound')
            })
        }
    ];
}