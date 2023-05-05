import { useState } from 'react'
import '../../styles/components/Table.css'


function SubTable(props) {

  let colorOptions = { "0": 'red', "1": 'blue', "2": 'green' }
  const [rowValue, setRowValue] = useState({})

  let viewRecord = (record) => {
    props.changeMode('view')
    loadRecord(record)
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

  let tableHeaders = props.headers != undefined ?
    props.headers.map((header, idx) => {
      let heading = header
      if (props.headerType === 'Json') {
        heading = ((header.system_name)?.charAt(0))?.toUpperCase() + ((header.system_name).slice(1)).replace('_', ' ')
        // heading = ((header.column)?.charAt(0))?.toUpperCase() + ((header.column).slice(1)).replace('_',' ')
      }
      return (
        <th key={idx} className={"table-header"}>
          {heading}
        </th>
      )
    }) : <></>

  let statusHeader = props.status === true ?
    (<th className={"table-header"}>
      Status
    </th>) :
    <></>

  let defaultLabel = props.defaultLabel == 'check' ?
    <input type='checkbox' style={{ marginLeft: 10 }} /> :
    <label>{props.defaultLabel}</label>

  let defaultHeaders = props.default === true ?
    (<th className={"table-header"}>
      {defaultLabel}
    </th>) :
    <></>


  let tableRows = props.rows != undefined ?
    props.rows.length > 0 ?
      props.rows.map((data, idx) => {
        return (
          <>
            <tr className='table-row ' key={idx} style={{ cursor: 'pointer' }}>
              {props.default === true ?
                <td key={'check' + idx}>
                  {data['default'] == true ?
                    <input type='checkbox' style={{ marginLeft: 10 }} checked onChange={() => { }} /> :
                    <input type='checkbox' style={{ marginLeft: 10 }} />}
                </td>
                : <></>}
              {props.headers.map((header, indx) => {
                let headerField
                if (header.field != null && header.field != '' && header.field) {
                  headerField = header.field
                }
                else {
                  headerField = header.col_table
                }

                let sepIndex = (headerField)?.indexOf('.')
                let dataMap = data[headerField]
                if (sepIndex != -1) {
                  dataMap = data[(headerField).substring(0, sepIndex)]
                  if (dataMap != null)
                    dataMap = dataMap[(headerField).substring(sepIndex + 1, headerField.length)]
                }
                return <td key={indx} onClick={() => { viewRecord(data) }} >{dataMap}</td>
              })}
              {props.status === true ?
                <td key=''>
                  <i className='fas fa-circle' style={{ 'color': colorOptions[data['status']], paddingLeft: 20 }} />
                </td> : <></>}
            </tr>
          </>
        )
      }) : <></> :
    <></>

  let emptyRows = props.addMode == true ?
    <tr className='table-row ' style={{ cursor: 'pointer' }}
    // onDoubleClick={}
    >
      {props.default === true ?
        <td key=''>
          <input type='checkbox' style={{ marginLeft: 20 }} />
        </td> : <></>}
      {props.headers.map((header, indx) => {
        return <td key={indx} style={{ paddingLeft: 10 }} onClick={() => { }} >
          <input type='text' value={rowValue[header.field]} onChange={(event) => { changeHandler(event, header.field) }} /></td>
      })}
      <i className='fas fa-check fa-2x' style={{ paddingTop: 3 }} onClick={() => { pushRow(rowValue) }} />
      <i className='fas fa-close fa-2x' style={{ paddingLeft: 10, paddingTop: 3 }} onClick={() => { props.removeRow() }} />
    </tr> : <></>

  return (
    <>
      {props.visible === true ?
        <table id={props.id}>
          <thead>
            <tr>
              {defaultHeaders}
              {tableHeaders}
              {statusHeader}
            </tr>
          </thead>
          <tbody>
            {tableRows}
            {emptyRows}
          </tbody>
        </table> :
        <></>}
    </>
  );
}

export default SubTable; //<td><input type='checkbox' /></td>
