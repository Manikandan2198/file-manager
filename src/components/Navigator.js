import React, { Component } from 'react';
import {connect} from 'react-redux';
import { CHANGE_PATH} from '../common/Constants';

class Navigator extends Component{
    onPathClick=(item)=>{
        const {changeFolder} = this.props;
        changeFolder(item.targetPath);
    }
    render(){
        const {globalPath} = this.props;
        const makeList = ()=>{
            let initialPath = '';
            let pathList = globalPath.slice(0,globalPath.lastIndexOf('/')).split('/').map(path=>{
                let targetPath = `${initialPath}${path}${'/'}`;
                initialPath = targetPath;
                return {text:path,targetPath}
            });
            return pathList;
        }
        return(
            <div className='d-flex flex-row p-1'>{ this.props.isSearch?<div>{'Showing search results...'}</div>:
                makeList().map((item,index)=>(
                <div key={index} className='d-flex flex-row' onClick={()=>this.onPathClick(item)}>
                    <div className='px-1 font-weight-bold '><u style={{cursor:"pointer"}}>{item.text}</u></div>
                    <div className='px-1 font-weight-bold '>{'/'}</div>
                </div>
            ))}</div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        globalPath : state.globalPath
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        changeFolder:(path)=>{dispatch({type:CHANGE_PATH,path})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigator)