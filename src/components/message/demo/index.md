Message
全局提示
---
全局展示操作反馈信息。

## 如何使用
- 提供成功，警告和错误等反馈信息-
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。-


## API

<table>
    <tr>
        <th>参数</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
    </tr>
    <tr>
        <td>type</td>
        <td>信息类型</td>
        <td>string['success','error']</td>
        <td>loading</td>
    </tr>
    <tr>
        <td>content</td>
        <td>提示内容</td>
        <td>string</td>
        <td>-</td>
    </tr>
    <tr>
        <td>duration</td>
        <td>自动关闭的延时，单位毫秒</td>
        <td>number</td>
        <td>2000</td>
    </tr>
    <tr>
        <td>onClose</td>
        <td>关闭时触发的回调函数</td>
        <td>Function</td>
        <td>-</td>
    </tr>
</table>
