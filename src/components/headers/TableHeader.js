import React, { useState, useRef } from "react";
import { Icon } from "..";
import Wrapper from "../wrappers/Wrapper";
import CustomButton from "./../fields/CustomButton";
import { MdPlayArrow } from 'react-icons/md'
import { Button, Input } from "../../components/index"
import { CgSortAz } from "react-icons/cg";
import { BsQuestion } from "react-icons/bs";


function TableHeader(props) {

  let iconStyleRel = {
    padding: 2,
    marginLeft: 3,
    marginRight: 3,
    width: 50,
    color: '#0c7db1',
    border: '1px solid black',
    borderRadius: '3px'
  }

  const buttonRef = useRef(null)


  // let buttonStyle = {
  //   // padding: 20,
  //   width: 30,
  //   color: 'rgb(12, 125, 177)'

  // }

  let changeStatus = () => {
    props.setVisible(!props.visible)
  }

  let icon = props.headerIcon == undefined ? 'fas fa-address-card' : props.headerIcon

  let title = (props.title).toUpperCase()



  let buttonStyle = {
    padding: 4,
    marginLeft: 4,
    marginRight: 3,
    width: 40,
    height: 35,
    // float: 'right',
    border: '1px solid #0c7db1',
    borderRadius: '3px',
    color: '#0c7db1'
  }


  let collapseList = () => {
    props.collapseList()
    if (props.collapse == true) {
      buttonRef.current.style.transform = "rotate(0.25turn)";
    }
    else {
      buttonRef.current.style.transform = "rotate(1turn)";
    }

  }

  let searchStyle = {
    height: 35,
    width: 150,
    float: 'right',
    border: '1px solid #0c7db1',
    padding: '8px'
  }

  let actions = [
    'Delete',
    'Show',
    'Hide',
    "Clone"
  ];

  return (
    <Wrapper class='relHeader'>
      <div className="flexTable-form" style={{


        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"



      }}>
        <div className="lable-form">
          <label style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold' }} >{title}</label>
        </div>

        <div className="tableHedaer-Buttons" style={{
          "align-items": "center",
          "display": "flex",
        }}>


          {/* <Button btn='' icon='fas fa-plus fa-1x' style={iconStyleRel} clickHanlder={() => { props.toggleExportMode() }} /> */}
          {props.collapse == false ?
            <div className="space-right">
              <Button type='button' btn='' icon='fas fa-plus' style={buttonStyle} value='' />
              <Button type='dropdown' btn='' icon='fas fa-gear' style={buttonStyle} value=''
                options={actions} check={false} />
              <BsQuestion style={buttonStyle} />
              <Button type='button' btn='' icon='fas fa-eye' style={buttonStyle} value='' button
                options={props.headers} check={true} clickHanlder={props.eyeModeVisible} />
              <CgSortAz style={buttonStyle} />
              <Button type='button' btn='' icon='fas fa-search' style={buttonStyle} value='' />
              <Input label={'Search for ' + props.listTitle} class='formField input' type='search' style={searchStyle} />
            </div> : <></>}
            
          <div className="IconColapse">
            <button style={buttonStyle} onClick={collapseList} ><i ref={buttonRef} className={'fa-solid fa-play'} /></button>
          </div>
        </div>
      </div>


      {/* {props.tableMode === 'add' || props.tableMode === 'edit' ?
        <Icon icon='fas fa-plus fa-xl' style={buttonStyle} clickHanlder={() => { props.toggleAddMode() }} /> :
        <></>} */}
      <hr style={{ height: 2, marginTop: 10, color: 'gray', backgroundColor: 'gray' }} />

    </Wrapper>
  );
}

export default TableHeader;