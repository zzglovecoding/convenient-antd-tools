/* 
* @Description:  基于上面的BreadCrumb，在这里把传入的routers进行了使用，然后给了BreadCrumb所有的面包屑路径
* @Author: zzg  
* @Date: 2021-06-07 14:40:11  
 * @Last Modified by: zzg
 * @Last Modified time: 2021-06-07 14:43:07
*/
import React, { useEffect, useMemo, useState } from 'react';
import AntdWrappedCrumb from './AntdWrappedCrumb.jsx';
import { useLocation } from 'react-router-dom';

export default function({
    // 父节点路由，一维数组
    parents,
    // 当前模块的节点路由，为树型结构
    routers
    // 这个routers是全局的router对象
}) {
    const [breadcrumbData, setBreadcrumbData] = useState([]);
    const { pathname, search } = useLocation();

    useEffect(() => {
        // 递归获取菜单列表
        const recursiveRoutes = (_routers, parentPath = '') => {
            let res = [];
            for (let i in _routers) {
                const item = _routers[i];
                const { path } = item;
                // 生成全路径
                const fullPath = parentPath + path;

                if (!fullPath || fullPath === '/') {
                    continue;
                }

                if (pathname.indexOf(fullPath) === 0) {
                    res.push(item);

                    if (item?.children && item.children instanceof Array) {
                        res = res.concat(recursiveRoutes(item.children, fullPath));
                        break;
                    }
                }
            }

            return res;
        };

        // 完整的父路由路径
        const parentFullPath = parents.reduce((res, current) => {
            return res + (current?.path || '');
        }, '');
    
        const data = recursiveRoutes(routers, parentFullPath);
        
        data.length > 0 && setBreadcrumbData(data);
    }, [pathname]);

    return useMemo(() => {
        // 生成完整的路由路径
        const routes = [...parents, ...breadcrumbData].reduce((res, current, index) => {
            res[index] = { ...current };
            if (index > 0) {
                res[index].path = res[index - 1].path + current.path;
            } else {
                res[index].path = current?.path || '';
            }

            return res;
            
        }, []).filter(item => item.breadcrumb !== false);

        if (routes && routes[routes.length - 1].path === pathname && search) {
            routes[routes.length - 1].path += search;
        }
        
        return (
            <AntdWrappedCrumb routes={routes} />
        );
    }, [breadcrumbData]);
}