/* 
* @Description: 一些常见的前端辅助函数
* @Author: zzg  
* @Date: 2021-06-04 16:06:07  
* @Last Modified by:   zzg  
* @Last Modified time: 2021-06-04 16:06:07  
*/

// source就是一个dataSource的数组，每一个成员都有children，这个方法就是遍历所有的children，然后把他们的id保存起来
export function getAllId(source) {
    let arr = [];
    function Ite(source) {
        if (source.children.length > 0) {
            for (let i = 0; i < source.children.length; i++) {
                Ite(source.children[i]);
            }
        }
        arr.push(source.id);
    }
    for (let i = 0; i < source.length; i++) {
        Ite(source[i]);
    }
    return arr;
}

// 增加一个前端生成的序号
export function addNumberPrfix(arr) {
    let serialNum = 0;
    return arr.map(item => {
        serialNum++;
        return {
            serialNum,
            ...item
        };
    });
}

// 截取部分，完整的用span展示
export function ellipsisWord(str, len) {
    if (str && str.length > len) {
        return str.substring(0, len) + '...';
    }

    return str;
}