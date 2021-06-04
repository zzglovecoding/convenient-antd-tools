import React from 'react';
import { useHistory } from 'react-router-dom';
import { Result, Button } from 'antd';

export default function NotFound() {
    const history = useHistory();
    
    return (
        <Result
            status="404"
            title="404"
            subTitle="页面未找到"
            extra={<Button type="primary" onClick={() => history.replace('/')}>回到首页</Button>}
        />
    );
}