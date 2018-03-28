import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Leaf from './leaf.js';
export default class Tree extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectId:this.props.selectId
    }
    this.onSelect=this.onSelect.bind(this);
  }
  onSelect(id){
    const {onSelect:func}=this.props;
    if(func)func(id);
    this.setState({
      selectId:id
    })
  }
  render(){
    const {multiple,list}=this.props;
    const {selectId}=this.state;
    return  <div className={multiple?"m-multitreeview"+" "+"m-role-tree":"m-role-tree"}>
                  <Leaf list={list} isShow={true} onSelect={this.onSelect} selectId={selectId}></Leaf>
            </div>
  }
}
//<checkboxLeaf ></checkboxLeaf>
//<leaf></leaf>
Tree.propTypes={
  multiple:PropTypes.bool,
  selectId:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  list:PropTypes.array,
  onSelect:PropTypes.func
}
