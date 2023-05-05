import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { CustomModal, PushNotify } from '../../components'
import { connect, useSelector } from 'react-redux';

import {
    getFormData,
    getFields
} from '../../actions/system'
// import "../../styles/components/Table"

import * as XLSX from 'xlsx';


function FileUpload(props) {

    const [file, setFile] = useState('')
    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])
    const [mapObject, setMapObject] = useState({})

    // useEffect(() => {
    //     if ((props.listForm).length !== 0) {
    //         let alllistForm = [...props.listForm.results]
    //         let FilterTheForm = alllistForm.filter((filterKey) => {
    //             return filterKey?.list?.id == props.list_info.id
    //         })
    //         props.getFormData(FilterTheForm[0].form.id).then(() => { })
    //     }
    // }, [props.listForm])


    // useEffect(() => {
    //     if ((props.listForm).length > 0) {
    //         props.getFormData(props.listForm[0].form.id).then(() => { })
    //     }
    // }, [props.listForm])


    let borderStyle = {
        border: '1px solid black',
        borderCollapse: 'collapse',
    }

    let saveFile = (event) => {
        var f = event.target.files[0];
        //f = file
        var name = f.name;
        const reader = new FileReader();
        reader.onload = (evt) => { // evt = on_file_select event
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            /* Update state */
            const sheet_data = data.split(/\r?\n/)
            let ColumnHeaders = (sheet_data.toString()).split(",")
            setColumns((sheet_data.shift()).split(','))
            setRows(sheet_data)
            setDatamap(ColumnHeaders, sheet_data)
        };
        reader.readAsBinaryString(f);
        setFile(f)
    }

    let setDatamap = (ColumnHeaders, sheet_data) => {
        let row_data = (sheet_data.toString()).split(",")
        let rowset = new Set(row_data)
        let ColumnData = ColumnHeaders.filter((value) => {
            return !rowset.has(value)
        })
        let mapObject = {}
        ColumnData.map((column, indx) => {
            props.form_info != undefined ?
                props.form_info.form_data != undefined ?
                    props.form_info.form_data.map((header, idx) => {
                        // if (column.toLowerCase() == (header.label).toLowerCase() || column.toLowerCase() == (header.field).toLowerCase()) {
                        if (column.toLowerCase() == (header.label).toLowerCase() || column.toLowerCase() == (header.field).toLowerCase()) {
                            mapObject[header.field] = indx + 1
                        }
                    }) : <></> : <></>
        })
        setMapObject(mapObject)
    }

    let uploadFile = () => {
        props.fileHandler(file, mapObject)
    }

    let toggleMode = () => {
        setColumns([])
        props.toggleMode();
    }

    let checkAllNone = (array) => {
        for (var i = 0; i < array.length; i++)
            if (array[i]) return false;
        return true;
    }

    let uploadCnt = <React.Fragment>
        <label for="images" class="drop-container">
            <span class="drop-title">Drop files here</span>
            or
            <input type="file" id="images" accept=".xlsx,.xls,.csv" required onChange={(event) => { saveFile(event) }} />
        </label>
        {/* <div  style={{position:'absolute',bottom:'20px',right:'20px'}}>
                            {file !== '' && file !== null && file !== undefined?
                                <Button variant="primary" size="lg" onClick={uploadFile}>
                                    Upload File
                                </Button>:
                                <Button variant="primary" size="lg" onClick={uploadFile} disabled>
                                    Upload File
                                </Button>}
                        </div> */}
    </React.Fragment>

    let columnCont = <React.Fragment>
        <div className='modalTable'>
            <table className='importTable' style={borderStyle} style={{ display: "" }}>
                <thead style={{ display: "" }}>
                    <tr >
                        {columns.map((column, indx) => {
                            return <th style={{ ...borderStyle, width: "250px" }}><select className='importField' style={{ borderRadius: '5px' }}><option selected disabled  >To import , select a field</option>
                                {/* {column !== "" ? */}
                                {props.form_info.form_data != undefined ?
                                    props.form_info.form_data.map((header, idx) => {
                                        let impOption = header.data ? column.toLowerCase() == (header.display_label).toLowerCase() || column.toLowerCase() == (header.field).toLowerCase() ?
                                            <option selected>{header.display_label}</option> :
                                            <option>{header.label}</option> : <></>
                                        return <>{impOption}</>
                                    }) : <></>}
                                {/* : <></>} */}
                            </select></th>
                        })}
                    </tr>
                    <tr>
                        {columns.map((column, indx) => {
                            return <th style={{ ...borderStyle, backgroundColor: '#dee2e6', width: "250px" }}>{(column.charAt(0)).toUpperCase() + (column.slice(1)).replace('_', ' ')}</th>
                        })}
                    </tr>
                </thead>
                <tbody id="FileUpload-tbody" style={{ overflow: 'scroll' }}>
                    {rows.map((row, indx) => {
                        let rowData = row.split(',')
                        if (checkAllNone(rowData) == false) {
                            return <tr> {rowData.map((data, inddx) => {
                                // if (rowData !== "" && row != "" && rowData !== null) {
                                return <td style={borderStyle}>{data}</td>
                                // }
                            })}</tr>
                        }
                    })}

                </tbody>
            </table>

        </div>
        <Button variant="primary" size="lg" onClick={() => { uploadFile() }} style={{ float: 'right', marginTop: '10px', marginBottom: '10px', marginRight: '10px' }}>
            Next
        </Button>


    </React.Fragment>


    return (
        <>
            {file == '' ?
                <CustomModal display={true} title={props.title} onHide={props.toggleMode} modalbody={uploadCnt} modalheader={<div><h4>{props.title}</h4></div>} closeBtn={true} /> :
                <CustomModal display={true} title={'in this'} onHide={props.toggleMode} modalbody={columnCont} modalheader={<div><h3><b>{props.title}</b></h3></div>} closeBtn={true} />}
        </>
    );
}

const mapStateToProps = state => {
    return {
        form_info: state.sysData.form_info,
        field_items: state.sysData.field_items,
        listForm: state.sysData.listForm
    };
};

const mapDispatchToProps = {
    getFormData, getFields

}

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);