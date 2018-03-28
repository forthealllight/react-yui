import React from 'react';
import PropTypes from 'prop-types';
export default class Leaf extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:this.props.list,
    }
    this.__evShowChildren=this.__evShowChildren.bind(this);
  }
  __evSelectItem(id){
    const {onSelect:func}=this.props;
    func(id);
  }
  __evShowChildren(id){
    const {list}=this.state;
    const tlist=list.map(function(item,index){
       if(item.id==id){
         item.showChildren=!item.showChildren
       }
       return item
    });
    this.setState({
      list:tlist
    })
  }
  render(){
    const {isShow,selectId}=this.props;
    const {list}=this.state;
    var that=this;
    return <ul className={(isShow?"tree-show":"tree-hide")+" "+"roleTree_list"}>
              {
                list.map(function(item,index){
                   let iclass=item.showChildren?"icon-arrow-down":"icon-arrow-right";
                   if(!(item.hasChildren || item.children && item.children.length)){
                     var istyle={
                       display:'none'
                     }
                   }
                   if(!item.showLoading){
                     var lstyle={
                       display:'none'
                     }
                   }
                   return <li key={item.name}>
                       			<div className="tree_item">
                       				<i className={iclass+" "+"iconfont u-arrow"} style={istyle} onClick={that.__evShowChildren.bind(that,item.id)}></i>
                       				<div className={(selectId==item.id?"select_item":"")+" "+"tree_name"}
                       					onClick={that.__evSelectItem.bind(that,item.id)}>
                       					<i className="iconfont icon-loading" style={lstyle}></i>
                       					<a href="javascript:void(0)" className="tree_name_link"><span>{item.name}</span></a>
                       					<div>
                                    {that.props.children}
                       					</div>
                       				</div>
                       			</div>
                            {
                              item.children.length>0&&item.children&&<Leaf list={item.children} isShow={item.showChildren} selectId={selectId} onSelect={that.props.onSelect}/>
                            }

               		        </li>
                      })
                    }
               </ul>
  }
}
Leaf.propTypes={
  isShow:PropTypes.bool,
  selectId:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  list:PropTypes.array
}
