Loading
加载情况
---
用于页面和区块的加载中状态。

## 如何使用
- 页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。
- 当加载结束后，页面没有数据后显示的状态。
- 局部页面请求出错时，错误信息提示。


## API

<table>
    <tr>
        <th>参数</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
    </tr>
    <tr>
        <td>state</td>
        <td>局部加载的状态</td>
        <td>字符串"loading"//["loading","complete","error"]</td>
        <td>loading</td>
    </tr>
    <tr>
        <td>error</td>
        <td>局部加载错误后，错误对象</td>
        <td>object//{msg: '', code: ''}</td>
        <td>-</td>
    </tr>
    <tr>
        <td>newClass</td>
        <td>自定义样式</td>
        <td>string</td>
        <td></td>
    </tr>
</table>
