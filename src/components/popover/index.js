import './index.scss'
import React from 'react';
import PropTypes from 'prop-types';
export defalut class Popover extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    constructor(props){
      super(props);
      this.state={
        classTag:this.props.isShowTool?1:0,
        arrowClass:'',
        uStyle:{}
      }
    }
    componentWillReceiveProps(nextProps){
      const {isShowTool,toolTarget,placement}=nextProps;
      const location=getLocation(this.tooltip,toolTarget,placement,true);
      if(isShowTool){
        this.setState({
          classTag:1,
          uStyle:{
            top:location.top+'px',
            left:location.left+'px'
          }
        })
      }else{
        this.setState({
          classTag:0,
        })
      }
    }
    render(){
      const {classTag}=this.state;
      let tooltipClass=classTag==1?'zoom-big-enter zoom-big-enter-active':'u-tooltip-hidden';
      const {placement,content}=this.props;
      return <div className={"u-tooltip"+" "+tooltipClass} ref={(tooltip)=>{this.tooltip=tooltip}}>
                <div className="u-tooltip-content">
                  <div className={"u-tooltip-arrow"+" "+"arrow-"+placement}></div>
                  <div className="u-tooltip-inner">
                      {this.props.children}
                  </div>
                </div>
             </div>
    }
  }
}
Popover.propTypes={
  placement:PropTypes.oneOf(['top', 'bottom','left','right']),
  content:PropTypes.string,
  isShowTool:PropTypes.bool
}
