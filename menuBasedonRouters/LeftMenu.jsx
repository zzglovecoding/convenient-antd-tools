/* 
* @Description:  左侧菜单
* @Author: zzg  
* @Date: 2021-06-07 14:50:25  
 * @Last Modified by: zzg
 * @Last Modified time: 2021-06-07 14:55:07
*/
import React, { useEffect, useState } from 'react';
import { SideMenu, Routes } from './SideMenu';
import { isNotEmpty } from '@/utils/common';
import { useHistory, useLocation } from 'react-router-dom';
// import routers from '../routers';
import PropTypes from 'prop-types';

export default function LeftMenu(props) {
    const { routers } = props;
    // 定义路由跳转对象
    const history = useHistory();
    // 当前路径
    const { pathname } = useLocation();

    // 选中的菜单key
    const [selectedKeys, setSelectedKeys] = useState(null);
    // 展开的菜单
    const [openKeys, setOpenKeys] = useState(null);
    
    // 页面初始化完成后
    useEffect(() => {
        let selectedKeys = [], openKeys = [];
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
                    if (item?.children && item.children instanceof Array) {
                        openKeys.push(fullPath);
                        selectedKeys.push(fullPath);
                        recursiveRoutes(item.children, fullPath);
                        break;
                    } else {
                        selectedKeys.push(fullPath);
                    }
                }
            }
            return res;
        };
        recursiveRoutes(routers);
        // 设置选中的菜单
        setSelectedKeys(selectedKeys);
        // 设置展开的菜单
        setOpenKeys(openKeys);
    }, [pathname]);

    // 生成菜单树形数据
    const getMenus = (menus, parentPath = '') => {
        return menus
                .filter(item => item.accessible)
                // 过滤菜单
                .filter(item => item?.isMenu)
                // 遍历子菜单
                .map(item => {
                    item.fullPath = item.path ? parentPath + item.path : '';
                    if (item.children) {
                        item.children = getMenus(item.children, item.fullPath);
                    }
                    item.key = item.fullPath || item.name;
                    return item;
                });
    };

    // 菜单点击事件
    const handleClick = (_, menu) => {
        if (isNotEmpty(menu.children)) {
            return;
        }
        // 如果是模型算法管理，就开新窗口
        if (menu.key === '模型算法管理') {
            setSelectedKeys([...selectedKeys]);
            window.open(Routes.getModalAlgorithmHost(), 'modalAlgorithm');
        }

        // 页面跳转
        if (menu.fullPath) {
            history.push(menu.fullPath);
        }
    };
    
    return (
        openKeys !== null ? <SideMenu
            key={selectedKeys ? selectedKeys.join(',') : pathname}
            menus={getMenus(routers)}
            onClick={handleClick}
            antdMenuProps={{
                defaultOpenKeys: openKeys,
                selectedKeys: selectedKeys
            }}
        /> : ''
    );
}

// 参数定义
LeftMenu.propTypes = {
    routers: PropTypes.array
};