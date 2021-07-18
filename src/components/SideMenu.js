import React, { Component, Fragment } from "react";
import {connect} from 'react-redux';
import MenuItems from '../components/MenuItems';

class SideMenu extends Component {
  state =
    {
      fileStructure: null,
      visible: false,
    }
  static getDerivedStateFromProps(props) {
    return {
      fileStructure: props.fileStructure
    };
  }
  onmenuClick=(entry)=>{
      console.log(entry.path);
      const {changeFolder} = this.props;
      changeFolder(entry.path)
  }
  

  render() {
    const { fileStructure } = this.state;
    console.log(fileStructure);
    return (
      <div style={{overflow:'auto',height:'90%',width:'100%',background:'#f2f3f9'}} className='m-2 p-2'>
        <div onClick={()=>{this.props.changeFolder('root/')}} style={{cursor:'pointer'}}><h4 className='text-primary'>{'root /'} </h4></div>
        {fileStructure.children.map(element=>{
          return <MenuItems node = {element} childVisible={true}></MenuItems>
        })}
      </div>
    );

  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    changeFolder:(path)=>{dispatch({type:"CHANGE_PATH",path})}
  }
}
export default connect(null,mapDispatchToProps)(SideMenu)