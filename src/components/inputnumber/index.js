import './index.scss'
import React from 'react';
import PropTypes from 'prop-types';
export default class Inputnumber extends React.Component{
  constructor(props){
    super(props);
    this.state={
      value:props.value
    }
    this.__onChange=this.__onChange.bind(this);
    this.__evAdd=this.__evAdd.bind(this);
  }
  __onChange(e){
    const {onChange:func}=this.props;
    this.setState({
      value:e.target.value
    })
    if(func)func(e.target.value);
  }
  __evAdd(tag){
    let {onChange:func,step,precision}=this.props;
    if(!step){
      step=1
    }
    if(!precision){
      precision=1
    }
    if(tag){
      this.setState((preState,props)=>{
        return {
          value:parseFloat((preState.value+step).toFixed(precision))
        }
      },()=>{
          if(func)func(this.state.value);
      })
    }else{
      this.setState((preState,props)=>{
        return {
          value:parseFloat((preState.value-step).toFixed(precision))
        }
      },()=>{
        if(func)func(this.state.value)
      })
    }
  }
  render(){
    const {maxLength,onChange,newClass,disabled,showHandler}=this.props;
    const {value}=this.state;
    return <div className={"input-number"+" "+newClass}>
              {showHandler&&<div className="input-number-handler-wrap" >
                          		<span className="iconfont input-number-handler icon-select-up"
                          			onClick={this.__evAdd.bind(this,true)}></span>
                          		<span className="iconfont input-number-handler icon-select-down"
                          			onClick={this.__evAdd.bind(this,false)}></span>
            	              </div>
              }
            	<div className="input-number-input-wrap">
            		<input type="text" className="input-number-input" onChange={this.__onChange}
                 maxLength={maxLength} value={value} disabled={disabled}/>
            	</div>
           </div>
  }

}
Inputnumber.propTypes={
  min:PropTypes.number,
  max:PropTypes.number,
  newClass:PropTypes.string,
  value:PropTypes.number,
  step:PropTypes.number,
  precision:PropTypes.number,
  defaultValue:PropTypes.number,
  onChange:PropTypes.func,
  disabled:PropTypes.bool,
  showHandler:PropTypes.bool,
  maxLength:PropTypes.number
}
