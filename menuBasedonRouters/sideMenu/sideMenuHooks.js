/* 
* @Description:  左侧菜单栏的数据
* @Author: zzg  
* @Date: 2021-06-07 14:55:44  
* @Last Modified by:   zzg  
* @Last Modified time: 2021-06-07 14:55:44  
*/
import React, { useCallback } from 'react';
import { Menu, Icon } from 'antd';
import { isEmpty } from '@/utils/common';

export default function({
    onClick
}) {
    // 生成菜单标题
    const renderMenuText = menu => {
        return (
            <>
                {menu.icon && <Icon type={menu.icon} />}
                {menu.img && <img src={menu.img} />}
                {menu.name}
            </>
        );
    };

    // 获取菜单元素key
    const getKey = (menu) => {
        return menu.key || menu.id || menu.name;
    };

    // 菜单点击事件
    const handleMenuClick = (e, menu) => {
        typeof onClick === 'function' && onClick(e, menu);
    };

    // 生成菜单 dom
    const renderMenu = (menus) => {
        return menus.map(menu => {
            return isEmpty(menu.children) ? (
                // 不存在子菜单
                <Menu.Item key={getKey(menu)}>
                    <div className="y900-item-title" title={menu.name} onClick={e => handleMenuClick(e, menu)}>
                        {renderMenuText(menu)}
                    </div>
                </Menu.Item>
            ) : (
                // 存在子菜单
                <Menu.SubMenu
                    key={getKey(menu)}
                    title={
                        <div className="y900-submenu-title" title={menu.name} onClick={e => handleMenuClick(e, menu)}>
                            {renderMenuText(menu)}
                        </div>
                    }
                >
                    {renderMenu(menu.children)}
                </Menu.SubMenu>
            );
        });
    };

    // return
    return {
        renderMenu
    };
}