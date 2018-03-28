import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';
import DropList from './droplist/index.js';
export default class Cascader extends React.Component{
  constructor(props){
    super(props);
    this.state={
      dropTop:{
        top:'28px',
        display:'none'
      },
      currentIndex:0,
      selectedList:this.props.selectedList
    }
    this.__evClick=this.__evClick.bind(this);
    this.__selectItem=this.__selectItem.bind(this);
  }
  __selectItem(id,value){
    const arr=id.split('-');
    const {selectedList}=this.state;
    selectedList[arr.length-2]={
      id:id,
      value:value
    }
    this.setState({
      dropTop:{
        display:'none'
      },
      selectedList:selectedList
    })
  }
  __evClick(index,e){
    const rect=e.target.getBoundingClientRect();
    let left=rect.left;
    let top=rect.top+rect.height;
    this.setState({
      dropTop:{
        top:top+'px',
        left:left+'px',
        display:'block'
      },
      currentIndex:index
    })
  }
  render(){
    const {selectedList,list}=this.props;
    const {dropTop,currentIndex}=this.state;
    const currentList=list[currentIndex];
    const that=this;
    return <div>
             {
                selectedList.map(function(item,index){
                  return  <div className="select-drop" key={item.id}>
                            <div className="select-hd" onClick={that.__evClick.bind(that,index)}>
                              <span className="select-text">
                                 {item.value||"请选择"}
                              </span>
                            </div>
                          </div>
                })
              }
              <DropList style={dropTop} dropList={currentList} selectItem={this.__selectItem}/>
           </div>
  }
}
Cascader.propTypes={
  selectedList:PropTypes.array,
  list:PropTypes.array
}
