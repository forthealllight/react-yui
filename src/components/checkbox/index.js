import './index.scss'
import React from 'react';
import PropTypes from 'prop-types';
export default class Checkbox extends React.Component{
  constructor(props){
    super(props);
    this.onChange=this.onChange.bind(this);
  }
  onChange(e){
    const {onChange:func}=this.props;
    if(func!=undefined)func(e.target.value);
  }
  render(){
     const {text,checked,isReadOnly,newClass}=this.props;
     return <label className="u-checkbox-label" >
         	    <input type="checkbox" className={"u-checkbox"+" "+newClass} onChange={this.onChange} defaultChecked={checked} disabled={isReadOnly}/>
         	    <span className="iconfont u-imitate-checkbox" ></span>
         	    <span>{text}</span>
            </label>
  }
}
Checkbox.propTypes={
  checked:PropTypes.bool,
  onChange:PropTypes.func,
  isReadOnly:PropTypes.bool,
  text:PropTypes.string,
  newClass:PropTypes.string
}
