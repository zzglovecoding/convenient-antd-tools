

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