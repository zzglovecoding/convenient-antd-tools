import styles from './errorBoundary.less';
import PropTypes from 'prop-types';
import { Result, Button } from 'antd';
import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            errorMsg: null,
            errorMsgMap: {
                timeout: '抱歉，加载超时！'
            }
        };
    }

    static getDerivedStateFromError(error) {
        // 更新state，使得下次渲染可以正确显示，但具体逻辑其实我并不很清楚
        return { hasError: true, errorMsg: error.message };
    }

    // componentDidCatch (error, errorInfo) {
    //     // 把错误日志上传到服务器
    //     logErrorToMyService(error, errorInfo);
    // }

    render() {
        let { errorMsgMap, hasError, errorMsg } = this.state;

        if (hasError !== false) {
            // 这里是出现错误之后的显示UI
            return (
                <Result
                    status="warning"
                    title={errorMsgMap[errorMsg] || '抱歉，加载失败！'}
                    extra={<Button type="primary" key="console" onClick={() => window.location.reload(true)}>重新加载</Button>}
                    className={styles.errorBoundary}
                />
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.any
};