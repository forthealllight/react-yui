---
Select
下拉框
---
鼠标移入元素，弹出气泡式的卡片浮层。

## 如何使用
- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器
- 为了好看


## API

<table>
    <tr>
        <th>参数</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
    </tr>
    <tr>
        <td>value</td>
        <td>指定当前选中的条目</td>
        <td>string</td>
        <td>-</td>
    </tr>
    <tr>
        <td>onChange</td>
        <td>被选中时调用，参数为选中项的 value (或 key) 值</td>
        <td>function(value)</td>
        <td>-</td>
    </tr>
    <tr>
        <td>newClass</td>
        <td>自定义样式</td>
        <td>string</td>
        <td></td>
    </tr>
    <tr>
        <td>placeholder</td>
        <td>选择框默认文字</td>
        <td>string</td>
        <td>'请选择'</td>
    </tr>
    <tr>
        <td>disabled</td>
        <td>是否禁用</td>
        <td>boolean</td>
        <td>false</td>
    </tr>
</table>
