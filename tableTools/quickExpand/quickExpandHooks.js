/* 
* @Description: 快速展开函数，生成expandedRowKeys和onExpand提供给table使用，setExpandedRowKeys给自己设置逻辑的使用，比如初始全部展开
* @Author: zzg  
* @Date: 2021-06-04 17:30:18  
 * @Last Modified by: zzg
 * @Last Modified time: 2021-06-04 17:31:24
*/

import {useState} from 'react';

export default function quickExpandHooks() {
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const onExpand = (_, record) => {
        // 如果record在里头，就移除，如果不在，就添加
        let targetIndex;
        for (let i = 0; i < expandedRowKeys.length; i++) {
            if (expandedRowKeys[i] === record.id) {
                targetIndex = i;
            }
        }
        targetIndex ? expandedRowKeys.splice(targetIndex, 1) : expandedRowKeys.push(record.id);
        setExpandedRowKeys([...expandedRowKeys]);
    };

    return {
        expandedRowKeys,
        onExpand,
        setExpandedRowKeys
    }
}


