import React, { useState, useEffect } from 'react';
import { Icon } from 'antd';
import styles from './style.less';
import PropTypes from 'prop-types';

export default function FoldContainer(props) {
    const {
        maxHeight,
        bottomSpace,
        tipWordsOnOpen,
        tipWordsOnClose,
        tipStyles,
        openImg,
        closeImg
    } = props;

    const [isShowAll, setIsShowAll] = useState(false);
    const [initialHeight, setInitialHeight] = useState(0);

    useEffect(() => {
        let currentHeight = document.getElementsByClassName(styles.foldContainer)[0].querySelector('.ant-table-wrapper').offsetHeight;
        setInitialHeight(currentHeight);
    }, []);

    return (
        <div className={styles.foldContainer}>
            <div style={{ position: 'relative', height: initialHeight <= maxHeight ? 'auto' : !isShowAll ? maxHeight + 'px' : 'auto', overflow: 'hidden', marginBottom: bottomSpace + 'px' }}>
                {
                    props.children
                }
            </div>
            <div style={{ display: initialHeight <= maxHeight ? 'none' : 'block', ...tipStyles }} className={styles.seeMore} onClick={() => setIsShowAll(!isShowAll)} >{
                !isShowAll ? (<div>{tipWordsOnOpen}{openImg}</div>) : (<div>{tipWordsOnClose}{closeImg}</div>)
            }</div>
        </div>
    );
}

FoldContainer.propTypes = {
    maxHeight: PropTypes.number,
    bottomSpace: PropTypes.number,
    tipWordsOnOpen: PropTypes.string,
    tipWordsOnClose: PropTypes.string,
    tipStyles: PropTypes.object,
    openImg: PropTypes.element,
    closeImg: PropTypes.element
};
FoldContainer.defaultProps = {
    maxHeight: 830,
    bottomSpace: 60,
    tipWordsOnOpen: '展开查看全部',
    tipWordsOnClose: '收起',
    openImg: <Icon type="caret-down" />,
    closeImg: <Icon type="caret-up" />
};