import { useState, useEffect } from 'react'
import '../../styles/components/Table.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { HEADERS } from '../../config/appHeaders'
import Loader from '../Loader/Loader'
import { Input } from '..'


function Table(props) {



  let colorOptions = { 'normal': 'lightblue', 'urgent': 'red', 'warning': 'yellow', 'no': 'black', "done": "green" }


  const [rowValue, setRowValue] = useState({})
  const [rows, setRows] = useState(props.pageData)
  const [sort, setSort] = useState("")
  const [headChecked , setHeadChecked] = useState(false)
  const [actionHeadChecked , setActionHeadChecked] = useState(false)
  const [tempRows , setTempRows] = useState()

  let getItems = JSON.parse(sessionStorage.getItem(props.data_source))

  const [headers, setHeaders] = useState(getItems != undefined ? getItems.filter(header => header.visibility == 'required' || header.visibility == 'default') : [])


  const style =
  {
    position: "sticky",
    width: "100%",
    top: "0px",
    "zIndex": "1",
    "backgroundColor": "#f1f1f1"
  }



  const handleCheckboxChange = (data) => {
    props.handleRowSelect(data);
  };




  useEffect(() => {
      setRows(props.pageData)
      setTempRows((props.tempPageData))
  }, [props.pageData, props.actionMode])



  useEffect(() => {
    if (getItems != undefined) {
      setHeaders(getItems.filter(header => header.visibility == 'required' || header.visibility == 'default'))
    }
  }, [sessionStorage.getItem(props.data_source)])


 

 
  let SortHeading = (field) => {

      if (sort == "" || sort == "ASC") {
  const sorted = [...rows].sort((a, b) =>
   a[field]?.toLowerCase() > b[field]?.toLowerCase() ? 1 : -1
)
  setRows(sorted)
  setTempRows(sorted)
  setSort("DSC")
   }
   if (sort == "DSC") {
   const sorted = [...rows].sort((a, b) =>
 a[field]?.toLowerCase() < b[field]?.toLowerCase() ? 1 : -1
      )
   setRows(sorted)
  setTempRows(sorted)
   setSort("ASC")
      }
  }

//  --------------- Handle Check all rows ---------------- //
  const CheckAll = () => {

    if(props.actionMode === "Delete" || props.actionMode === undefined){
    const newHeadChecked = !headChecked;
    setHeadChecked(newHeadChecked);
      if (newHeadChecked) {
        props.setSelectedIds(rows.map(item => item.id));
      }
      else {
        props.setSelectedIds([]);
      }
    }
    if(props.actionMode === "Show" || props.actionMode === "Hide"){
      const newActionHeadChecked = !actionHeadChecked
      setActionHeadChecked(newActionHeadChecked)
      if (newActionHeadChecked) {
        props.setShowOrHide(rows.map(item => item.id));
      }
      else {
        props.setShowOrHide([]);
      }
    }
  };


// ------------- Opens the form when a record is clicked ----------------- //
  let viewRecord = (record) => {
    if (props.data_source !== "hometiles" && props.data_source !== "home tiles" && props.data_source !== undefined) {
      props.changeMode('view')
      loadRecord(record)
    }
    else {
      props.openList(record.list.id)
    }
  }


  let loadRecord = (record) => {
    props.loadFormData(record.id)
  }

  let pushRow = (row) => {
    props.pushRow(row)
    setRowValue({})
  }

  let changeHandler = (event, name) => {
    const { value } = event.target;
    setRowValue(rowValue => ({ ...rowValue, [name]: value }))
  }
  let TableHead = []
  let tableHeaders = headers.length  != 0 ?
    headers.map((header, idx) => {
      header.position =idx + 1

      let heading = header
      if (props.headerType === 'Json') {
        heading = header ? ((header.label).charAt(0)).toUpperCase() + ((header.label).slice(1)).replace('_', ' ') : <></>
      }
      return (
        <>
          < th key={idx} style={{userSelect : "none"}} className={"table-header"} onClick={() => { SortHeading(header.field) }}>
            {heading}
          </th >
        </>
      )
    }) : <></>

  let statusHeader = props.status === true ?
    (<th className={"table-header"}>
      Status
    </th>) :
    <></>
  let defaultLabel =
    <input type='checkbox' name="checkAll" onChange={() => { CheckAll() }} style={{ marginLeft: 10 }} checked = {props.actionMode === "Delete" || props.actionMode === undefined ? headChecked : actionHeadChecked} />
  let defaultHeaders =
    props.default === true ?
      (<th className={"table-header"} onClick={() => { }}>
        <label>
          <>
            {defaultLabel}
            <span className='checkSpan'></span>
          </>
        </label>
      </th>) :
      <></>


  const handleRowClick = (data)=>{
       handleCheckboxChange(data)
      }
      
      // ------------ Table Rows to be displayed ------------- //
      
      let actionTableRows = rows !== undefined && props.actionMode === "Show" || "Hide" ?
      rows?.length > 0 ?
     rows?.map((data, idx) => {
        data.list_id = props.list_info.id
        return (
          <>
            < tr className='table-row' id={`table-row-${idx}`}
              onDoubleClick={() => { viewRecord(data) }} 
              // ------- Function to allow row selection when row is clicked instead of checkbox -------- //
              // onClick={()=>handleRowClick(data.id)}
              //------------------------------------------------------------------------------------------//
              >

              <td key={'check' + idx} >
                     <label>
                          <input 
                                type='checkbox' 
                                // checked={props.actionMode === "Delete" || props.actionMode === undefined ?  props.selectedIds.includes(data.id) : props.showOrHide.includes(data.id) }
                                checked={props.showOrHide.includes(data.id) }
                                onChange={()=>handleCheckboxChange(data.id)}
                                style={{ marginLeft: 10 , }}
                          />
                          <span className='checkSpan' ></span>
                     </label>
              </td>


              {headers.map((header, indx) => {
                let dataMap = "";
                if (header.field && header.field.length > 0) {
                  let sepIndex = (header.field).indexOf('.')
                  dataMap = data[header.field]
                  if (sepIndex !== -1) {
                    dataMap = data[(header.field).substring(0, sepIndex)]
                    if (dataMap != null)
                    dataMap = dataMap[(header.field).substring(sepIndex + 1, header.field.length)]
                  }
                }
                return (
                  <>
                    <td key={'row-' + indx} >
                      {header.field == "flag" ?
                        <img src={dataMap} alt="" /> :
                        dataMap}
                    </td>
                  </>)
              })}
              {props.status === true ?
                <td key={'status-' + idx}  >
                  <i className='fas fa-circle' style={{ 'color': colorOptions[data['status']], paddingLeft: 20 }} />
                </td> : <></>}
            </tr >

          </>
        )
      }) : <></> :
      <></>
  
    
     let tableRows = tempRows !== undefined ?
      tempRows?.length > 0 ?
      tempRows?.map((data, idx) => {
        data.list_id = props.list_info.id
        return (
          <>
              < tr className='table-row' id={`table-row-${idx}`}>
                <td key={'check' + idx} >
                       <label>
                            <input 
                                  type='checkbox' 
                                  checked={props.selectedIds.includes(data.id)}
                                  onChange={()=>handleCheckboxChange(data.id)}
                                  style={{ marginLeft: 10 , }}
                                  />
                            <span className='checkSpan' ></span>
                       </label>
                </td>
                {headers.map((header, indx) => {
                  let dataMap = "";
                  if (header.field && header.field.length > 0) {
                    let sepIndex = (header.field).indexOf('.')
                    dataMap = data[header.field]
                    if (sepIndex !== -1) {
                      dataMap = data[(header.field).substring(0, sepIndex)]
                      if (dataMap != null)
                        dataMap = dataMap[(header.field).substring(sepIndex + 1, header.field.length)]
                      }
                    }
                  return (
                    <>
                      <td key={'row-' + indx} onDoubleClick={() => { viewRecord(data) }}>
                        {header.field == "flag" ?
                          <img src={dataMap} alt="" /> :
                          dataMap}
                      </td>
                    </>)
                })}
                {props.status === true ?
                  <td key={'status-' + idx} onDoubleClick={() => { viewRecord(data) }} >
                    <i className='fas fa-circle' style={{ 'color': colorOptions[data['status']], paddingLeft: 20 }} />
                  </td> : <></>}
              </tr >
  
            </>
          )
        }) : <></> :
        <></>



  let searchedRows = props.searchData !== undefined ?
    props.searchData.length > 0 ?
      props.searchData.map((data, idx) => {
        data.list_id = props.list_info.id
        return (
          <>
            < tr className='table-row' id={`table-row-${idx}`}
              onDoubleClick={() => { viewRecord(data) }} >
              <td key={'check' + idx} >
                <label>
                  <input 
                  type='checkbox' 
                  checked = {props.selected}
                  onChange={()=>handleCheckboxChange(data.id)}
                  style={{ marginLeft: 10 }}
                  selected = {props.selectedIds.includes(rows.id)}
                  setSelected = {props.setSelected}
                  />
                  <span className='checkSpan' ></span>
                </label>
              </td>


              {headers.map((header, indx) => {
                let dataMap = "";
                if (header.field && header.field.length > 0) {
                  let sepIndex = (header.field).indexOf('.')
                  dataMap = data[header.field]
                  if (sepIndex !== -1) {
                    dataMap = data[(header.field).substring(0, sepIndex)]
                    if (dataMap != null)
                      dataMap = dataMap[(header.field).substring(sepIndex + 1, header.field.length)]
                  }
                }

                return (
                  <>
                    <td key={'row-' + indx}>
                      {/* <Link to={data.id}> */}
                      {header.field == "flag" ?
                        <img src={dataMap} alt="" /> :
                        dataMap}
                      {/* </Link> */}
                    </td>
                  </>)
              })}
              {props.status === true ?
                <td key={'status-' + idx}>
                  <i className='fas fa-circle' style={{ 'color': colorOptions[data['status']], paddingLeft: 20 }} />
                </td> : <></>}
            </tr >

          </>
        )
      }) : <></> : <></>
  let fetchMoreData = async () => {
    props.getPaginationData(props.rows)
  }


  let emptyRows = props.addMode === true ?
    <tr className='table-row' key={'add'} style={{ cursor: 'pointer' }}>
      {props.default === true ?
        <td key=''>
          {/* <input type='checkbox' style={{ marginLeft: 20 }} /> */}
        </td> : <></>}
      {headers.map((header, indx) => {

        return <td key={indx} style={{ paddingLeft: 10 }} onClick={() => { }} >
          <input type='text' value={rowValue[header.column]} onChange={(event) => { changeHandler(event, header.column) }} /></td>
      })}
      <i className='fas fa-check fa-2x' style={{ paddingTop: 3 }} onClick={() => { pushRow(rowValue) }} />
      <i className='fas fa-close fa-2x' style={{ paddingLeft: 10, paddingTop: 3 }} onClick={() => { props.removeRow() }} />
    </tr> : <></>


  return (
    <>
      {
        props.visible === true ?
          <table id="table-data" >
            <thead id="T-head" style={style} >
              <tr id="Tbale-tabel">
                {defaultHeaders}
                {tableHeaders}
                {statusHeader}
              </tr>
            </thead>
            <tbody id="tableBody">
              <InfiniteScroll
                dataLength={props.rows.results == undefined ? 30 : rows.length}
                next={props.tableActionMode !== "Show" ?fetchMoreData : ()=>{}}
                hasMore={props.rows.next != null ? true : false}
                loader={props.showOrHide.length < 1 && props.tableActionMode !== "Show"  ? <h4><center>Loading...</center></h4> : <></>}
                scrollableTarget="tableBody"
              >
                {props.actionMode === "Show" || props.actionMode === "Hide"? actionTableRows : tableRows }
                {/* {props.searchData == undefined ? tableRows : searchedRows} */}
              </InfiniteScroll>
              {emptyRows}
            </tbody>
          </table> :
          <></>
      }
    </>
  );



  // let selector = (row) => {
  //   return row.field

  // }


  // const [checkbox1, setCheckbox1] = useState([]);

  // const showLogs2 = (e) => {
  //   setCheckbox1(e);
  // };

  // dataTable.columns.map((value) => {
  //   value.name = value.field
  //   value.selector = selector(value)
  //   value.sortable = true
  // })


  // dataTable.rows.map((value) => {
  // })
  // const columnsOne = [
  //   {
  //     name: "Customer",
  //     selector: row => row.name
  //   },
  //   {
  //     name: "Id",
  //     selector: row => row.name

  //   }
  // ]





  // return (
  //   <>
  //     <div className="data" name
  //       onDoubleClick={(e) => { viewRecord(e) }}>
  //       <DataTable columns={dataTable.columns}
  //         data={dataTable.rows}
  //         selectableRows
  //         fixedHeader
  //         // selectableRowSelected={rowSelectCritera}
  //         pagination />
  //     </div>


  //     {/* <MDBDataTableV5
  //       hover
  //       entriesOptions={[5, 20, 25]}
  //       entries={5}
  //       pagesAmount={4}
  //       data={dataTable}
  //       // checkbox
  //       headCheckboxID='id6'
  //       bodyCheckboxID='checkboxes6'
  //       getValueCheckBox={(e) => {
  //         showLogs2(e);
  //       }}
  //       getValueAllCheckBoxes={(e) => {
  //         showLogs2(e);
  //       }}
  //       multipleCheckboxes
  //     /> */}


  //     {/* 
  //     {checkbox1 && (
  //       <p>
  //         {JSON.stringify(
  //           checkbox1.map((e) => {
  //             delete e.checkbox;
  //             return e;
  //           }) && checkbox1
  //         )}
  //       </p>
  //     )} */}


  //   </>
  // );

}

