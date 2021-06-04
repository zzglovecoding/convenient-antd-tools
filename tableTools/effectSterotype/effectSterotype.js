/* 
* @Description:useEffect的模板  
* @Author: zzg  
* @Date: 2021-06-04 17:33:53  
 * @Last Modified by: zzg
 * @Last Modified time: 2021-06-04 17:35:58
*/

useEffect(() => {
    let unMount = false;

    const setTableListDataFunc = (res) => {
        // 处理所有的res，全部展开
        let arr = getAllId(res);
        page.total = res.length;
        // 一些数据处理的逻辑

        setExpandedRowKeys(arr);
        setPage({ ...page });
        setDataSource(res);
        // 一起setState
    };

    const init = async() => {
        setIsloading(true);
        const tableListData = await getSomeData();
        if (!unMount) {
            setTableListDataFunc(tableListData);
            setIsloading(false);
        }
    };

    init();

    return () => {
        unMount = true;
        // 避免已经进入下一次渲染，数据才开始set
    };
}, [someDependencies]);