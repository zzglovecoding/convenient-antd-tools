import {Icon,Input} from 'antd';

export default function() {
    return {
        filterIcon: () => {return <Icon type="caret-down" />;},
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <div>
                    <span>最小金额</span>
                    <Input
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value, selectedKeys[1]] : [undefined, selectedKeys[1]])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, 'refValue')}
                        style={{ width: 160, marginBottom: 8, display: 'inline-block', marginLeft: 10 }}
                        placeholder="请输入最小金额"
                    />
                </div>
                <div>
                    <span>最大金额</span>
                    <Input
                        value={selectedKeys[1]}
                        onChange={e => setSelectedKeys(e.target.value ? [selectedKeys[0], e.target.value] : [selectedKeys[0], undefined])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, 'refValue')}
                        style={{ width: 160, marginBottom: 8, display: 'inline-block', marginLeft: 10 }}
                        placeholder="请输入最大金额"
                    />
                </div>
            </div>
        ),
        onFilter: (_, record) => {
            return record['refValue'] >= minAmount && record['refValue'] <= maxAmount;
        },     
    }
}