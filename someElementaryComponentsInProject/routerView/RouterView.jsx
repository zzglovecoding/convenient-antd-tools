import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import AuthRoute from '@/components/authRoute/AuthRoute';

export default function RouterView({
    parents,
    routers,
    currentPath,
    indexPath
}) {
    return (
        <Switch>
            {
                indexPath ? <Redirect exact={true} from={currentPath} to={indexPath} /> : '' // 跳到第一级子菜单
            }
            {routers && routers.map(item => {
                let { path, ...rest } = item;

                return (
                    <AuthRoute
                        key={item.name}
                        {...rest}
                        parents={[...parents, item]}
                        parentPath={currentPath}
                        routers={routers}
                        path={currentPath + path}
                    />
                );
            })}
        </Switch>
    );
}

// 默认参数
RouterView.defaultProps = {
    routers: [],
    currentPath: '',
    indexPath: null,
    parents: []
};

// 参数类型定义
RouterView.propTypes = {
    routers: PropTypes.array,
    currentPath: PropTypes.string,
    indexPath: PropTypes.string,
    parents: PropTypes.array
};