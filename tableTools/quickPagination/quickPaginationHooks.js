/* 
* @Description:  pagination快速生成hooks
* @Author: zzg  
* @Date: 2021-06-04 17:21:44  
* @Last Modified by:   zzg  
* @Last Modified time: 2021-06-04 17:21:44  
*/
import {useState} from 'react';
import PropTypes from 'prop-types';

export default function quickPaginationHooks(props) {
    const {
        getDataBaseOnKeyWordsAndPage,
        argumentsSpecification,
        setDataSource,
        otherArgumentsList
    } = props;
    

    const [page, setPage] = useState({ pageNum: 1, pageSize: 10, total: 0 });
    const pagination = {
        current: page.pageNum,
        total: page.total,
        pageSize: page.pageSize,
        onChange: (pageNum) => {
            page.pageNum = pageNum;
            setPage({ ...page });
            let arr = new Array(argumentsSpecification.argumentsLength).fill(null);
            arr[argumentsSpecification.pageNumIndex] = page.pageNum;
            arr[argumentsSpecification.pageSizeIndex] = page.pageSize;
            for(let i = 0;i < arr.length;i++) {
                if(arr[i] === null) {
                    arr[i] = otherArgumentsList[i];
                }
            }
            getDataBaseOnKeyWordsAndPage(...arr).then(res => {
                page.total = res.totalCount;
                setPage({ ...page });
                setDataSource(res.data);
            });
        },
        onShowSizeChange: (current, size) => {
            page.pageSize = size;
            page.pageNum = 1;
            setPage({ ...page });
            let arr = new Array(argumentsSpecification.argumentsLength).fill(null);
            arr[argumentsSpecification.pageNumIndex] = page.pageNum;
            arr[argumentsSpecification.pageSizeIndex] = page.pageSize;
            for(let i = 0;i < arr.length;i++) {
                if(arr[i] === null) {
                    arr[i] = otherArgumentsList[i];
                }
            }
            getDataBaseOnKeyWordsAndPage(...arr).then(res => {
                page.total = res[argumentsSpecification.totalName];
                setPage({ ...page });
                setDataSource(res[argumentsSpecification.dataSourceName]);
            });
        }
    };

    return {
        pagination
    }
}

quickPaginationHooks.propTypes = {
    setDataSource: PropTypes.func.isRequired,
    getDataBaseOnKeyWordsAndPage:PropTypes.func.isRequired,
    argumentsSpecification:PropTypes.object,
    otherArguments:PropTypes.array
};
quickPaginationHooks.defaultProps = {
    argumentsSpecification:{
        pageNumIndex:1,
        pageSizeIndex:2,
        argumentsLength:3,
        totalName:'totalCount',
        dataSourceName:'data',  
    },
    otherArgumentsList:[]
};