export default Table;













// import { useState, useEffect } from 'react'
// import '../../styles/components/Table.css'
// import InfiniteScroll from 'react-infinite-scroll-component'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { HEADERS } from '../../config/appHeaders'
// import Loader from '../Loader/Loader'
// import { Input } from '..'

// // import "mdbreact/dist/css/mdb.css";
// // import "@fortawesome/fontawesome-free/css/all.min.css";
// // import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// // import "@fortawesome/fontawesome-free/css/all.min.css";
// // import "bootstrap-css-only/css/bootstrap.min.css";




// function Table(props) {
//   const navigate = useNavigate()


//   // var One = window.getComputedStyle(document.getElementById("table-data"), null);
//   // One.getPropertyValue("height");

//   // table.scrollHeight



//   // let colorOptions = { '0': 'green', '1': 'red', '2': 'yellow', 'no': 'black' }
//   let colorOptions = { 'normal': 'lightblue', 'urgent': 'red', 'warning': 'yellow', 'no': 'black', "done": "green" }

//   //  normal -skyblue ,warning--yelow ,urgent--red, done--green


//   const [rowValue, setRowValue] = useState({})
//   const [allChecked, setAllChecked] = useState(false)
//   const [isCheck, setIsCheck] = useState(false)
//   const [rows, setRows] = useState(props.pageData)
//   const [sessionRows, setSessionRows] = useState()
//   const [sort, setSort] = useState("")
//   const [PrevIndex, SetPrevIndex] = useState()



