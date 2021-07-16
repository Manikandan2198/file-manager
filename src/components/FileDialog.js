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

class FileDialog extends Component {

    state = {
        selectedFile : null
    }

    onOk = () => {
        const {globalPath, addEntry} = this.props;
        if(this.state.selectedFile === null){
            AntdMessage.error("No file choosen")
        }else{
            let newEntry = {
                type:'file',
                name:this.state.selectedFile.name,
                size:this.state.selectedFile.size,
                date:getDate(),
                path:`${globalPath}${this.state.selectedFile.name}`,
                parentID:md5(globalPath),
                parentPath:globalPath,
                children:[],
                file:this.state.selectedFile
            }
            addEntry(newEntry);
            this.props.onCancel();
        }

    }
    render() {

        return (
            <Modal title='File Upload' width='300px' visible={this.props.visible} onCancel={this.props.onCancel} onOk={this.onOk}>
                <input type='file'  onChange={(e) => { this.setState({...this.state,selectedFile:e.target.files[0]}) }}></input>
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
        addEntry:(entry)=>{dispatch({type:"ADD_ENTRY",entry})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FileDialog);