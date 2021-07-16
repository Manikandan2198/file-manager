import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal,message as AntdMessage } from 'antd';
import md5 from 'md5';

const getDate = () => {
    let d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return `${[year, month, day].join('-')}${' '}${d.getHours()}${':'}${d.getMinutes()}`;
  };

class RenameDialog extends Component {

    state = {
        nodeName: "New Folder"
    }

    componentDidMount(){
        this.setState({...this.state,nodeName:this.props.node.name});
    }

    // static getDerivedStateFromProps(nextProps,prevState){
    //     console.log(prevState.nodeName);
    //     console.log(nextProps.nodeName);
    //     if(nextProps.nodeName !== prevState.nodeName){
    //         return {...prevState,nodeName: nextProps.nodeName}
    //     }
    //     return {...prevState};
    // }
    onOk = () => {
        const {globalPath, renameEntry, node} = this.props;
        if(this.state.nodeName === ''){
            AntdMessage.error('Name cannot be empty');
        }else{
            let newEntry={...node};
            newEntry.name=this.state.nodeName;
            newEntry.path=`${globalPath}${newEntry.name}${'/'}`;
            newEntry.date=getDate();
            renameEntry(node,newEntry);
            this.props.onCancel();
        }
        
    }
    render() {

        return (
            <Modal title='Rename' width='200px' visible={this.props.visible} onCancel={this.props.onCancel} onOk={this.onOk}>
                <input type='text' value={this.state.nodeName} onChange={(e) => { this.setState({...this.state,nodeName:e.target.value}) }}></input>
            </Modal>
        )

    }
}

const mapStateToProps=(state)=>{
    return {
        globalPath : state.globalPath
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        addEntry:(entry)=>{dispatch({type:"ADD_ENTRY",entry})},
        renameEntry:(oldEntry,newEntry)=>{dispatch({type:"RENAME_ENTRY",oldEntry,newEntry})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RenameDialog);