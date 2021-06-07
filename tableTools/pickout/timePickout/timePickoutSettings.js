import React, { useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { Icon, Button, message } from 'antd';

export default function timePickoutSettings(props) {
    let {
        columnName,
        handleTimeSearch,
        handleTimeReset,
        onFilterFunc,
        className,
        filterIcon
    } = props;

    // 起始日期和截止日期的状态
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [date1, setDate1] = useState(null);
    const [date2, setDate2] = useState(null);

    // 发布时间/立案时间的选择和清空
    handleTimeSearch = handleTimeSearch ? handleTimeSearch : (selectedKeys, confirm, clearFilters) => {
        if (!selectedKeys[0] && !selectedKeys[1]) {
            // 如果什么也没输入，就直接清除掉筛选
            clearFilters();
            return;
        }
        if (selectedKeys[0] && selectedKeys[1]) {
            // 必须两个都有，才能继续
            let startTime = selectedKeys[0].unix();
            let endTime = selectedKeys[1].unix();
            setStartDate(startTime);
            setEndDate(endTime);
            confirm();
        } else {
            message.error('请正确选择两个日期！');
            return;
        }
        
    };

    handleTimeReset  = handleTimeReset ? handleTimeReset : clearFilters => {
        clearFilters();
        setDate1(null);
        setDate2(null);
    };

    return {
        filterIcon: filterIcon,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div className={cls('zzg-common-timeFilterContainer',className)}>
                <div>
                    <span>起始日期</span>
                    <DatePicker onChange={(date) => {
                        setSelectedKeys(date ? [date, selectedKeys[1]] : [undefined, selectedKeys[1]]);
                        setDate1(date);
                    }
                    }
                    style={{ width: 160, marginBottom: 8, display: 'inline-block', marginLeft: 10 }}
                    className="zzg-common-firstTimePicker"
                    value={date1}
                    />
                    
                </div>
                <div>
                    <span>截止日期</span>
                    <DatePicker onChange={(date) => 
                    {
                        setSelectedKeys(date ? [selectedKeys[0], date] : [selectedKeys[0], undefined]);
                        setDate2(date);
                    }
                    
                    }
                    style={{ width: 160, marginBottom: 8, display: 'inline-block', marginLeft: 10 }}
                    className="zzg-common-secondTimePicker"
                    value={date2}
                    />
                </div>
                
                <Button
                    type="primary"
                    onClick={() => handleTimeSearch(selectedKeys, confirm, clearFilters)}
                    icon="search"
                    className="zzg-common-firstTimeButton"
                    size="small"
                    style={{ width: 90, marginRight: 8, marginLeft: 20 }}
                >
                搜索
                </Button>
                <Button 
                    onClick={() => handleTimeReset(clearFilters)} 
                    size="small" 
                    className="zzg-common-secondTimeButton"
                    style={{ width: 90 }}
                >
                清除
                </Button>
            </div>
        ),
        onFilter: onFilterFunc ? onFilterFunc : (_, record) => {
            let time = moment(record[columnName]).unix();
            return time >= startDate && time <= endDate;
        },  
    };
}

timePickoutSettings.propTypes = {
    columnName: PropTypes.string.isRequired,
    handleTimeSearch: PropTypes.func,
    handleTimeReset: PropTypes.func,
    onFilterFunc: PropTypes.func,
    filterIcon:PropTypes.func
};

timePickoutSettings.defaultProps = {
    filterIcon:() => <Icon type="caret-down" />
}