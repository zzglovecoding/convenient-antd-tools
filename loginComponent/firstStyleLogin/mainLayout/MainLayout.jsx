import styles from './mainLayout.less';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import lazyload from 'Components/lazyload/Lazyload';
import Header from 'Components/header/Header';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import routers from './router.js';

const NotFound = lazyload(() => import('Pages/notFound/NotFound'));
const Home = lazyload(() => import('Pages/home/Home'));
const Login = lazyload(() => import('Pages/login/Login.jsx'));

/**
 * @desc 页面主框架组件,默认就直接到达这里
 */
export default class MainLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { match } = this.props;
        // props一般是用history,location,match三个对象的，其中match是记录路由信息的
        const { path: currentPath } = match;
        // 注意这样的写法实际上是把match当中的path值给了currentPath
        // match就是路径和组件的匹配关系，主要就是用来获取当前路径的

        return (
            <ConfigProvider locale={zhCN}>
                <div className={styles.mainLayout}>
                    {
                        localStorage.getItem('token') ? 
                            <div>
                                <Header />
                                <div className={styles.container}>
                                    <Switch>
                                        {
                                            routers.map(item => {
                                                const { path, component: Component, ...rest } = item;
                                                return <Route 
                                                                key={path} 
                                                                path={currentPath + path}
                                                                render={props => <Component {...props} />}
                                                                {...rest} 
                                                        />;
                                            })
                                        }
                                        <Route path="/home" component={Home} />
                                        {/* 以此类推，把路由和组件的映射在这里弄好，可以是上面那种router生成，也可以像下面一样自己写 */}
                                        <Redirect exact from="/" to="/home" />
                                        {/* 这里到home是我们自己写死的，不是用routes展开弄出来的，所以不需要考虑是不是/而不需要再加/的问题了 */}
                                        <Route path="*" component={NotFound} />
                                        {/* 其实还需要一个这种NotFound组件，也就是只要前面没有匹配到的，就会到这里来，那个NotFound，我们一般放在pages里头 */}
                                    </Switch>
                                </div>
                            </div>
                            :
                            <Switch>
                                <Route path="/login" component={Login} />
                                {/* 设置了一个路由 */}
                                <Redirect exact from="*" to="/login" />
                               {/* 只要没有token跑到了这里，那就要跳转到/login的位置，所以直接给了一个组件也就是Login */}
                            </Switch>
                    }
                    
                </div>
            </ConfigProvider>
        );
    }
}