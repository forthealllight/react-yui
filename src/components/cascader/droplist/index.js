import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';
export default class DropList extends React.Component{
  constructor(props){
    super(props);
    this.__evClick=this.__evClick.bind(this);
  }
  __evClick(id,value){
   const {selectItem:func}=this.props;
   func(id,value);
  }
  render(){
    const {style,dropList,selectItem}=this.props;
    const that=this;
    return <div className="select-list-wrap" style={style}>
            	<ul className="select-list">
                {
              		 dropList.map(function(item,index){
                      return 	<li className="select-result-item" key={item.id} onClick={that.__evClick.bind(that,item.id,item.value)}>
                        				<div className="select-result-label" >
                        					  {item.value}
                        				</div>
                  		       	</li>
                   })
                }
            	</ul>
          </div>
  }
}
DropList.propTypes={
  style:PropTypes.object,
  selectItem:PropTypes.func,
  dropList:PropTypes.array
}
