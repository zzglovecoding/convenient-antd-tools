import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import LoadableWrap from '@/components/loadableWrap';
import notFound from '../notFound/router';

function AuthRoute(props) {
    const { component: Component, redirect, children, parents, parentPath, ...rest } = props;
    
    return redirect ? <Redirect {...redirect} /> :
        <Route
            {...rest} // 其中包括path来定位路由
            render={_props => {
                const routers = children && children.length > 0 ? [...children, ...(notFound(LoadableWrap))] : []; // 返回子路由

                return [
                    <Component key="component" {..._props} parents={parents} parentPath={parentPath} routers={routers} />
                ];
            }}
        />;
}

AuthRoute.propTypes = {
    component: PropTypes.any,
    routers: PropTypes.array,
    redirect: PropTypes.object,
    children: PropTypes.any,
    path: PropTypes.string,
    parentPath: PropTypes.string,
    parents: PropTypes.array
};

export default AuthRoute;