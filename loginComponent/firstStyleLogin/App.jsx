import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorBoundary from 'Components/errorBoundary/ErrorBoundary';
import MainLayout from 'Layouts/mainLayout/MainLayout';
import hook from './hook';
import FrameContext from './context';

export default function App() {
    // 把数据广播出去就可以了
    const {
        userInfo,
        setUserInfo
    } = hook();

    return (
        <ErrorBoundary>
            <FrameContext.Provider value={{
                userInfo,
                setUserInfo
            }}>
                    <Switch>
                        {/* 主布局 */}
                        <Route path="/" component={MainLayout} />
                    </Switch>
            </FrameContext.Provider>
        </ErrorBoundary>
    );
}