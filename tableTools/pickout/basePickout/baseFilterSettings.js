import React,{ useState } from 'react';
import FilterModal from './filterModal/FilterModal.jsx';

export default function pickoutSettings(props) {

    const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
    const [filtered, setFiltered] = useState(false);

    return {
        filterDropdownVisible: filterDropdownVisible,
        filtered: filtered,
        onFilterDropdownVisibleChange: () => {
            setFilterDropdownVisible(!filterDropdownVisible);
            setParams({ ...params });
        },
        filterDropdown: () => {
            return <FilterModal setFiltered={setFiltered} setFilterDropdownVisible={setFilterDropdownVisible}/>;
        }
    }
}