//   // useEffect(()=>{
//   //   if(props.formMode === "view" || props.formMode === ""){
//   //     setCheckedState(new Array(props.rows.length).fill(false))
//   //   }
//   //    setCheckedState(new Array(props.rows.length).fill(false))
//   // },[props.rows])


//   //Show select
//   // const [hiddenRows, setHiddenRows] = useState([])
//   // const [shownRows, setShownRows] = useState([])

//   // useEffect(()=>
//   // {
//   //   let newset= new Set(rows)
//   //   // setRows(Array.from(newset))
//   // },[rows])

//   let getItems = JSON.parse(sessionStorage.getItem(props.data_source))
//   const [headers, setHeaders] = useState(getItems != undefined ? getItems.filter(header => header.visibility == 'required') : [])




//   // let getRows = JSON.parse(sessionStorage.getItem(`${props.data_source}-rows`))
//   // if (sessionRows !== undefined)
//   //   setSessionRows([...sessionRows, getRows.results])

//   // let rowsToBeHide = props.actionRows.length !== 0 ?
//   //   props.actionRows.filter((value) => {
//   //     return value.checked == false
//   //     // return value.actionMode == "Hide"
//   //   }) : <></>



//   // let rowsToBeShow = props.actionRows.length !== 0 ?
//   //   props.actionRows.filter((value) => {

