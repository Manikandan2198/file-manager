import React ,{Component} from 'react';
import {Button} from 'antd';
import {ArrowUpOutlined} from '@ant-design/icons'
import md5 from 'md5';
import {connect} from 'react-redux';
import Item from '../components/Items';
import Navigator from '../components/Navigator';
import SearchBar from '../components/SearchBar';
import {SearchText} from '../common/fileSystemOperations';
import { CHANGE_PATH, ROOT} from '../common/Constants';

class Main extends Component{

    state={
        selectedNodes:[],
        fileSystem:{},
        globalPath:'',
        searchText:''
    };

    static getDerivedStateFromProps(nextprops,prevstate){
        if(prevstate.fileSystem !== nextprops.fileSystem){
            if(prevstate.globalPath !== nextprops.globalPath)
                return {...prevstate,globalPath:nextprops.globalPath, fileSystem: nextprops.fileSystem};
            else    
                return {...prevstate, fileSystem: nextprops.fileSystem};
        }
        else if(prevstate.globalPath !== nextprops.globalPath)
            return {...prevstate,globalPath:nextprops.globalPath, selectedNodes:[],searchText:''}
        return {prevstate};
    }

    showPathEntries = (globalPath, fileSystem) => {
        return fileSystem[md5(globalPath)]
          ? fileSystem[md5(globalPath)].children.map(
              childrenID => fileSystem[childrenID]
            )
          : [];
      }

    onPathUp = ()=>{
        const {globalPath, changeFolder} = this.props;
        let newPath = globalPath.slice(0,globalPath.lastIndexOf('/'));
        changeFolder(newPath.slice(0,newPath.lastIndexOf('/')+1));
    }

    OnItemClick=(nodeId,e)=>{
        const {selectedNodes} = this.state;
        if(!e){
            this.setState({...this.state,selectedNodes:[nodeId]})
        }else if(e.type === 'contextmenu' && selectedNodes.length>1){
            return;
        }
        else if(e && e.ctrlKey === false){
            this.setState({...this.state,selectedNodes:[nodeId]})
        }else if(e.ctrlKey && selectedNodes.includes(nodeId)){
            let newSelectedNodes = selectedNodes.filter(item=>item !== nodeId)
            this.setState({...this.state,selectedNodes:newSelectedNodes})
        }else if(e.ctrlKey && !selectedNodes.includes(nodeId)){
            let newSelectedNodes = [...selectedNodes];
            newSelectedNodes.push(nodeId)
            this.setState({...this.state,selectedNodes:newSelectedNodes})
        }
    }

    render(){
        const {fileSystem, searchText} = this.state;
        const { globalPath} = this.props;
        const nodes = this.showPathEntries(globalPath,fileSystem);
        const searchResults = SearchText(fileSystem,md5(globalPath),searchText);
        return(
            <div className="w-75 bg-white p-2 h-100">
                <div className=" m-2 row p-2"  style={{background:'#f2f3f9'}}>
                    <div className="col-8 d-flex flex-row">
                        <Button disabled={globalPath === ROOT || searchText !== ''} onClick={this.onPathUp} type="link" icon={<ArrowUpOutlined />}></Button>
                        <Navigator isSearch={searchText !== ''}></Navigator>
                    </div>
                    <div className="col-4">
                        <SearchBar searchText={searchText} onSearchTextChange={(e)=>{this.setState({...this.setState,searchText:e.target.value})}}></SearchBar>
                    </div>
                </div>
                <div className="m-2 d-flex flex-row p-2 flex-wrap" style={{height:'90%',background:'#f2f3f9'}} onClick={()=>{this.setState({...this.state,selectedNodes:[]})}}>
                    <div className='d-flex flex-row p-2 flex-wrap' >
                        {searchText === ''? 
                            nodes.map((item,index)=>
                                <Item key={index} node={item} onClick={this.OnItemClick} selectedNodes={this.state.selectedNodes} isSelected={this.state.selectedNodes.includes(md5(item.path))} searchText={searchText}/>)
                            :(searchResults.length>0)?searchResults.map((item,index)=>
                                <Item key={index} node={item} onClick={this.OnItemClick} selectedNodes={this.state.selectedNodes} isSelected={this.state.selectedNodes.includes(md5(item.path))} searchText={searchText} />):
                                <div>{'No Result'}</div>
                            }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        fileSystem : state.fileSystem,
        globalPath : state.globalPath
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        changeFolder:(path)=>{dispatch({type:CHANGE_PATH,path})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);