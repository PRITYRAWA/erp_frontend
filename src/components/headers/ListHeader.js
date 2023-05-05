import React, { useEffect, useState } from "react";
import { Button, Dropdown, Input, Wrapper } from "../../components";
import SearchIcon from "../../views/model_views/SearchIcon";
import SortIcon from "../../views/model_views/SortIcon";
import EyeIcon from "../../views/model_views/EyeIcon";
import "../../App.css"
import { CgSortAz } from "react-icons/cg";
import { BsQuestion } from "react-icons/bs";
import ActionButton from "../../views/model_views/ActionButton";

function ListHeader(props) {


  const [sortMode, setSortMode] = useState(false)
  const [eyeMode, setEyeMode] = useState(false)
  const [iconMode, setIconMode] = useState(false)
  const [actionMode, setactionMode] = useState()
  const [headers, setHeaders] = useState(props.headers)


  useEffect(() => {
    setHeaders(props.headers)
  }, [props.headers])



  let searchStyle = {
    height: 35,
    width: 150,
    float: 'right',
    border: '1px solid #0c7db1',
    padding: '8px'
  }

  let titleStyle = {
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 5
  }

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

  let borderStyle = {
    color: '#0c7db1',
    border: '1px solid black',
    borderRadius: '3px',
    width: "42px",
    height: "31px"


  }

  let borderStyleBack = {
    color: '#0c7db1',
    border: '1px solid black',
    borderRadius: '3px',
    width: "42px",
    height: "31px"
  }



  let hanldeChange = (event) => {
    props.searchControl(props.searchSelector, event.target.value)
  }


  let getPreviousMenu = () => {
    props.getPreviousMenu()
  }
  // let hideTheColumn = (option) => {
  // }


  let toogleSortMode = () => {
    setSortMode(!sortMode)
  }

  let toogleSearchIcon = () => {
    setIconMode(!iconMode)
  }



  let closePopup = () => {
    // setHed(props.headers)
    setEyeMode(!eyeMode)
  }

  // let notSavedata = () => {
  //   setEyeMode(!eyeMode)
  // }

  let actions = [
    'Delete',
    'Show',
    'Hide',
    "Clone"
  ];


  let SaveandClose = (options) => {
    props.saveDataToHead(options)
    setEyeMode(!eyeMode)
  }


  let toogleEyeMode = () => {
    setEyeMode(!eyeMode)
  }


  let changeView = (option) => {
    props.changeView(option)
  }


  // let saveData = (option) => {
  //   setHed(option)
  //   // props.saveData(option)
  // }


  let resetHeaders = () => {
    props.resetHeaders()
  }


  let openImport = () => {
    props.openImport()
  }


  let addRecord = () => {
    props.changeMode('add')
  }


  // let actionButton = (value) => {
  //   setactionMode(!actionMode)
  //   props.actionMode("Edit " + value.split(' ').join('_'))
  // }



  let closeList = () => {
    props.actionMode("Close")
    props.closeActionList()
    setactionMode(!actionMode)
  }


  // const handleActionComplete = () => {
  //   if (props.actionMode === "Delete") {
  //     props.handleDelete(props.data_source, props.selected)
  //   } if (props.actionMode === "Show") {
  //     props.handleShowRows()
  //   } if (props.actionMode === "Hide") {
  //     props.handleHideRows()
  //   }
  // }


  const handleActionComplete = () => {
    if (props.actionMode === "Delete") {
      props.handleDelete(props.data_source, props.selected)
    } if (props.actionMode === "Show") {
      props.handleShowRows()
    } if (props.actionMode === "Hide") {
      props.handleHideRows()
    }
    if (props.actionMode === "Clone") {
      props.handleClone()
    }

  }


  const handleActionButton = (value) => {
    if (actions.includes(value)) {
      props.setActionMode(value)
    }
  }

  // const handleActionButton = (value) => {
  //   if (value === "Delete") {
  //     props.setActionMode('Delete')
  //   } if (value === "Show") {
  //     props.setActionMode("Show")
  //   } if (value === "Hide") {
  //     props.setActionMode("Hide")
  //   }
  // }


  let saveList = (e) => {
    props.actionMode("Save")
    setactionMode(!actionMode)
    props.saveActionRows()


  }


  let reOrderLabel = 'Re-Order ' + props.listTitle;

  // let visHeaders = []

  // props.headers.map((header, indx) => {
  //   if (header.visibility == "required") {
  //     visHeaders.push(header.label)
  //   }
  // })

  return (
    <>
      {iconMode === true ?
        <SearchIcon listForm={props.listForm}
          toggleMode={toogleSearchIcon}
        ></SearchIcon> : <></>
      }
      {sortMode === true ?
        <SortIcon
          SorttoggleMode={toogleSortMode}
        ></SortIcon> : <></>
      }
      {/* {eyeMode === true ?
        <EyeIcon
          resetHeaders={resetHeaders} */}


      {eyeMode === true ?
        <EyeIcon
          resetHeaders={resetHeaders}
          defaultHeaders={props.defaultHeaders}
          viewMode={props.viewMode}
          // notSavedata={notSavedata}
          closePopup={closePopup}
          SaveandClose={SaveandClose}
          toogleEyeMode={toogleEyeMode}
          options={headers}
          data_source={props.data_source.toLowerCase()}
          // saveData={saveData}
          changeView={changeView}
        ></EyeIcon> : <></>
      }



      {/* {actionMode == true ? saveActionRows
        <ActionButton
          ClosePopup={ClosePopupAction}
          headers={headers}
          rows={props.rows}
          optionValue={action}
          headerType='Json'
          default={true}
          defaultLabel={'check'}
          visible={true} />
        : <></>} */}



      {/* {props.actionMode === "Delete" || props.actionMode === "Show" || props.actionMode === "Hide" ? */}
      {actions.includes(props.actionMode) ?

        <>
          <div className="navqwe Tick-cross">
            <Button type='button' btn='' icon='fa-sharp fa-solid fa-xmark' style={buttonStyle} value='' clickHanlder={() => { props.setActionMode() }} />
            <Button type='button' btn='' icon='fa-sharp fa-solid fa-check' style={buttonStyle} value='' clickHanlder={() => handleActionComplete()} />
          </div>
        </>

        :
        <div className="navqwe">
          <div className="space-right">
            <Button type='button' btn='' icon='fas fa-plus' style={buttonStyle} value='' clickHanlder={addRecord} />

            {/* <Button type='dropdown' btn='' icon='fas fa-gear' style={buttonStyle} value='' clickHanlder={actionButton}
              options={["Hide", "Show", "Delete"]} check={false} /> */}
            <Button type='dropdown' btn='' icon='fas fa-gear' style={buttonStyle} value='' clickHanlder={handleActionButton}
              options={actions} check={false} />
            <BsQuestion style={buttonStyle} />

            {/* <Button type='button' btn='' icon='fa fa-regular fa-bars-filter' style={buttonStyle} value='' clickHanlder={toogleSortMode} /> */}


            <Button type='button' btn='' icon='fas fa-file-import' style={buttonStyle} value='' clickHanlder={openImport} />

            <Button type='button' btn='' icon='fas fa-eye' style={buttonStyle} value='' button clickHanlder={toogleEyeMode}
              options={props.headers} check={true} />

            <CgSortAz style={buttonStyle} onClick={toogleSortMode} />


            <Button type='button' btn='' icon='fas fa-search' style={buttonStyle} value='' clickHanlder={toogleSearchIcon} />

            <Input label={'Search for ' + props.listTitle} class='formField input' type='search' style={searchStyle} onChange={hanldeChange} />
          </div>


          <div className="spacing-left">
            <div className="t123oggle">
              {props.list_info.id !== "90001" ?
                <Button btn='' icon={props.icon} style={borderStyleBack} value='' clickHanlder={() => { getPreviousMenu() }} link={true} para={props.para} /> :
                <Button btn='' icon={props.icon} style={borderStyle} value='' id="hamburgerIcon" clickHanlder={() => { props.iconHandler() }} para={props.para} />}
            </div>



            {props.list_info.id == "90001" ?
              <div className="profile">
                <h4>Conversation</h4>
                <h4>Technology</h4>
              </div> : <>

                {props.listTitle != "Home" ?
                  <label style={titleStyle}>{props.listTitle}</label> : <></>}



              </>}




          </div>
        </div>}

    </>
  );
}

export default ListHeader;