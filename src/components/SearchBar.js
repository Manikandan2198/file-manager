import React,{Component } from 'react';
import {connect} from 'react-redux';
import {Input } from 'antd';

class SearchBar extends Component{
    state={
        searchText:''
    }
    static getDerivedStateFromProps(nextProps,prevState){
        return {...prevState,searchText:nextProps.searchText};
    }
    render(){
        const {Search} = Input;
        const {fileSystem} = this.props;
        const nodeList = Object.keys(fileSystem).map(entryId=>fileSystem[entryId]);
        console.log(nodeList);
        return (
            <Search value = {this.state.searchText} placeholder='Search' onChange={this.props.onSearchTextChange}>
            </Search>
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
        changeFolder:(path)=>{dispatch({type:"CHANGE_PATH",path})}
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SearchBar);