//   //     return value.checked

//   //     // return value.actionMode == "Show"
//   //   }) : <></>




//   // if (rowsToBeShow.length !== undefined) {

//   //   setShownRows(rowsToBeShow)
//   // }


//   //Show select
//   // useEffect(() => {
//   //   if (rowsToBeHide.length !== undefined || rowsToBeHide.length >= 0) {
//   //     setHiddenRows(rowsToBeHide)
//   //     // sessionStorage.setItem("rowsToBeHide", JSON.stringify(rowsToBeHide))
//   //   }
//   // }, [rowsToBeHide.length])



//   // useEffect(() => {
//   //   if (rowsToBeShow.length !== undefined || rowsToBeShow.length >= 0) {
//   //     setShownRows(rowsToBeShow)
//   //   }
//   // }, [rowsToBeShow.length])

//   //for sticky Head

//   const style =
//   {
//     position: "sticky",
//     width: "100%",
//     top: "0px",
//     "zIndex": "1",
//     "backgroundColor": "#f1f1f1"
//   }







//   useEffect(() => {

//     // let sortedData = Array.from(new Set([...rows, ...props.pageData]))

//     // let sorted = sortedData.filter((value) => {
//     //   return !value.list
//     // })

//     // setRows(sorted)


//     // setRows(prev => {
//     //   return Array.from(new Set([...prev, ...props.pageData]))
//     // })
//     setRows(props.pageData)

//   }, [props.pageData,])














//   // let abc = Array.from(new Set(rows))



//   // if (rows != undefined) {
//   //   let abc = []
//   //   abc.push(rows)
//   //   abc.push(...props.rows.results)
//   //   let setOne = new Set(rows)
//   //   let dataCash = Array.from(setOne)

//   // }
//   // // let dataCheckone = [...rows, ...props.rows.results]



//   useEffect(() => {
//     if (getItems != undefined) {
//       setHeaders(getItems.filter(header => header.visibility == 'required' || header.visibility == 'default'))
//     }
//   }, [sessionStorage.getItem(props.data_source)])
//   // let hey = () => {
//   // }
//   // useEffect(() => {
//   //   let tableBody=document.getElementById("")
//   //   window.addEventListener("scroll", hey)
//   // }, [])

//   //Selection of row with the change of background colour
  
//   // let selectRow = (index) => {
//   //   let allElements = Array.from(document.body.getElementsByClassName("table-row"))
//   //   allElements[index].classList.add("Selected-row");

//   //   if (PrevIndex !== undefined) {
//   //     allElements[PrevIndex].classList.remove("Selected-row")
//   //   }
//   //   //Storing the previous Index value 
//   //   SetPrevIndex(index)

//   // }

//   // const handleCheck = (e, data, idx) => {
//   //   let updatedCheckedState
//   //   if (props.selected === undefined) {
//   //     updatedCheckedState = props.checkedState.map((item, indx) =>
//   //       indx === idx ? !item : item
//   //     )
//   //     props.setCheckedState(updatedCheckedState)
//   //     props.handleSelect({ data, idx })
//   //   } else if (props.selected.data === data) {
//   //     updatedCheckedState = props.checkedState.map((item, index) =>
//   //       index === idx ? !item : item
//   //     )
//   //     props.setCheckedState(updatedCheckedState)
//   //     props.handleSelect()
//   //   } else {
//   //     updatedCheckedState = props.checkedState.map((item, index) => {
//   //       if (index === idx || index === props.selected.idx) {
//   //         return !item
//   //       } else {
//   //         return item
//   //       }
//   //     }
//   //     )
//   //     props.setCheckedState(updatedCheckedState)
//   //     props.handleSelect({ data, idx })
//   //   }
//   // }


