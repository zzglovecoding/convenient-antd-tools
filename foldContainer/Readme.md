/* 
* @Description:  
* @Author: zzg  
* @Date: 2021-06-02 14:16:18  
 * @Last Modified by: zzg
 * @Last Modified time: 2021-06-02 14:46:43
*/

在需要折叠的组件上加一层这个组件，就可以实现多余的点击展开
```
<FoldContainer>
    <Your Component />
</FoldContainer>
```

参数如下：

字段                    类型                    说明

maxHeight               number                   （ 从多少高度开始，显示展开按钮，并且多余的隐藏）
bottomSpace             number                   （底部预留多少空间，一般是用来放提示语的）
tipWordsOnOpen          string                   （默认是'展开查看全部'，当然可以自己定义字）
tipWordsOnClose         string                   （默认是'收起'）
tipStyles               CSSProperties            （提示语部分的样式自定义，不要再写display部分，否则会覆盖掉前面的）
openImg                 ReactNode                （打开的三角形图片，默认是用的antd的Icon）
closeImg                ReactNode                （也是一个Icon）
