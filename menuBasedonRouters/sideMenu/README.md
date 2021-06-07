# 系统左侧菜单UI组件


# 参数说明
参数 | 说明 | 类型 | 默认值
---|---|---|---
menus | 菜单数据 | array | []
style | 根节点样式 | object | {}
onClick | 菜单点击事件 | function(e, menu) | -
antdMenuProps | antd Menu 组件参数 | object | {}

### menus
参数 | 说明 | 类型 | 默认值
---|---|---|---
id | 主键 | string | -
name | 名称 | string | -
children | 子节点 | array | -
icon | antd icon type | string | -
img | 图片地址 | string | -