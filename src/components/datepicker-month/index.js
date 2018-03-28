import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {formatTime, numberFixed} from '../util/index';
export default class MonthPicker extends React.Component{
  constructor(props){
    super(props);
    this.state={
      months:(()=>{
					let i = 1,
						arr = [],
						months = [];
					while(i < 13){
						arr.push({
							month: i,
							text: numberFixed(i)
						});
						i++;
					}
					months.push(arr.splice(0, 3));
					months.push(arr.splice(0, 3));
					months.push(arr.splice(0, 3));
					months.push(arr.splice(0, 3));
					return months;
				})(),
      selectedMonth:"",
      selectedYear:"",
      currentDay:"",
      minDate:this.props.minDate,
      maxDate:this.props.maxDate
    };
    this.__addYear=this.__addYear.bind(this);
    this.__evClick=this.__evClick.bind(this);
  }
  __evClick(month){
    const {selectedYear}=this.state;
    const {onSelect:func}=this.props;
    if(func)func(selectedYear,month);
    this.setState({
      selectedMonth:month
    })
  }
  __addYear(year){
    const {selectedYear}=this.state;
    let newYear=selectedYear+year;
    const that=this;
    this.setState({
      selectedYear:newYear
    },function(){
      that.setState({
        months:temMonths
      })
    })
		const temMonths=this.__setMinMaxDate();
  }
  __setMinMaxDate(){
		const {months}=this.state;
    const temMonths=months.slice();
    const that=this;
		temMonths.forEach((o, i)=>{
			o.forEach((m)=>{
				that.__disable(m);
			})
		});
    return temMonths
	}
  __disable(item){
		var self = this,
			sdata = self.state,
			selectedYear = sdata.selectedYear,
			minDate = sdata.minDate,
			maxDate = sdata.maxDate;

		if(minDate){
			minDate = new Date(minDate);
			var minYear = minDate.getFullYear(),
				minMonth = minDate.getMonth() + 1;
			if(minYear > selectedYear ||
				(minYear == selectedYear && minMonth >=item.month)){
				item.disabled = true;
			}else{
				item.disabled = false;
			}
		}
		if(maxDate){
			maxDate = new Date(maxDate);
			var maxYear = maxDate.getFullYear(),
				maxMonth = maxDate.getMonth() + 1;

			if(maxYear < selectedYear ||
				(maxYear == selectedYear && maxMonth <= item.month)){
				item.disabled = true;
			}else{
				item.disabled = false;
			}
		}
	}
  componentDidMount(){
    const {format,date}=this.props;
    if(date){
      var tdate=new Date(date);
    }else{
      var tdate=new Date();
    }
    this.setState({
      selectedMonth:tdate.getMonth()+1,
      selectedYear:tdate.getFullYear(),
      currentDay:formatTime(tdate, format)
    })
  }
  render(){
    const {months,date,selectedMonth,selectedYear,currentDay,minDate,maxDate}=this.state;
    const that=this;
    return <div className="u-calendar u-month-picker">
            	<div className="calendar_hd">
            		<span className="calendar_prev">
            			<span className="calendar_item" onClick={this.__addYear.bind(this,-1)}>&lt;&lt;</span>
            		</span>
            		<span>{selectedYear}</span>
            		<span className="calendar_next">
            			<span className="calendar_item" onClick={this.__addYear.bind(this,1)}>&gt;&gt;</span>
            		</span>
            	</div>
            	<div className="calendar_bd">
            		<div className="calendar_days">
            			<table className="calendar_tb">
            				<tbody>
                        {
                          months.map(function(item,index){
                            return <tr key={index+'key'}>
                                      {
                                        item.map(function(jtem,jndex){
                                           let disable=jtem.disabled;
                                           let newClass="";
                                           let selected=jtem.month==selectedMonth;
                                           if(disable){
                                             newClass+="z-disabled"
                                           }
                                           if(selected){
                                             newClass=newClass+" "+"z-selected"
                                           }
                                           return <td key={jtem.text} onClick={that.__evClick.bind(that,jtem.month)}>
                             									     <span className={"calendar_item"+" "+newClass}>{jtem.text}</span>
                             							        </td>
                                        })
                                      }
                  					      </tr>
                          })
                        }
            				</tbody>
            			</table>
            		</div>
            	</div>
           </div>
  }
}
MonthPicker.propTypes={
  minDate:PropTypes.string,
  maxDate:PropTypes.string,
  date:PropTypes.string,
  onSelect:PropTypes.func
}
