import Tooltip from './components/tooltip/index.js';
class Compote extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isShowTool:false,
      arrowDirction:'',
      toolTarget:null
    };
    this.__onMouseOver=this.__onMouseOver.bind(this);
    this.__onMouseOut=this.__onMouseOut.bind(this);
  }
  __show(target){
     this.setState({
       isShowTool:true,
       toolTarget:target
     })
  }
  __hide(){
    this.setState({
      isShowTool:false
    })
  }
  __onMouseOver(e){
    this.__show(e.target);
  }
  __onMouseOut(){
    this.__hide();
  }
  render(){
    const {isShowTool,arrowDirction,toolTarget}=this.state;
    return <div className="m-compote" onMouseOver={this.__onMouseOver} onMouseOut={this.__onMouseOut}> 
             <Tooltip isShowTool={isShowTool} placement={'bottom'} toolTarget={toolTarget} content={12345}/>
           </div>
  }
}
