import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
// routers就是写成成员为对象的数组形式的那个js文件
import routers from './routers';
import { FrameContext, frameHook } from './context';
// 登录页面
import NoLogin from '@/containers/noLogin/NoLogin';

/**
 * @desc 第二种风格的登录，其实用户信息依然还是这样广播出去的，但其实是在判断有没有userInfo从而去跳转到登录页面的
 */
export default function App() {
    const frame = frameHook();
    const { 
        userInfo, 
        loginModalVisible, 
        closeLoginModal 
    } = frame;
    let routes = routers;

    if (userInfo) {
        routes = getUpdatedMenus(userInfo.menuList, getAccessMenus(routers, userInfo.permissionList));
        
    }

    return (
        <ConfigProvider locale={zhCN}>
            <FrameContext.Provider value={frame}>
                {
                    userInfo ?  
                        ( userInfo.id ? <BrowserRouter>
                            <div className={styles.mainLayout}>
                                <Header />
                                <div className={styles.content}>
                                    <Switch>
                                        {routes && routes.map(item => {
                                            let { path, ...rest } = item;

                                            return (
                                                <AuthRoute
                                                    key={item.name}
                                                    {...rest}
                                                    routers={routes}
                                                    path={path}
                                                />
                                            );
                                        })}
                                    </Switch>
                                </div>
                                <Footer />
                                <LoginModal visible={loginModalVisible} onCancel={() => closeLoginModal()}/>
                            </div>
                        </BrowserRouter>
                            : 
                            <NoLogin />)
                        : <></>  // 防止出现登陆页面
 
                } 
            </FrameContext.Provider>
        </ConfigProvider> 
    );
}

App.propTypes = {
    // 
};