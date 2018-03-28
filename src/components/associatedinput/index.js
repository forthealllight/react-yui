import './index.scss'
import React from 'react';
import PropTypes from 'prop-types';
import Menu from './menu/index.js';
export default  class AssociatedInput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectList:this.props.selectList,
      mStyle:{},
      isShowMenu:false
    }
    this.__backspaceAssociate=this.__backspaceAssociate.bind(this);
    this.__deleteItem=this.__deleteItem.bind(this);
    this.__associate=this.__associate.bind(this);
    this.__onChange=this.__onChange.bind(this);
    // this.__onblur=this.__onblur.bind(this);
    this.__onfocus=this.__onfocus.bind(this);
    this.__addList=this.__addList.bind(this)
  }
  __addList(name,id){
    let newItem={
      name:name,
      id:id
    };
    const {selectList,isShowMenu}=this.state;
    selectList.push(newItem);
    this.input.value='';
    //清空input的值
    this.setState({
      selectList:selectList,
      isShowMenu:false
    })
  }
  __deleteItem(id){
    const {selectList}=this.state;
    const list=[];
    for(let i=0;i<selectList.length;i++){
      if(selectList[i].id!=id){
        list.push(selectList[i])
      }
    }
    this.setState({
      selectList:list
    })
  }
  __associate(e){
    let target=e.target,
        value=target.value,
        keycode=e.which;
    switch (keycode) {
      case 13:

        break;
      case 38:

      default:

    }
  }
  __backspaceAssociate(e){
    const {selectList}=this.state;
    let target=e.target,
        value=target.value,
        keycode=e.which;
        //get the code
    if(keycode==8){
      let len=selectList.length;
      selectList.splice(len-1,1);
      this.setState({
        selectList:selectList
      })
    }
  }
  __onfocus(){
    //每次聚焦的时候清楚input的值
    this.input.value=''
  }
  // __onblur(){
  //   this.setState({
  //     isShowMenu:!this.state.isShowMenu
  //   })
  // }
  __onChange(e){
      let rect=e.target.getBoundingClientRect();
      let btop=document.body.scrollTop;
      let bleft=document.body.scrollLeft;
      let top=btop+rect.top+rect.bottom-rect.top+'px';
      let left=rect.left;
      const mStyle={
        top:top,
        left:left
      };
      this.setState({
        mStyle:mStyle,
        isShowMenu:true
      })
  }
  render(){
    const {dataSource}=this.props;
    const {selectList,mStyle,isShowMenu}=this.state;
    const that=this;
    return  <div>
               <div  className="clearfix u-associatedInputContainer" >
                      {
                        selectList.map(function(item,index){
                           return <div className="u-selectedItem" key={item.name}>
                               			<strong>{item.name}</strong><a href="javascript: void(0)" onClick={that.__deleteItem.bind(that,item.id)}>
                               				<i className="iconfont">&#xe625;</i>
                               			</a>
                       		        </div>
                        })
                      }
                    	<div  className="u-assinput">
                    		<input type="text" placeholder=""  className="u-input" onKeyDown={this.__backspaceAssociate} onKeyDown={this.__associate} onChange={this.__onChange}
                        onBlur={this.__onblur} onFocus={this.__onfocus} ref={(input)=>this.input=input}/>
                    	   	<span className="nui-editableAddr-txt">W</span>
                    	</div>
                </div>
                {isShowMenu&&<Menu style={mStyle} dataSource={dataSource} addList={this.__addList}/>}

            </div>
  }
}
