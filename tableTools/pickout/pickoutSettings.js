/* 
* @Description: 关于范围筛选框的基本内容 
* @Author: zzg  
* @Date: 2021-06-03 13:58:28  
 * @Last Modified by: zzg
 * @Last Modified time: 2021-06-03 15:16:31
*/

import { Icon, Input, Button, message } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function pickoutSettings(props) {
    let {
        columnName,
        handleSearchFunc,
        handleResetFunc,
        onFilterFunc,
        className
    } = props;

    // 数字的大小状态定义
    const [minAmount, setMinAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');

    handleSearchFunc = handleSearchFunc ? handleSearchFunc : function(selectedKeys, confirm) {
        if (!selectedKeys[0] && !selectedKeys[1]) {
            // 如果什么也没输入，就直接confirm
            confirm();
            return;
        }
        let minFalse = false;
        let maxFalse = false;
        selectedKeys.forEach((item, index) => {
            let Regex = /^(-?\d+)(\.\d+)?$/;
            if (!Regex.test(item)) {
                // 说明不是数字
                if (index === 0) {
                    minFalse = true;
                } else {
                    maxFalse = true;
                }
            }
        });
        if (minFalse || maxFalse) {
            message.error('请输入正确的最小和最大数字!');
            return;
        }
        setMinAmount(parseFloat(selectedKeys[0], 10));
        setMaxAmount(parseFloat(selectedKeys[1], 10));
        confirm();
    };

    handleResetFunc = handleResetFunc ? handleResetFunc : clearFilters => {
        clearFilters();
    };

    return {
        filterIcon: () => {return <Icon type="caret-down" />;},
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{padding:'8px'}}>
                <div>
                    <span>最小金额</span>
                    <Input
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value, selectedKeys[1]] : [undefined, selectedKeys[1]])}
                        onPressEnter={() => handleSearchFunc(selectedKeys, confirm)}
                        style={{ width: 160, marginBottom: 8, display: 'inline-block', marginLeft: 10 }}
                        placeholder="请输入最小金额"
                    />
                </div>
                <div>
                    <span>最大金额</span>
                    <Input
                        value={selectedKeys[1]}
                        onChange={e => setSelectedKeys(e.target.value ? [selectedKeys[0], e.target.value] : [selectedKeys[0], undefined])}
                        onPressEnter={() => handleSearchFunc(selectedKeys, confirm)}
                        style={{ width: 160, marginBottom: 8, display: 'inline-block', marginLeft: 10 }}
                        placeholder="请输入最大金额"
                    />
                </div>
                <Button
                    type="primary"
                    onClick={() => handleSearchFunc(selectedKeys, confirm, clearFilters)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8, marginLeft: 20 }}
                >
                        搜索
                </Button>
                <Button onClick={() => handleResetFunc(clearFilters)} size="small" style={{ width: 90 }}>
                        清除
                </Button>
            </div>
        ),
        onFilter: onFilterFunc ? onFilterFunc : (_, record) => {
            return record[columnName] >= minAmount && record[columnName] <= maxAmount;
        }
    };
}

pickoutSettings.propTypes = {
    columnName: PropTypes.string.isRequired,
    handleSearchFunc: PropTypes.func,
    handleResetFunc: PropTypes.func,
    onFilterFunc: PropTypes.func
};