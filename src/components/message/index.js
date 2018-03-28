import './index.scss'
import React from 'react';
import PropTypes from 'prop-types';
export default class Message extends React.Component{
  constructor(props){
    super(props);
    this.state={
      wrapClass:this.props.type=='success'?1:0,
      iconClass:this.props.type=='success'?1:0,
      isRender:true
    }
    this.__evClose=this.__evClose.bind(this);
  }
  componentDidMount(){
    const {duration}=this.props;
    this.timer=setTimeout(this.__evClose,duration);
  }
  componentWillMount(){
    clearTimeout(this.timer);
  }
  __evClose(){
    const {onClose:func}=this.props;
    if(func)func();
    this.setState({
      isRender:false
    })
  }
  render(){
    const {wrapClass,iconClass,isRender,content}=this.state;
    return isRender ?
            <div  className={wrapClass==1?'u-success-tip'+' '+'m-tip-wrap':'u-error-tip'+' '+'m-tip-wrap'} >
            	<span className={iconClass==1?'tip_success'+' '+'iconfont':'tip_error'+' '+'iconfont'}></span>
              {this.props.content}
            	<a href="javascript:void(0)" className="iconfont tip_close" onClick={this.__evClose}></a>
            </div>
            : null
  }
}
Message.propTypes={
  type:PropTypes.oneOf(['success', 'error']),
  content:PropTypes.string,
  duration:PropTypes.number,
  onClose:PropTypes.func
}
