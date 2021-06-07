/* 
* @Description:  左侧的菜单
* @Author: zzg  
* @Date: 2021-06-07 14:55:15  
* @Last Modified by:   zzg  
* @Last Modified time: 2021-06-07 14:55:15  
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

import hooks from './sideMenuHooks';

export default function SideMenu({
    // 根节点样式
    style,
    // 菜单数据
    menus,
    // antd Menu组件参数
    antdMenuProps,
    // 单击事件
    onClick
}) {
    const {
        renderMenu
    } = hooks({
        menus,
        onClick
    });

    return (
        <div className="y900-side-menu" style={style}>
            <Menu
                mode="inline"
                {...antdMenuProps}>
                {renderMenu(menus)}
            </Menu>
        </div>
    );
}

SideMenu.defaultProps = {
    style: {},
    antdMenuProps: {},
    menus: []
};

SideMenu.propTypes = {
    style: PropTypes.object,
    menus: PropTypes.array,
    antdMenuProps: PropTypes.object,
    onClick: PropTypes.func
};