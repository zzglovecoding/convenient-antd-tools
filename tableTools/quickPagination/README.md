# 说明

本hooks旨在快速生成一个pagination，需要传入一些参数

```
const {
    pagination
} = hooks({
    getDataBaseOnKeyWordsAndPage,
    argumentsSpecification,
    setDataSource,
    otherArgumentsList
})
```

# 参数

| 参数 | 类型 | 说明 |
| :-----| ----: | :----: |
| getDataBaseOnKeyWordsAndPage | () => {} | 获取数据的接口函数，返回一个promise |
| argumentsSpecification | object   | 关于参数的描述，后面详细讲 |
| setDataSource | () => {} |  列表dataSource的set函数 |
| otherArgumentsList | array | 其他的接口参数状态 |

# 关于 argumentSpecification

```
argumentsSpecification:{
    pageNumIndex:1,
    // 代表的是pageNum在哪个index
    pageSizeIndex:2,
    // 代表pageSize在哪个index
    argumentsLength:3,
    // 一共有多少个参数
    totalName:'totalCount',
    // 返回值中 总数的键名
    dataSourceName:'data',
    // dataSource值的键名  
}
```