---
Pager
分页
---
全局展示操作反馈信息。

## 如何使用
- 数据过多时，切换页码来浏览数据


## API

<table>
    <thead>
        <tr>
            <th>参数</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>total</td>
            <td>数据总数</td>
            <td>number</td>
            <td>0</td>
        </tr>
        <tr>
            <td>current</td>
            <td>提示内容</td>
            <td>string</td>
            <td></td>
        </tr>
        <tr>
            <td>hasPageSize</td>
            <td>是否可以改变 pageSize</td>
            <td>boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>pageSize</td>
            <td>每页条数</td>
            <td>number</td>
            <td>-</td>
        </tr>
        <tr>
            <td>mode</td>
            <td>不同的样式</td>
            <td>number</td>
            <td>1</td>
        </tr>
        <tr>
            <td>onChange</td>
            <td>页码改变的回调，参数是对象，里面是页码和总数</td>
            <td>(json) => {}</td>
            <td>-</td>
        </tr>
        <tr>
            <td>class</td>
            <td>自定义样式</td>
            <td>string</td>
            <td>-</td>
        </tr>
    </tbody>

</table>
