timePickout筛选弹框的逻辑,是范围筛选

# 适用情形
说明：适用于筛选范围值的table某一列的弹框
columnName是必须传的参数，这是该筛选行的dataIndex

# 使用示例
## 在需要筛选的columns对象上，展开这个函数即可完成配置
```
import timePickoutSettings from './timePickoutSettings.js';

{
    title:'需要筛选的列',
    ...timePickoutSettings('publishTime')
}
```

| 参数 | 类型 | 说明 |
| :-----| ----: | :----: |
| columnName | string | 就是需要筛选的列表dataIndex |
| handleTimeSearch | (selectedKeys,confirm) => {}   | 时间选择器的函数，依然是获取两个值但是比较的是时间先后 |
| handleTimeReset | (clearFilters) => {} |  想要清除筛选执行这个函数即可，可自己去定义 |
| filterIcon | () => ReactNode | 返回一个筛选的节点,默认是antd的Icon<Icon type="caret-down" /> |
| className | string | 筛选弹框的className |
| onFilterFunc | (filterValue,record) => Boolean | 筛选的最终判断 |