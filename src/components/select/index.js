import './index.scss'
import React from 'react';
import PropTypes from 'prop-types';
export default class Select extends React.Component{
  constructor(props){
    super(props);
    this.state={
      classTag:0,
      isShow:false,
      selectedValue:'',
      dtyle:{}
    }
    this.__evToogleDropdown=this.__evToogleDropdown.bind(this);
    this.__selected=this.__selected.bind(this);
  }
  __evToogleDropdown(e){
    const {isShow} = this.state;
    if(!isShow){
      this.__showDropdown();
    }else{
      this.__hideDropdown();
    }
    const rect=e.target.getBoundingClientRect();
    let top=rect.top+rect.height+'px';
    let left=rect.left-8+'px';
    let width=rect.width+20+'px';
    this.setState({
      dtyle:{
        top,
        left,
        width
      }
    });
  }
  __showDropdown(){
    //
    this.setState({
        classTag:1,
        isShow:true
    });
  }
  __hideDropdown(){
    this.setState({
        classTag:0,
        isShow:false
    });
  }
  __selected(value,e){
    this.setState({
        selectedValue:value
    });
    this.__hideDropdown();
    const {onChange:func}=this.props;
    if(func!=undefined)func(value);
  }
  render(){
    const {classTag,selectedValue,dtyle}=this.state;
    const {list,newClass,placeholder,value}=this.props;
    let dropdownName=classTag==1?'slide-up-enter slide-up-enter-active':'m-select-dropdown-hidden'
    const that=this;
    return <span>
              <div className="m-component-select" onClick={this.__evToogleDropdown}>
                    <div className="m-select-section">
                      <div className="select-section__render">
                        <div className="select-section-selected-value">{selectedValue||value||"请选择"}</div>
                      </div>
                      <span className="select-arrow iconfont icon-select-down"></span>
                    </div>
                </div>
                <div className={dropdownName+" "+"m-component-select-dropdown"} style={dtyle}>
                  <div>
                    <ul className="m-component-select-dropdown-menu" ref={(ul)=>{this.dropdown=ul}}>
                       {
                         list.map(function(item,index){
                           return <li  key={item.text} onClick={that.__selected.bind(that,item.value)}>{item.text}</li>
                         })
                       }
                    </ul>
                  </div>
              </div>
          </span>
  }

}
Select.propTypes={
  newClass:PropTypes.string,
  placeholder:PropTypes.string,
  value:PropTypes.string,
  list:PropTypes.array,
  onChange:PropTypes.func
}
