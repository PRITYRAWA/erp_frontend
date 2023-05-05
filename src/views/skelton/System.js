import React, { createContext, useEffect, useState, useSyncExternalStore } from "react";
import { connect } from 'react-redux';
import { Card, Wrapper, Input, Label, FormHeader, Table, ListHeader, TableHeader, Modal, Dropdown } from '../../components'
import FormView from "../entities/FormView";
import ListView from "../entities/ListView";
import { getImportData, getListForm, } from '../../actions/system'
import { updateRecord, saveRecord } from "../../actions/app"
import { getListRows, getSortListRows } from '../../actions/app'
import { AiFillCodeSandboxCircle } from "react-icons/ai";
import { BASE_URL } from "../../config/api";
import axios from 'axios'
import {
  HEADERS
} from "../../config/appHeaders";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";



function System(props) {
  const [formMode, setFormMode] = useState('list');
  const [listRows, setListRows] = useState([])
  const [listForm, setListForm] = useState({})
  const [rowData, setRowData] = useState({})
  const [header, setHeaders] = useState(props.list_info.columns)
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchData, setSearchData] = useState()
  const [nextPageData, setNextPageData] = useState([])
  const [pageData, setPageData] = useState([])
  const [actionMode, setActionMode] = useState()
  const [showOrHide, setShowOrHide] = useState([])
  const [tempPageData, setTempPageData] = useState([])
  const [loading, setLoading] = useState()
  const [tableActionMode, setTableActionMode] = useState()
  // const [selectedRows , setSelectedRows] = useState({
  //   actionMode:'',
  //   ids : []
  // })




  const navigate = useNavigate()
  if (props.list_info.data_source == null) {
    props.list_info.data_source = props.list_info.label
  }


  let data_source = (props?.list_info?.data_source)?.split(" ")?.join("")?.toLowerCase()


  // ----------- UseEffect to get the listrows and set them to the local state of the component ----------- //

  useEffect(() => {
    if (props.list_info.data_source != null || props.list_info.data_source != undefined || props.list_info.data_source != "") {
      // props.getListRows(data_source, '/').then(() => { })
      props.getListRows(data_source, '/').then(() => { })
      if (sessionStorage.getItem(data_source) == null || sessionStorage.getItem(data_source).length == 0 || sessionStorage.getItem(data_source).length == undefined) {
        sessionStorage.setItem(data_source, JSON.stringify(props.list_info?.columns))
      }
      setHeaders(props.list_info.columns)
    }
    if (props.list_info.id != null && props.list_info.id != undefined)
      props.getListForm(`/?list=${props.list_info.id}`).then(() => { })
    setFormMode('list')
  }, [props.list_info.id])

  let columns = JSON.parse(sessionStorage.getItem(data_source))
  // --------- Function to handle the selection of rows ----------- // 

  // const handleRowSelect = (id) => {
  //   if(actionMode == "Delete" || actionMode === undefined){
  //     const index = selectedIds.indexOf(id);
  //     if (index === -1) {
  //       // add the ID to the selected IDs array
  //       setSelectedIds([...selectedIds, id]);
  //     } else {
  //       // remove the ID from the selected IDs array
  //       const updatedIds = [...selectedIds];
  //       updatedIds.splice(index, 1);
  //       setSelectedIds(updatedIds);
  //     }
  //   }
  //   if(actionMode === "Show" || actionMode === "Hide"){
  //     const index = showOrHide.indexOf(id);
  //     if (index === -1) {
  //       // add the ID to the selected IDs array
  //       setShowOrHide([...showOrHide, id]);
  //     } else {
  //       // remove the ID from the selected IDs array
  //       const updatedIds = [...showOrHide];
  //       updatedIds.splice(index, 1);
  //       setShowOrHide(updatedIds);
  //     }
  //   }

  // };



  const handleRowSelect = (id) => {
    if (actionMode == "Delete" || actionMode === undefined || actionMode === "Clone") {
      const index = selectedIds.indexOf(id);
      if (index === -1) {
        // add the ID to the selected IDs array
        setSelectedIds([...selectedIds, id]);
      } else {
        // remove the ID from the selected IDs array
        const updatedIds = [...selectedIds];
        updatedIds.splice(index, 1);
        setSelectedIds(updatedIds);
      }
    }
    if (actionMode === "Show" || actionMode === "Hide") {
      const index = showOrHide.indexOf(id);
      if (index === -1) {
        // add the ID to the selected IDs array
        setShowOrHide([...showOrHide, id]);
      } else {
        // remove the ID from the selected IDs array
        const updatedIds = [...showOrHide];
        updatedIds.splice(index, 1);
        setShowOrHide(updatedIds);
      }
    }


  };



  // if (listRows.results !== undefined || listRows.results.length!== null) {
  // if (listRows.length >= 0) {
  //   let abc = [...listRows, props.listRows]

  //   sessionStorage.setItem(`${data_source}-rows`, JSON.stringify([...listRows, props.listRows]))

  // }



  // useEffect(() => {
  //   if (sessionStorage.getItem(data_source) == null || sessionStorage.getItem(data_source).length == 0) {
  //     sessionStorage.setItem(data_source, JSON.stringify(props.list_info.columns))
  //   }
  //   setHeaders(props.list_info.columns)
  // }, [props.list_info.columns])



  // useEffect(() => {
  //   if (props.list_info.id === 90023) {
  //     setListRows(dataObj)
  //   }
  //   else {

  //     setListRows(props.listRows)
  //   }
  // }, [props.listRows])

  //  ------------ Handles pagination sets the new data that comes after reaching the bottom of the table ----------- //
  useEffect(() => {
    if (props.listRows.results !== undefined) {
      setListRows(props.listRows)
      setPageData(props.listRows.results)
      setTempPageData(props.listRows.results)
    }
  }, [props.listRows])



  // -------------- Sets the form related to the list that we opened ----------------- //
  useEffect(() => {
    if (props.listForm.length != 0)
      setListForm(props?.listForm?.results[0]?.form)
  }, [props.listForm])

  // useEffect(() => {
  //   if ((props.listForm).length > 0)
  //     setListForm(props.listForm[0].form)
  // }, [props.listForm])



  // useEffect(() => {
  //   if (props.listForm !== null && (props.listForm).length > 0) {
  //     setListForm(FilterTheForm[0].form)
  //   }
  // }, [props.listForm])


  // useEffect(() => {
  //   if ((props.listForm).length > 0)
  //     setListForm(props.listForm[0].form)
  // }, [props.listForm])




  // ------------- Function to Handle the search input ---------------- //

  let searchControl = (field, value) => {
    async function rowsFetch(rows_filter) {
      if (value == '') {
        rows_filter = '/'
      }
      // props.getListRows(data_source, rows_filter).then(() => { })
      let data = await axios.get(`${BASE_URL}/${data_source}${rows_filter}`, { headers: HEADERS.AUTHENTIC() })
      if (value.length !== 0) {
        setSearchData(data.data.results)
      }
      else {
        setSearchData()
      }
    }
    rowsFetch('/?' + field + '=' + value)
  }


  let changeMode = (mode) => {
    if (mode === 'save') {
      setFormMode("view")
    }
    else if (mode == "list") {
      navigate(`/views/${data_source}`)
      setFormMode(mode)
    }
    else {
      // navigate(`/views/${data_source}`)
      setFormMode(mode)
    }
  }


  let loadFormData = (recordID) => {
    let record = pageData.find(row => row.id === recordID);
    if (record != undefined) {
      // navigate(`${props.listForm.results[0].form.id}/${recordID}`)
      setRowData(record)
    }
    // else {
    //   alert('No Matching Record Found')
    // }
  }

  const updateFormRecord = (update) => {
    props.updateRecord(data_source, update).then(() => {
      axios.get(`${BASE_URL}/${data_source}/${update.id}/`, { headers: HEADERS.AUTHENTIC() }).then((res) => {
        pageData.map((value, index) => {
          if (value.id == update.id) {
            pageData.splice(index, 1, res.data)
          }
        })
      })
      setPageData(pageData)
      setTempPageData(pageData)
    })
    changeMode("save")
  }


  const handleShowRows = () => {
    if (showOrHide.length > 0) {
      setTempPageData(pageData.filter(item => showOrHide.includes(item.id)))
      setActionMode()
      setTableActionMode('Show')
    } else {
      setTempPageData(pageData)
      setActionMode()
      setTableActionMode()
    }
  }

  const handleHideRows = () => {
    if (showOrHide.length > 0) {
      setTempPageData(pageData.filter(item => !showOrHide.includes(item.id)))
      setActionMode()
      setTableActionMode('Hide')
    } else {
      setTempPageData(pageData)
      setActionMode()
      setTableActionMode()
    }

  }

  // const handleShowRows = ()=>{
  //   if(selectedIds !== null && selectedIds !== undefined){
  //     setSelectedRows(prevState => ({...prevState , actionMode : actionMode ,ids : [...new Set([...prevState.ids , ...selectedIds])]}))
  //     setPageData(tempPageData.filter(item=>selectedRows.ids.includes(item.id)))
  //     setActionMode()
  //     setSelectedIds([])
  //   }else{
  //     setActionMode()
  //   }
  //   if(selectedRows.ids === null && selectedRows.ids === undefined && selectedRows.actionMode !== ''){
  //       setSelectedRows(prevState =>({...prevState , actionMode : ''}))
  //       setPageData(tempPageData)
  //   }
  //   //  if(selectedRows.ids !== null && selectedRows.ids !== undefined){
  //   //    setPageData(pageData.filter(item => selectedRows.ids.includes(item.id))) 
  //   //  }
  // }



  const handleClone = async () => {


    let cloneSelectedData = pageData.filter((id, index) => {
      return id.id === selectedIds[index]
    })

    //API to BE added



  }



  const saveFormData = (formData) => {
    props.saveRecord(data_source, formData).then(() => { })
    props.getListRows(data_source, "/").then(() => { })
    changeMode("list")
  }

  const handleDelete = (api_name, id) => {
    let apiName = api_name.split(" ").join("").toLowerCase()
    if (id.length < 1) {
      alert("Select a record to delete")
    }
    if (id.length > 1) {
      alert("Only 1 record can be deleted at once")
    }
    else {
      const deleteRecord = async () => {
        await axios.delete(`${BASE_URL}/${apiName}/${id}/`, { headers: HEADERS.AUTHENTIC() }).then((res) => {
          if (res.status == 204) {
            props.getListRows(data_source, '/').then(() => { })
            if (props.listForm) {
              setActionMode()
            }
            return alert("Record Deleted Successfully")
          }
          setSelectedIds([])
        }).catch((err) => console.log(err.message))
      }
      deleteRecord()
    }
  }


  let getPreviousMenu = () => {
    props.getPreviousMenu()
  }

  function getListfromDashboard(record) {
    props.getListfromDashboard(record)
  }

  let importData = (import_path, file, mapObject) => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("sequences", JSON.stringify(mapObject))
    props.getImportData(import_path, formData).then(() => {
      alert('Data Import Operation Completed')
      props.getListRows(data_source, '/').then(() => { })
    })
  }

  let getPaginationData = async (pageNo) => {
    if (pageNo.next !== null) {
      if (props.list_info.data_source != null || props.list_info.data_source != undefined || props.list_info.data_source != "") {
        let data = await axios.get(`${pageNo.next}`, { headers: HEADERS.AUTHENTIC() })
        setNextPageData(data.data.results)
        setListRows(data.data)
      }
    }
  }

  useEffect(() => {
    setPageData(Array.from(new Set([...pageData, ...nextPageData])))
    setTempPageData(Array.from(new Set([...tempPageData, ...nextPageData])))
  }, [nextPageData])


  return (
    <>
      <Wrapper>
        {formMode === 'list' ?
          <ListView
            handleClone={handleClone}
            searchData={searchData}
            getListRows={props.getListRows}
            pageData={pageData}
            tempPageData={tempPageData}
            getPaginationData={getPaginationData}
            getListfromDashboard={getListfromDashboard}
            para={props.para}
            title={props.list_info.label}
            getPreviousMenu={getPreviousMenu}
            menuToggle={props.menuToggle}
            searchControl={searchControl}
            changeMode={changeMode}
            formMode={formMode}
            handleDelete={handleDelete}
            loadFormData={loadFormData}
            defaultHeaders={props.list_info.columns}
            headers={columns}
            data_source={props.list_info.data_source}
            list_info={props.list_info}
            importData={importData}
            rows={listRows}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            handleRowSelect={handleRowSelect}
            loading={loading}
            actionMode={actionMode}
            setActionMode={setActionMode}
            showOrHide={showOrHide}
            tableActionMode={tableActionMode}
            handleShowRows={handleShowRows}
            handleHideRows={handleHideRows}
            setShowOrHide={setShowOrHide}
          />
          :
          formMode === 'edit' || formMode === 'view' ?
            <Wrapper>
              {listForm?.id != null && listForm?.id != undefined && props.list_info.label !== "Home" ?
                <FormView recordID={rowData.id}
                  data_source={props.list_info.data_source}
                  icon={rowData.icon}
                  form_id={listForm?.id}
                  loadFormData={loadFormData}
                  dataObj={rowData}
                  formMode={formMode}
                  changeMode={changeMode}
                  saveRecord={saveFormData}
                  rows={pageData}
                  lists={[]}
                  updateRecord={updateFormRecord}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                /> :
                <></>}
              <></>
            </Wrapper> :
            formMode === 'add' ?
              <Wrapper>
                <FormView recordID={''}
                  icon={props.list_info.icon}
                  data_source={props.list_info.data_source}
                  form_id={listForm?.id} //props.list_info.form.id
                  loadFormData={loadFormData}
                  dataObj={{}}
                  formMode={formMode}
                  changeMode={changeMode}
                  saveRecord={saveFormData}
                  rows={pageData}
                  lists={[]}
                  updateRecord={updateFormRecord}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                /><></>
              </Wrapper> :
              <></>}
        <></>
      </Wrapper>
    </>
  );
}



const mapStateToProps = state => {
  return {
    list_items: state.sysData.list_items,
    column_items: state.sysData.column_items,
    importData: state.sysData.importData,
    listRows: state.appData.listRows,
    listRowData: state.appData.listRowData,
    listForm: state.sysData.listForm,
    pendingReq: state.appData.pendingReq
  };
};


const mapDispatchToProps = {
  getImportData, getListRows, getListForm, updateRecord, saveRecord
}

export default connect(mapStateToProps, mapDispatchToProps)(System);
