import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Select from '../select/index.js';
import {formatTime, numberFixed} from '../util/index';
export default class Calendar extends React.Component{
  constructor(props){
    super(props);
    this.state={
      today:'',
      thisYear:'',
      thisMonth:'',
      yearList:[],
      monthList:[],
      dayList:[]
    };
    this.__changeYear=this.__changeYear.bind(this);
    this.__changeMonth=this.__changeMonth.bind(this);
  }
  componentDidMount(){
    let today=formatTime(new Date(), "yyyy-MM-dd"),
		    thisYear = new Date().getFullYear(),
        thisMonth=numberFixed(new Date().getMonth() + 1),
        yearList=(function(){
					let list = [];
					for(let i =  thisYear - 10; i< (thisYear + 10); i++){
						list.push({
							value: i,
							text: i
						});
					}
					return list;
				}()),
        monthList=(function(){
					let list = []
					for(let i = 1; i < 13; i++){
						list.push({
							value: numberFixed(i),
							text: numberFixed(i)
						});
					}
					return list;
				}());
    const dayList=this.__getDays();
    this.setState({
      today,
      thisYear,
      thisMonth,
      yearList,
      monthList,
      dayList
    })
  }
  __changeYear(value){
    const thisYear=value;
    const thisMonth=this.state.thisMonth;
    const dayList=this.__getDays(thisYear,thisMonth,{});
    this.setState({
      dayList
    })
  }
  __changeMonth(value){
    const thisYear=this.state.thisYear;
    const thisMonth=value;
    const dayList=this.__getDays(thisYear,thisMonth,{});
    this.setState({
      dayList
    })
  }
  __getDays(year = new Date().getFullYear(), month = new Date().getMonth() + 1, reminderMap = {}){
		var self = this,
			monthTotalDays = new Date(year, month, 0).getDate(),
			firstDayIndex = self.__getFirstDayIndex(year, month),
			prevMonthDays = [],
			days = [],
			dayList = [],
			nextMonthDayCount = 42 - monthTotalDays - firstDayIndex;


		if(firstDayIndex > 0){
			prevMonthDays = self.__getPrevMonthDays(year, month, firstDayIndex, reminderMap);
			days = days.concat(prevMonthDays);
		}
		var monthStr = numberFixed(month);
		for(var i = 0; i < monthTotalDays; i++){
			let day = numberFixed(i + 1),
				title = year + "-" + monthStr + "-" + day,
				content = reminderMap[title];//reminderMap.get(title);

			days.push({
				disabled: false,
				isSelected: false,
				day: day,
				title: title,
				classNames: content ? content.classNames: [],
				contents: content ? content.contents : []
			});
		}

		var nextMonth = month + 1,
			nextYear = year;
		if(nextMonth > 12){
			nextMonth = numberFixed(1);
			nextYear++;
		}
		for(var i = 0; i < nextMonthDayCount; i++){
			let day = numberFixed(i + 1),
				title = nextYear + "-" + nextMonth + "-" + day,
				content = reminderMap[title];//reminderMap.get(title);
			days.push({
				disabled: true,
				isSelected: false,
				day: day,
				title: title,
				classNames: content ? content.classNames: [],
				contents: content ? content.contents : []
			});
		}
		dayList.push(days.slice(0, 7));
		dayList.push(days.slice(7, 14));
		dayList.push(days.slice(14, 21));
		dayList.push(days.slice(21, 28));
		dayList.push(days.slice(28, 35));
		dayList.push(days.slice(35, 42));
	  return dayList
	}
  __getFirstDayIndex(year, month){
		return new Date(year, month - 1 , 1).getDay();
	}
  __getPrevMonthDays(year, month, number, reminderMap = {}){
		var self = this,
			days = [],
			lastDay = new Date(year, month -1, 0).getDate();
		month--;
		if(month < 1){
			year = year - 1;
			month = 12;
		}
		month = numberFixed(month);
		for(var i = number; i > 0; i--){
			let day = lastDay - i + 1,
				title = year + "-" + month + "-" + day,
				content = reminderMap[title];//reminderMap.get(title);
			days.push({
				disabled: true,
				isSelected: false,
				day: day,
				title: title,
				classNames: content ? content.classNames: [],
				contents: content ? content.contents : []
			});
		}
		return days;
	}
  render(){
    const {today,thisYear,thisMonth,yearList,monthList,dayList}=this.state;
    return <div>
            <div className="u-reminder-calendar-header">
              <Select className="calendar-select" list={yearList} onChange={this.__changeYear} value={thisYear}>
              </Select>
              <Select className="calendar-select" list={monthList} onChange={this.__changeMonth} value={thisMonth}>
              </Select>
            </div>
            <table className="u-reminder-calendar">
              <thead>
              <tr>
              <th className="reminder-calendar-header">日</th>
              <th className="reminder-calendar-header">一</th>
              <th className="reminder-calendar-header">二</th>
              <th className="reminder-calendar-header">三</th>
              <th className="reminder-calendar-header">四</th>
              <th className="reminder-calendar-header">五</th>
              <th className="reminder-calendar-header">六</th>
              </tr>
              </thead>
              <tbody>
                {
                  dayList.map(function(item,index){
                    return <tr key={index+'key'}>
                               {
                                    item.map(function(utem,undex){
                                      const iclass=utem.disabled?"notCurrentMonth":"";
                                      return <td key={utem.day} className={utem.title==today?("calendar-selected-date"+" "+iclass):iclass}>
                                                <div className="reminder-calendar-date">
                                                  <div className="reminder-calendar-value">{utem.day}</div>
                                                  <div className="reminder-calendar-icons">
                                                    {
                                                      utem.classNames.map(function(jtem,jndex){
                                                        return  <i className={jtem+"iconfont"}></i>
                                                      })
                                                    }
                                                  </div>
                                                </div>
                                            </td>
                                    })

                               }
                           </tr>
                  })
                }
              </tbody>
            </table>
          </div>
  }
}
Calendar.propTypes={
   
}
