import React from 'react';
import PropTypes from 'prop-types';
export default class Menu extends React.Component{
  constructor(props){
    super(props);
    this.__selectItem=this.__selectItem.bind(this)
  }
  __selectItem(name,id){
    const {addList:func}=this.props;
    func(name,id)
  }
  render(){
    const {style,dataSource}=this.props;
    const that=this;
    return  <div className="u-associatedmenu" id="j-menu" style={style}>
                <ul>
                  {
                    dataSource.map(function(item,index){
                      return   <li key={item.id} onClick={that.__selectItem.bind(that,item.name,item.id)}>
                                  <a href="javascript:void(0)">
                                    <span>{item.name}</span>
                                  </a>
                               </li>
                    })
                  }
                </ul>
            </div>
  }
}