//   const handleCheck = (e, data, idx) => {
//   }





//   let SortHeading = (field, order, sequence) => {

//     if (sort == "" || sort == "ASC") {
//       const sorted = [...rows].sort((a, b) =>

//         a[field]?.toLowerCase() > b[field]?.toLowerCase() ? 1 : -1

//       )
//       setRows(sorted)
//       setSort("DSC")
//     }



//     if (sort == "DSC") {
//       const sorted = [...rows].sort((a, b) =>
//         a[field]?.toLowerCase() < b[field]?.toLowerCase() ? 1 : -1
//       )
//       setRows(sorted)
//       setSort("ASC")
//     }

//   }


//   const CheckAll = () => {
//     setIsCheck(!isCheck)
//     setAllChecked(!allChecked)
//     rows.map((value) => {
//       value.checked = allChecked
//     })
//   }








//   //Show select
//   // const handleSelectOne = (event, data) => {

//   //   if (event.target.checked == true) {
//   //     data.checked = true
//   //     data.show = 1
//   //     data.hide = 0

//   //   }
//   //   else {
//   //     data.show = 0
//   //     data.hide = 1

//   //     data.checked = false
//   //   }




//   //   setSelected([...selected, data])
//   //   props.collectDataFromTable([...selected, data])


//   //   setIsCheck(true)
//   // }

//   let viewRecord = (record) => {
//     if (props.data_source !== "hometiles" && props.data_source !== "home tiles" && props.data_source !== undefined) {
//       props.changeMode('view')
//       loadRecord(record)
//       // navigate(`/${record.id}/`)
//       // navigate(`${props.form_id.id}/${record.id}`)
//       // navigate(`${props.form_id?.results[0]?.form.id}/${record.id}`)



//     }

//     else {
//       props.openList(record.list.id)
//     }
//   }

//   let loadRecord = (record) => {
//     props.loadFormData(record.id)
//   }

//   let pushRow = (row) => {
//     props.pushRow(row)
//     setRowValue({})
//   }

//   let changeHandler = (event, name) => {
//     const { value } = event.target;
//     setRowValue(rowValue => ({ ...rowValue, [name]: value }))
//   }

//   let TableHead = []
//   let tableHeaders = props.headers != undefined ?
//     headers.map((header, idx) => {

//       let heading = header
//       if (props.headerType === 'Json') {
//         heading = header ? ((header.label).charAt(0)).toUpperCase() + ((header.label).slice(1)).replace('_', ' ') : <></>
//       }



//       // TableHead[idx] = heading

//       return (
//         <>
//           < th key={idx} className={"table-header"} onClick={() => { SortHeading(header.field) }}>
//             {/* {sort == "ASC" ?
//               <i class="fa-solid fa-sort-up"></i> :
//               <i class="fa-solid fa-sort-down"></i>} */}
//             {heading}
//           </th >
//         </>
//       )
//     }) : <></>

//   let statusHeader = props.status === true ?
//     (<th className={"table-header"}>
//       Status
//     </th>) :
//     <></>
//   let defaultLabel =
//     <input type='checkbox' name="checkAll" onChange={() => { CheckAll() }} style={{ marginLeft: 10 }} defaultChecked={allChecked} />
//   let defaultHeaders =
//     props.default === true ?
//       (<th className={"table-header"} onClick={() => { }}>
//         <label>
//           {/* {props.actionMode !== undefined && props.actionMode?.includes("Edit ") ? */}
//           <>
//             {defaultLabel}
//             <span className='checkSpan'></span>

//           </>
//           {/* : <></>} */}

//         </label>
//       </th>) :
//       <></>
//   // let dataShown = []
//   // let dataHide = []
//   if (rows != undefined) {



//   }


//   // dataShown = props.rows.filter((map) => {
//   //   return map.actionMode == "Show"
//   // })


//   // dataHide = props.rows.filter((map) => {
//   //   return map.actionMode == "Hide"
//   // })


//   // let abc = []
//   // let xyz = []

//   let tableRows = rows !== undefined ?
//     rows?.length > 0 ?
//       rows?.map((data, idx) => {
//         data.list_id = props.list_info.id

//         // data.actionMode = props.actionMode?.split("_")[0]
//         return (
//           <>
//             < tr className='table-row' id={`table-row-${idx}`}
//               // onClick={() => { selectRow(idx) }} 
//               onDoubleClick={() => { viewRecord(data) }} >

//               {/* // key={idx}
//               // style={{ cursor: 'pointer', backgroundColor: "white" }} */}


//               <td key={'check' + idx} >

//                 <label>
//                   {/* {props.actionMode !== undefined && props.actionMode !== "none" && props.actionMode !== "Done" && props.actionMode !== "Close" ? <> */}

//                   <Input type='checkbox' style={{ marginLeft: 10 }}
//                     onChange={(e) => { handleCheck(e, data.id, idx) }}
//                     // onChange={(event) => {()=>{handleCheck(event, data.id , idx)}}}
//                     // defaultChecked={data.actionMode == "Edit Show"}
//                     // defaultChecked={data.show == 1}
//                     // checked={props.checkedState[idx]}
//                   />
//                   <span className='checkSpan' ></span>
//                   {/* </> : <></>} */}

