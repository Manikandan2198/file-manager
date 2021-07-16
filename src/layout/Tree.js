import React ,{Component} from 'react';
import {connect} from 'react-redux';

class Tree extends Component{

    render(){
        console.log(this.props.fileSystem);
        return(
            <div className="w-25 bg-light p-2">
                
            </div>
        )
    }
}

const mapStatetoProps=(state)=>{
    return {
        fileSystem:state.fileSystem
    }
}

export default connect(mapStatetoProps,null)(Tree);