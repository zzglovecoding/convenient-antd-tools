/* 
* @Description:  传入一个props就可以生成一个面包屑了，但是这个props需要给他路由
* @Author: zzg  
* @Date: 2021-06-07 14:30:48  
 * @Last Modified by: zzg
 * @Last Modified time: 2021-06-07 14:31:12
*/
import React from 'react';
import { Breadcrumb } from 'antd';
import Cns from 'classnames';

export default ((props) => {
    const { className,  routes, ...rest } = props;

    const handleClick = (e, item) => {
        const { path } = item;
        e.preventDefault();

        if (path) {
            location.href = path;
        }
    };

    return (
        <Breadcrumb {...rest} className={Cns(className, 'our-named-className')}>
            {routes.map(item =>  <Breadcrumb.Item 
                key={item.path} 
                href={item.path}
                onClick={e => handleClick(e, item)}>{item.name}</Breadcrumb.Item>)}
        </Breadcrumb>
    );
});