//                 </label>
//               </td>
//               {headers.map((header, indx) => {
//                 let dataMap = "";
//                 if (header.field && header.field.length > 0) {
//                   let sepIndex = (header.field).indexOf('.')
//                   dataMap = data[header.field]
//                   if (sepIndex !== -1) {
//                     dataMap = data[(header.field).substring(0, sepIndex)]
//                     if (dataMap != null)
//                       dataMap = dataMap[(header.field).substring(sepIndex + 1, header.field.length)]
//                   }
//                 }


//                 // abc[indx] = dataMap
//                 // xyz[idx] = [...abc, abc[indx]]

//                 return (
//                   <>

//                     <td key={'row-' + indx} onDoubleClick={() => { viewRecord(data) }}>
//                       {/* // onClick={() => { selectRecord(header, indx) }} > */}
//                       {/* <Link to={data.id}> */}
//                       {header.field == "flag" ?
//                         <img src={dataMap} alt="" /> :
//                         dataMap}
//                       {/* </Link> */}
//                     </td>


//                   </>)
//               })}
//               {props.status === true ?
//                 <td key={'status-' + idx} onDoubleClick={() => { viewRecord(data) }} >
//                   <i className='fas fa-circle' style={{ 'color': colorOptions[data['status']], paddingLeft: 20 }} />
//                 </td> : <></>}
//             </tr >

//           </>
//         )
//       }) : <></> :
//     <></>



//   let searchedRows = props.searchData !== undefined ?
//     props.searchData.length > 0 ?
//       props.searchData.map((data, idx) => {



//         data.list_id = props.list_info.id

//         // data.actionMode = props.actionMode?.split("_")[0]
//         return (
//           <>
//             < tr className='table-row' id={`table-row-${idx}`}
//               // onClick={() => { selectRow(idx) }} 
//               onDoubleClick={() => { viewRecord(data) }} >

//               {/* // key={idx}
//               // style={{ cursor: 'pointer', backgroundColor: "white" }} */}


//               <td key={'check' + idx} >

//                 <label>
//                   {/* {props.actionMode !== undefined && props.actionMode !== "none" && props.actionMode !== "Done" && props.actionMode !== "Close" ? <> */}

//                   <input type='checkbox' style={{ marginLeft: 10 }}
//                     onChange={(e) => { handleCheck(e, data.id, idx) }}
//                     // onChange={(event) => {()=>{handleCheck(event, data.id , idx)}}}
//                     // defaultChecked={data.actionMode == "Edit Show"}
//                     // defaultChecked={data.show == 1}
//                     checked={props.checkedState[idx]}
//                   />
//                   <span className='checkSpan' ></span>
//                   {/* </> : <></>} */}


//                 </label>
//               </td>
//               {headers.map((header, indx) => {
//                 let dataMap = "";
//                 if (header.field && header.field.length > 0) {
//                   let sepIndex = (header.field).indexOf('.')
//                   dataMap = data[header.field]
//                   if (sepIndex !== -1) {
//                     dataMap = data[(header.field).substring(0, sepIndex)]
//                     if (dataMap != null)
//                       dataMap = dataMap[(header.field).substring(sepIndex + 1, header.field.length)]
//                   }
//                 }


//                 // abc[indx] = dataMap
//                 // xyz[idx] = [...abc, abc[indx]]


//                 return (
//                   <>

//                     <td key={'row-' + indx} onDoubleClick={() => { viewRecord(data) }}>
//                       {/* // onClick={() => { selectRecord(header, indx) }} > */}
//                       {/* <Link to={data.id}> */}
//                       {header.field == "flag" ?
//                         <img src={dataMap} alt="" /> :
//                         dataMap}
//                       {/* </Link> */}
//                     </td>


//                   </>)
//               })}
//               {props.status === true ?
//                 <td key={'status-' + idx} onDoubleClick={() => { viewRecord(data) }} >
//                   <i className='fas fa-circle' style={{ 'color': colorOptions[data['status']], paddingLeft: 20 }} />
//                 </td> : <></>}
//             </tr >

//           </>
//         )



//       }) : <></> : <></>
//   // let rowsHidden =
//   //   hiddenRows != undefined || hiddenRows != null ?
//   //     hiddenRows.map((data, idx) => {
//   //       return (
//   //         <>
//   //           {data.actionMode?.includes("Edit Hide") ?

//   //             <tr className='table-row'
//   //               id={`table-row-${idx}`}
//   //               onClick={() => { selectRow(idx) }}
//   //             // key={idx} 
//   //             // style={{ cursor: 'pointer', backgroundColor: "white" }}
//   //             >
//   //               <td key={'check' + idx} >
//   //                 <label>
//   //                   {props.actionMode !== undefined ? <>

