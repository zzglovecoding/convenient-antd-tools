import { useEffect, useState } from 'react';

export default function FrameHook() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // 此时user-id已经是存储在了localStorage里头的，如果没有，说明没登录就先不管
        let userId = localStorage.getItem('user-id');
        if (!userId) {
            return;
        }
        // 根据userId去获取用户信息，并且保存用户信息，通过context把数据发布出去
    }, []);

    return {
        userInfo,
        setUserInfo
    };
}