import './index.scss'
import React from 'react';
import PropTypes from 'prop-types';
export default class Loading extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const {statement,newClass,error}=this.props;
    return  <div>
              {statement=='loading'||!statement&&
                <div  className={"u-tipBox"+" "+newClass}>
                  <i className="iconfont icon-loading1">
                </i><br/></div>
              }
              {statement=='error'&&
                <div  className={"u-tipBox"+" "+newClass} >
            		 出错啦!<br /> {'['+error.code+']'}{error.msg}
            	  </div>
              }
            	{statement=='complete'&&
                <div  className={"u-tipBox"+" "+newClass} >
            		  <i className="iconfont">&#xe626;</i>
            		  <br />
            		  没有数据
               </div>
              }
            </div>
  }
}
Loading.propTypes={
  state:PropTypes.oneOf(["loading","complete","error"]),
  error:PropTypes.object,
  newClass:PropTypes.string
}