//   //                     <input type='checkbox' style={{ marginLeft: 10 }}
//   //                       onChange={() => { handleSelectOne(data) }}
//   //                       // onChange={(e) => { selectRecord(e, data, idx) }}
//   //                       checked={data.checked} />
//   //                     <span className='checkSpan'></span>
//   //                   </> : <></>}

//   //                 </label>
//   //               </td>
//   //               {headers.map((header, indx) => {
//   //                 let dataMap = "";
//   //                 if (header.field && header.field.length > 0) {
//   //                   let sepIndex = (header.field).indexOf('.')
//   //                   dataMap = data[header.field]
//   //                   if (sepIndex !== -1) {
//   //                     dataMap = data[(header.field).substring(0, sepIndex)]
//   //                     if (dataMap != null)
//   //                       dataMap = dataMap[(header.field).substring(sepIndex + 1, header.field.length)]
//   //                   }
//   //                 }

//   //                 // abc[indx] = dataMap
//   //                 // xyz[idx] = [...abc, abc[indx]]

//   //                 return (
//   //                   <>

//   //                     <td key={'row-' + indx} onDoubleClick={() => { viewRecord(data) }}>
//   //                       {/* // onClick={() => { selectRecord(header, indx) }} > */}
//   //                       {/* <Link to={data.id}> */}
//   //                       {dataMap}
//   //                       {/* </Link> */}
//   //                     </td>


//   //                   </>)
//   //               })}
//   //               {props.status === true ?
//   //                 <td key={'status-' + idx} onDoubleClick={() => { viewRecord(data) }} >
//   //                   <i className='fas fa-circle' style={{ 'color': colorOptions[data['status']], paddingLeft: 20 }} />
//   //                 </td> : <></>}
//   //             </tr>
//   //             : <></>}
//   //         </>
//   //       )
//   //     }) : <></>


//   // let rowsShown =
//   //   shownRows != undefined || shownRows != null ?
//   //     shownRows.map((data, idx) => {


//   //       return (

//   //         <>

//   //           {data.show == 1 ?
//   //             // {data.actionMode?.includes("Edit Show") ?

//   //             <tr className='table-row'
//   //               id={`table-row-${idx}`}
//   //               onClick={() => { selectRow(idx) }}
//   //             // key={idx} 
//   //             // style={{ cursor: 'pointer', backgroundColor: "white" }}
//   //             >
//   //               <td key={'check' + idx} >
//   //                 <label>
//   //                   {props.actionMode !== undefined && props.actionMode !== "Save" && props.actionMode !== "Close" ? <>

//   //                     <input type='checkbox' style={{ marginLeft: 10 }}
//   //                       onChange={(event) => { handleSelectOne(event, data) }}
//   //                       // onChange={(e) => { selectRecord(e, data, idx) }}
//   //                       // checked={data.checked}
//   //                       // checked
//   //                       defaultChecked={data.show == 1}
//   //                     />
//   //                     <span className='checkSpan'></span>
//   //                   </> : <></>}

//   //                 </label>
//   //               </td>
//   //               {headers.map((header, indx) => {
//   //                 let dataMap = "";
//   //                 if (header.field && header.field.length > 0) {
//   //                   let sepIndex = (header.field).indexOf('.')
//   //                   dataMap = data[header.field]
//   //                   if (sepIndex !== -1) {
//   //                     dataMap = data[(header.field).substring(0, sepIndex)]
//   //                     if (dataMap != null)
//   //                       dataMap = dataMap[(header.field).substring(sepIndex + 1, header.field.length)]
//   //                   }
//   //                 }

//   //                 // abc[indx] = dataMap
//   //                 // xyz[idx] = [...abc, abc[indx]]

//   //                 return (
//   //                   <>

//   //                     <td key={'row-' + indx} onDoubleClick={() => { viewRecord(data) }}>
//   //                       {/* // onClick={() => { selectRecord(header, indx) }} > */}
//   //                       {/* <Link to={data.id}> */}
//   //                       {dataMap}
//   //                       {/* </Link> */}
//   //                     </td>


//   //                   </>)
//   //               })}
//   //               {props.status === true ?
//   //                 <td key={'status-' + idx} onDoubleClick={() => { viewRecord(data) }} >
//   //                   <i className='fas fa-circle' style={{ 'color': colorOptions[data['status']], paddingLeft: 20 }} />
//   //                 </td> : <></>}
//   //             </tr> : <></>}
//   //           {/* : <></>} */}
//   //         </>
//   //       )
//   //     }) : <></>

//   let fetchMoreData = async () => {

//     props.getPaginationData(props.rows)


//   }



//   let emptyRows = props.addMode === true ?
//     <tr className='table-row' key={'add'} style={{ cursor: 'pointer' }}>
//       {props.default === true ?
//         <td key=''>
//           {/* <input type='checkbox' style={{ marginLeft: 20 }} /> */}
//         </td> : <></>}
//       {headers.map((header, indx) => {

