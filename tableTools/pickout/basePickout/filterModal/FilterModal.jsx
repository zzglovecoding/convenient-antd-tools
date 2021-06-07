import React, { useState, useEffect } from 'react';
import { Checkbox, Button, Input } from 'antd';
import styles from './filterModal.less';

export default function(props) {
    const {
        originData,
        setParams,
        params,
        setFilterDropdownVisible,
        setFiltered
    } = props;

    const [currentUids, setCurrentUids] = useState([]);
    const [fullSelectList, setFullSelectList] = useState([]);
    const [currentSelectList, setCurrentSelectList] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    const [isUnderSearch, setIsUnderSearch] = useState(false);

    // 筛选框内的选项，只在第一次加载的时候设置
    useEffect(() => {
        let unMount = false;
        const init = async() => {
            const options = originData.map(item => {
                return {
                    label: item.name,
                    value: item.uid
                };
            });
            setFullSelectList(options);
            setCurrentSelectList(options);
        };

        init();

        return () => {
            unMount = true;
        };
    }, []);

    // 本页面中uids的state发生改变
    function onChange(checkedValues) {
        let uids = [...currentUids];
        if (!isUnderSearch) {
            // 没有被搜索
            setCurrentUids([...checkedValues]);
        } else {
            // 是搜索的情况
            // currentSelectList数组中的成员，在checkedValues中存在与否，决定了在currentUids里存在与否
            let plus = [];
            let minus = [];
            currentSelectList.forEach(item => {
                let uid = item.value;
                if (checkedValues.includes(uid)) {
                    // 有，说明currentUids里头，有这一个
                    plus.push(uid);
                } else {
                    // 没有，currentUids里头，不能有这个
                    minus.push(uid);
                }
            });
            minus.forEach(id => {
                let target = uids.indexOf(id);
                if (target !== -1) {
                    // 说明有
                    uids.splice(target, 1);
                }
            });
            plus.forEach(ids => {
                if (!uids.includes(ids)) {
                    uids.push(ids);
                }
            });
            setCurrentUids([...uids]);
        }
        
    }

    const handleCancel = () => {
        // 是清楚重置还是退出？
        setFilterDropdownVisible(false);
        setParams({ ...params });
    };

    const handleOK = () => {
        // 调用setParams
        setFilterDropdownVisible(false);
        if (currentUids.length > 0) {
            setFiltered(true);
        } else {
            setFiltered(false);
        }
        setParams({ ...params, selectUids: currentUids, pageNum: 1 });
    };

    const searchClick = () => {
        const afterSearch = fullSelectList.filter(item => {
            return item.label.indexOf(searchWord) > -1;
        });
        setCurrentSelectList(afterSearch);
        setIsUnderSearch(afterSearch.length === fullSelectList.length ? false : true);
    };

    return (
        <div className={styles.containers}>
            <div className={styles.searchArea}>
                <Input style={{ color: '#fff' }} placeholder="搜索" className={styles.inputComp} onChange={e => {setSearchWord(e.target.value);}}/>
                <Button style={{ position: 'absolute', right: '0', width: '40px', height: 'auto', backgroundColor: '#0D92A7' }} type="primary" icon="search" onClick={searchClick}></Button>
            </div>
            <div className={styles.treeContainer}>
                <Checkbox.Group options={currentSelectList} onChange={onChange} />
            </div>
            <div className={styles.buttonArea}>
                <Button id={styles.myButton1} onClick={handleCancel}>取消</Button>
                <Button id={styles.myButton2} onClick={handleOK}>确定</Button>
            </div>
        </div>
        
    );
}