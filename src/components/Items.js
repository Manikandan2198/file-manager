import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'md5'

class Item extends Component {

    onDoubleClick = ()=>{
        const {node, changeFolder,globalPath} = this.props;
        console.log(`${globalPath}${node.name}${'/'}`)
        console.log(md5(`${globalPath}${node.name}${'/'}`));
        changeFolder(`${globalPath}${node.name}${'/'}`)
    }
    render() {
        const {node} = this.props;
        console.log(node)
        return (
            <div onDoubleClick={this.onDoubleClick} style = {{height:100,width:100}} className='p-2 text-center'>
                {node.type === 'folder' ? <img  src="./src/styles/images/folder.png" /> : <img  src="./src/styles/images/file.png" />}
                <div className="text-center">{node.name}</div>
            </div>

           
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        changeFolder:(path)=>{dispatch({type:"CHANGE_PATH",path})}
    }
}

const mapStateToProps=(state)=>{
    return {
        globalPath : state.globalPath
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Item);