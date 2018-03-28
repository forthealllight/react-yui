import './index.scss'
import React from 'react';
import PropTypes from 'prop-types';
export default class Pager extends React.Component{
  constructor(props){
    super(props);
    this.state={
      modeClass:this.props.mode==1?'mode1':'mode2',
      size:this.props.pageSize,
      current:this.props.current
    }
    this.__changePageSize=this.__changePageSize.bind(this);
    this.__nav=this.__nav.bind(this);
  }
  __changePageSize(e){
    const value=e.target.value;
    this.setState({
      size:value
    })
  }
  __nav(id){
    const {onChange:func}=this.props;
    if(func)func(id);
    this.setState({
      current:id
    })
  }
  render(){
    const {hasPageSize,total}=this.props;
    let {size,current}=this.state;
    const totalArray=new Array(total);
    totalArray.fill(1);
    let count=3;
    let show=Math.floor(count/2);
    let {modeClass}=this.state;
    const that=this;
    return <div className={"m-page"+" "+modeClass}>
            	<a href="javascript: void(0)" className="prevPage" className={current==1?'disabled':''}></a>
               {
                 (total-5)>show*2 &&
                 <span>
                   <a href="javascript:void(0)" className={current==1?'current':''}>1</a>
               			<a href="javascript:void(0)"><i>...</i></a>
               			<a href="javascript:void(0)" >1</a>
               			<a href="javascript:void(0)"><i>...</i></a>
               		 <a href="javascript:void(0)" className={current==total?'current':''}></a>
                 </span>
               }

                {totalArray.map(function(item,index){
                  return <a href="javascript:void(0)" key={index+'x'} className={current==index?'current':''} onClick={that.__nav.bind(that,index)}>{index}</a>
                })}
            	<a href="javascript: void(0)" className="nextPage" className={current==total?'disabled':''}></a>
              {hasPageSize&&
            		<select value={size} onChange={this.__changePageSize}>
            			<option value="20">20</option>
            			<option value="50">50</option>
            			<option value="100">100</option>
            		</select>
              }
           </div>
  }
}
Pager.propTypes={
  total:PropTypes.number||string,
  current:PropTypes.number||string,
  pageSize:PropTypes.number,
  mode:PropTypes.oneOf([1, 2]),
  onChange:PropTypes.func,
  hasPageSize:PropTypes.bool
}