//         return <td key={indx} style={{ paddingLeft: 10 }} onClick={() => { }} >
//           <input type='text' value={rowValue[header.column]} onChange={(event) => { changeHandler(event, header.column) }} /></td>
//       })}
//       <i className='fas fa-check fa-2x' style={{ paddingTop: 3 }} onClick={() => { pushRow(rowValue) }} />
//       <i className='fas fa-close fa-2x' style={{ paddingLeft: 10, paddingTop: 3 }} onClick={() => { props.removeRow() }} />
//     </tr> : <></>
//   // border-bottom-style: solid;
//   // border-bottom-width: 3px;
//   // style="position:sticky; width:100%; top:0px; z-index:2;"

//   // let tablebody = document.getElementById("tableBody")


//   // const onScroll = () => {
//   //   const scrollTop = document.documentElement.scrollTop
//   //   const scrollHeight = document.documentElement.scrollHeight
//   //   const clientHeight = document.documentElement.clientHeight

//   //   if (scrollTop + clientHeight >= scrollHeight) {
//   //     fetchMoreData()
//   //     // setPage(page + 1)
//   //   }
//   // }




//   // useEffect(() => {
//   //   if (props.rows != undefined) {
//   //     tablebody?.addEventListener('scroll', onScroll)

//   //   }
//   //   return () => tablebody?.removeEventListener('scroll', onScroll)
//   // }, [])



//   return (
//     <>
//       {
//         props.visible === true ?

//           <table id="table-data" >
//             <thead id="T-head" style={style} >
//               <tr id="Tbale-tabel">
//                 {defaultHeaders}
//                 {tableHeaders}
//                 {statusHeader}
//               </tr>
//             </thead>
//             <tbody id="tableBody" >

//               <InfiniteScroll
//                 // dataLength={props.rows.results == undefined ? 30 : props.rows.results.length}
//                 // dataLength={100}
//                 // dataLength={props.rows.results == undefined ? 30 : props.pageData.length}
//                 dataLength={props.rows.results == undefined ? 30 : rows.length}
//                 next={fetchMoreData}
//                 hasMore={props.rows.next != null ? true : false}
//                 // loader={<Loader size={"20vh"} align={"center"}></Loader>}
//                 loader={<h4><center>Loading...</center></h4>}
//                 scrollableTarget="tableBody"
//               >

//                 {props.searchData == undefined ? tableRows : searchedRows}
//                 {/* 
//               {props.actionMode == undefined || props.actionMode?.includes("Edit ") ? tableRows : props.actionMode?.includes("Save") ? rowsShown : <></>}
//               {props.actionMode == "Close" ?
//                 shownRows.length > 0 ?
//                   // rowsShown ? 
//                   rowsShown : tableRows : <></>} */}

//                 {/* {tableRows} */}
//               </InfiniteScroll>
//               {/* {shownRows.length >= 0 ? rowsShown : tableRows} */}
//               {/* {props.actionMode == "Done Show_Selected" ? rowsShown : <></>} */}
//               {/* {props.actionMode !== undefined ? tableRows : */}
//               {/* {rowsShown.length != undefined || rowsShown.length != null ? rowsShown : tableRows} */}
//               {/* } */}
//               {/* {rowsShown} */}
//               {/* {props.actionMode == undefined ? tableRows : <></>} */}
//               {emptyRows}
//             </tbody>
//           </table> :
//           <></>
//       }
//     </>
//   );



//   // let selector = (row) => {
//   //   return row.field

//   // }


//   // const [checkbox1, setCheckbox1] = useState([]);

//   // const showLogs2 = (e) => {
//   //   setCheckbox1(e);
//   // };

//   // dataTable.columns.map((value) => {
//   //   value.name = value.field
//   //   value.selector = selector(value)
//   //   value.sortable = true


//   // })


//   // dataTable.rows.map((value) => {
//   // })
//   // const columnsOne = [
//   //   {
//   //     name: "Customer",
//   //     selector: row => row.name
//   //   },
//   //   {
//   //     name: "Id",
//   //     selector: row => row.name

//   //   }
//   // ]





//   // return (
//   //   <>
//   //     <div className="data" name
//   //       onDoubleClick={(e) => { viewRecord(e) }}>
//   //       <DataTable columns={dataTable.columns}
//   //         data={dataTable.rows}
//   //         selectableRows
//   //         fixedHeader
//   //         // selectableRowSelected={rowSelectCritera}
//   //         pagination />
//   //     </div>


//   //     {/* <MDBDataTableV5
//   //       hover
//   //       entriesOptions={[5, 20, 25]}
//   //       entries={5}
//   //       pagesAmount={4}
//   //       data={dataTable}
//   //       // checkbox
//   //       headCheckboxID='id6'
//   //       bodyCheckboxID='checkboxes6'
//   //       getValueCheckBox={(e) => {
//   //         showLogs2(e);
//   //       }}
//   //       getValueAllCheckBoxes={(e) => {
//   //         showLogs2(e);
//   //       }}
//   //       multipleCheckboxes
//   //     /> */}


//   //     {/* 
//   //     {checkbox1 && (
//   //       <p>
//   //         {JSON.stringify(
//   //           checkbox1.map((e) => {
//   //             delete e.checkbox;
//   //             return e;
//   //           }) && checkbox1
//   //         )}
//   //       </p>
//   //     )} */}


//   //   </>
//   // );









// }

// export default Table;
