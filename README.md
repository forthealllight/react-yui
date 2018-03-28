## react-yui ##
是一个简易的React组件库，包含了常用的Select、CheckBox、
InputNumber、DatePicker等等。

## 安装 ##

    npm install -s react-yui

## 使用 ##

    import React from 'react'
    import {DatePicker} from 'react-yui'
    class Demo extends from React.Component{
       render(){
         return <DatePicker format={"yyyy-MM-dd"} mode={"day"}
         date={"2012-12-12"} onSelect={function(x){console.log(x)}}/>
       }
    }


## 示例 ##

react-yui在每一个组件的源代码中都提供了示例，可以查看

    ./src/components/datePicker/demo

文件夹下的index.md查看配置项，以及code.md查看如果使用的示例。

## 应用举例 ##】

 1. 关联选择
 
![关联选择][1]


  
 2. 日历选项
 
![日历][2]


  
3. 日期选项

![日期][3]


  [1]: https://github.com/forthealllight/react-yui/blob/master/images/associate.gif
  [2]: https://github.com/forthealllight/react-yui/blob/master/images/canlendar.gif
  [3]: https://github.com/forthealllight/react-yui/blob/master/images/dateDay.gif
