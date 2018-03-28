import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {formatTime, numberFixed} from '../util/index';
export default class DayPicker extends React.Component{
  constructor(props){
    super(props);
    this.state={
      week:["日","一","二","三","四","五","六"],
      initDate: "",
      currentDay:"",
      year:"",
      month:"",
      yearMonth:"",
      days:[],
      value:"",
      selectedDay:"",
      minDate:this.props.minDate,
      maxDate:this.props.maxDate
    };
    this.__addYear=this.__addYear.bind(this);
    this.__addMonth=this.__addMonth.bind(this);
    this.__evClick=this.__evClick.bind(this);
  }
  //获取当前这个月的天数
	__getDays(date = new Date(), currentDay = this.state.value){
		var self = this,
			sdata = self.state,
			_year = date.getFullYear(),
			_month = date.getMonth(),
			_monthDays = new Date(_year, _month +1, 0).getDate(),//后一个月的第0天，就是这个月的最后一天
			_firstDayIndex = self.__getFirstDayIndex(_year, _month),

			days = [];

		if( _firstDayIndex > 0){
			//上个月要补得空位
			days = days.concat(self.__getPrevMonthDays(_year, _month, _firstDayIndex));
		}
		let minDate = new Date(sdata.minDate),
			maxDate = new Date(sdata.maxDate),
			hasMinDate = false,
			hasMaxDate = false,
			minAllDisabled = false,
			maxAllDisabled = false;

		if(minDate != "Invalid Date" && minDate.getFullYear() == _year && minDate.getMonth() == _month){
			hasMinDate = true;
		}
		if(maxDate != "Invalid Date" && maxDate.getFullYear() == _year && maxDate.getMonth() == _month){
			hasMaxDate = true;
		}
		if(minDate != "Invalid Date" && (minDate.getFullYear() > _year || minDate.getFullYear() == _year && minDate.getMonth() > _month)){
			hasMinDate = true;
			minAllDisabled = true;
		}
		if(maxDate != "Invalid Date" && (maxDate.getFullYear() < _year || maxDate.getFullYear() == _year && minDate.getMonth() < _month)){
			hasMinDate = true;
			maxAllDisabled = true;
		}
		let minDay = hasMinDate ? minDate.getDate() : -1,
			maxDay = hasMaxDate ? maxDate.getDate() : 32;
		for(var i = 0; i < _monthDays; i++){
			let isDisabled = false;
			if(minAllDisabled || maxAllDisabled){
				isDisabled = true;
			}else{
				isDisabled = minDay > i || maxDay <= (i + 1);
			}
			days.push({
				disabled: isDisabled,
				isSelected: false,
				day: i + 1
			});
		}
		var selectedDate = new Date(currentDay);
		var _lastDayIndex = (_monthDays + _firstDayIndex) % 7;
		if(_lastDayIndex > 0){
			days = days.concat(self.__getNextMonthDays(_year, _month+1, 7 - _lastDayIndex));
		}
    return {
      days:days,
      year:_year,
      month:_month,
      yearMonth:_year + "-" + numberFixed(_month + 1),
      selectedDay:sdata.selectedDay ? sdata.selectedDay : selectedDate.getDate()
    }
	}
  __getFirstDayIndex(year, month){
		return new Date(year, month, 1).getDay();
	}
  __getPrevMonthDays(year, month, number){
		let days = [],
			lastDay = new Date(year, month, 0).getDate();
		for(var i = number; i > 0; i--){
			days.push({
				disabled: true,
				isSelected: false,
				day: lastDay - i + 1
			});
		}
		return days;
	}
  __getNextMonthDays(year, month, number){
		let days = [];
		for(var i = 0; i < number; i++){
			days.push({
				disabled: true,
				isSelected: false,
				day: i + 1
			});
		}
		return days;
	}
  __addYear(stepYear){
    const {year,month,value}=this.state;
    let date = new Date(year + stepYear, month, 1);
		const obj=this.__getDays(date,value);
    this.setState({
      currentDay:obj.currentDay,
      year:obj.year,
      month:obj.month,
      yearMonth:obj.yearMonth,
      days:obj.days,
      selectedDay:obj.selectedDay
    })
  }
  __addMonth(stepMonth){
    const {year,month,value}=this.state;
    let date = new Date(year, month+stepMonth, 1);
    const obj=this.__getDays(date,value);
    this.setState({
      currentDay:obj.currentDay,
      year:obj.year,
      month:obj.month,
      yearMonth:obj.yearMonth,
      days:obj.days,
      selectedDay:obj.selectedDay
    })
  }
  __evClick(day){
    const {onSelect:func}=this.props;
    const {year,month}=this.state;
    if(func)func(year,month+1,day);
    this.setState({
      selectedDay:day
    })
  }
  componentDidMount(){
    const {format,minDate,maxDate,date}=this.props;
    const {value}=this.state;
    if(date){
      var tdate=new Date(date);
    }else{
      var tdate=new Date();
    }
    let currentDay=formatTime(tdate,format||"yyyy-MM-dd");
    if(value){
       this.setState({
         value:currentDay
       })
    }
    const {year,month,yearMonth,days,selectedDay}=this.__getDays(tdate,currentDay);
    this.setState({
      currentDay,
      year,
      month,
      yearMonth,
      days,
      selectedDay,
    })
  }
  render(){
    const {week,yearMonth,days,selectedDay}=this.state;
    const that=this;
    return <div className="u-calendar {className}" >
            	<div className="calendar_hd">
            		<span className="calendar_prev">
            			<span className="calendar_item" onClick={this.__addYear.bind(this,-1)}>&lt;&lt;</span>
            			<span className="calendar_item" onClick={this.__addMonth.bind(this,-1)}>&lt;</span>
            		</span>
            		<span>{yearMonth}</span>
            		<span className="calendar_next">
            			<span className="calendar_item" onClick={this.__addMonth.bind(this,1)}>&gt;</span>
            			<span className="calendar_item" onClick={this.__addYear.bind(this,1)}>&gt;&gt;</span>
            		</span>
            	</div>
            	<div className="calendar_bd">
            		<div className="calendar_week">
            		    {
                      week.map(function(item,index){
                        return  <span className="calendar_item" key={item}>{item}</span>
                      })
                    }
            		</div>
            		<div className="calendar_days">
            	      {
                      days.map(function(item,index){
                        let newClass=""
                        let disabled=item.disabled;
                        let isSelected=(selectedDay == item.day && !item.disabled);
                        if(disabled){
                          newClass+="z-disabled"
                        }
                        if(isSelected){
                          newClass=newClass+" "+"z-selected"
                        }
                        return 	<span className={"calendar_item"+" "+newClass} key={index+'key'} onClick={that.__evClick.bind(that,item.day)}>{item.day}</span>
                      })
                    }
            		</div>
            	</div>
          </div>
  }
}
DayPicker.propTypes={
  minDate:PropTypes.string,
  maxDate:PropTypes.string,
  date:PropTypes.string,
  onSelect:PropTypes.func
}
