import http from '@easytool/http';
import React from 'react';
import { render } from 'react-dom';
import App from '@/layouts/app/App';
import { HttpSettings, DI } from '我们自己的公共组件库';

// 接口全局配置
http.settings({
    ...HttpSettings,
    proxyPath: __DEV__ && '/proxy',
    isDev: __DEV__
});

// 
DI.inject({
    http
});

render(
    <App />,
    document.getElementById('app')
);


// 下面的文件就是DI对应的东西，是用来记录依赖的

// var dependencies = {};

// export function inject(modules) {
//     Object.assign(dependencies, modules);
// }

// export function extract(name) {
//     var module = dependencies[name];
//     if (!module) {
//         throw `未注入模块"${name}"`;
//     }
//     return module;
// }