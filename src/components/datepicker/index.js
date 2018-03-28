import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';
import MonthPicker from '../datepicker-month/index.js';
import DayPicker from '../datepicker-day/index.js';
import {formatTime, numberFixed} from '../util/index';
export default class DatePicker extends React.Component{
   constructor(props){
     super(props);
     this.state={
       show:false,
       value:""
     };
     this.__evClick=this.__evClick.bind(this);
     this.__evSelect=this.__evSelect.bind(this);
     this.__evSelectMonth=this.__evSelectMonth.bind(this);
   }
   __evClick(){
     const {show}=this.state;
     this.setState({
       show:!show
     })
   }
   __evSelect(year,month,day){
     const {format}=this.props;
     let current=year+"-"+month+"-"+day;
     let date=new Date(current);
     let value=formatTime(date,format);
     this.setState({
       value:value,
       show:false
     })
   }
   __evSelectMonth(year,month){
     const {format,mode}=this.props;
     let current=year+"-"+month;
     let date=new Date(current);
     if(mode=='month'){
       var temformat=format.substr(0, format.indexOf("d") - 1)
     }
     let value=formatTime(date, temformat);
     this.setState({
       value:value,
       show:false
     })
   }
   componentDidMount(){
     const {format,mode,date}=this.props;
     if(mode=='month'){
       var temformat=format.substr(0, format.indexOf("d") - 1)
     }else{
       var temformat=format;
     }
     if(date){
       var tdate=new Date(date);
     }else{
       var tdate=new Date();
     }
     let value=formatTime(tdate, temformat);
     this.setState({value})
   }
   render(){
     const {show,value}=this.state;
     const {mode,minDate,maxDate}=this.props;
     return <div className="u-datepicker" >
              	<div className="datepicker-header">
              		<input type="text" placeholder="请选择日期"  className="datepicker-input" onClick={this.__evClick} value={value}/>
              		 <i className="iconfont icon-calendar calendarIcon" ></i>
              	</div>
              	{
                  show&&<div className="datepicker_bd">
                          {
                           mode=="day"?<DayPicker onSelect={this.__evSelect} date={value} minDate={minDate} maxDate={maxDate}/>
                            :
                           <MonthPicker onSelect={this.__evSelectMonth} date={value} minDate={minDate} maxDate={maxDate}/>
                          }
                      	</div>
                }
           </div>
   }
}
DatePicker.propTypes={
  minDate:PropTypes.string,
  maxDate:PropTypes.string,
  date:PropTypes.string,
  mode:PropTypes.oneOf(['day', 'month']),
  format:PropTypes.oneOf(['yyyy-MM-dd', 'yyyy-mm']),
  onSelect:PropTypes.func
}
