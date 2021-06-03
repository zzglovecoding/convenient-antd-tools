import React,{ useState } from 'react';

export default function QuickTable(props) {
    // 翻页和接口是有耦合的
    const [page, setPage] = useState({ pageNum: 1, pageSize: 10, total: 0 });
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const onExpand = (_, record) => {
        // 如果record在里头就移除，如果不在就添加
        let targetIndex;
        for (let i = 0; i < expandedRowKeys.length; i++) {
            if (expandedRowKeys[i] === record.id) {
                targetIndex = i;
            }
        }
        targetIndex ? expandedRowKeys.splice(targetIndex, 1) : expandedRowKeys.push(record.id);
        setExpandedRowKeys([...expandedRowKeys]);
    };
    const pagination = {
        current: page.pageNum,
        total: page.total,
        pageSize: page.pageSize,
        onChange: (pageNum) => {
            page.pageNum = pageNum;
            setPage({ ...page });
            getDefaultListData(null, page.pageNum, page.pageSize).then(res => {
                page.total = res.totalCount;
                setPage({ ...page });
                let arr = getOtherInfoArr(res);
                setdefaultTableInfo(res ? formatListData(res, columns, arr) : { columns: [], dataWrapper: { data: [] } });
            });
        },
        onShowSizeChange: (current, size) => {
            page.pageSize = size;
            page.pageNum = 1;
            setPage({ ...page });
            getDefaultListData(null, page.pageNum, page.pageSize).then(res => {
                page.total = res.totalCount;
                setPage({ ...page });
                let arr = getOtherInfoArr(res);
                setdefaultTableInfo(res ? formatListData(res, columns, arr) : { columns: [], dataWrapper: { data: [] } });
            });
        }
    };
}