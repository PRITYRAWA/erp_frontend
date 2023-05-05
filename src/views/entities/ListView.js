import React, { useState, useEffect, Suspense } from 'react';
import { Card, Wrapper, Input, Label, FormHeader, Table, ListHeader, TableHeader, Modal, PushNotify } from '../../components'
import FileUpload from '../model_views/FileUpload';
import { connect, useSelector } from 'react-redux';
import GridView from '../../components/lists/GridView';
import { getColumns } from '../../actions/system';

import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';


function ListView(props) {


    const [importMode, setImportMode] = useState(false)
    const [headers, setHeaders] = useState(props.headers)
    const [rows, setRows] = useState(props.rows)
    const [actionRows, setActionRows] = useState([])
    const [viewMode, setViewMode] = useState(sessionStorage.getItem("mode") != null ? sessionStorage.getItem("mode") : "List")


    useEffect(() => {

        if (props.list_info.id == "90001") {
            setViewMode("Grid")
        }
        else
            setViewMode("List")
    }, [])


    useEffect(() => {
        setRows(props.rows)
    }, [props.rows])


    useEffect(() => {
        setHeaders(props.headers)
    }, [props.headers])


    let toggleImport = () => {
        setImportMode(!importMode)
    }


    // -------------- Import Excel File Feature -------------- //
    let importData = (file, mapObject) => {
        props.importData(props.data_source.toLowerCase(), file, mapObject)
        toggleImport()
    }


    // -------------- It will change the view (List, Grid... etc) -------------- //
    let changeView = (value) => {
        setViewMode(value)
    }


    // -------------- Headers will be reseted (Change via api call) --------------- //

    let resetHeaders = () => {
        setViewMode("List")
        setHeaders(props.defaultHeaders)
    }

    let required = []


    // -------------- Data get saved to headers for a session (Change) -----------------//
    function saveDataToHead(options) {
        required = options
        let ToBeFiltered = required
        const FilteredIds = ToBeFiltered.map(o => o.id)
        const FilteredArray = ToBeFiltered.filter(({ id }, index) => !FilteredIds.includes(id, index + 1))
        setHeaders(FilteredArray)
    }


    const getPaginationData = (pageNo) => {
        props.getPaginationData(pageNo)
    }



    function openList(record) {
        props.getListfromDashboard(record)
    }


    //To get Back on menu
    let getPreviousMenu = () => {
        props.getPreviousMenu()
    }

    let listHeaders = props.headers != undefined ? props.headers.filter(header => header.visibility == 'required') : []
    let searchSelector = props.headers != undefined ? (props.headers).length > 0 ? props.listForm.results[0]?.form?.label?.toLowerCase() + "__icontains" : '' : ''
    return (
        <>
            <Wrapper>
                <ListHeader
                    listForm={props.listForm}
                    handleClone={props.handleClone}
                    list_info={props.list_info}
                    resetHeaders={resetHeaders}
                    defaultHeaders={props.defaultHeaders}
                    para={props.para}
                    icon={props.list_info.id !== "90001" ? 'fa-solid fa-arrow-left icon fa-1x' : 'fas fa-bars  icon'}
                    iconHandler={props.menuToggle}
                    formMode={props.formMode}
                    changeView={changeView}
                    openImport={toggleImport}
                    searchControl={props.searchControl}
                    changeMode={props.changeMode}
                    saveDataToHead={saveDataToHead}
                    getPreviousMenu={getPreviousMenu}
                    listTitle={props.title}
                    data_source={props.data_source?.toLowerCase()}
                    searchSelector={searchSelector}
                    headers={headers}
                    viewMode={viewMode}
                    actionMode={props.actionMode}
                    setActionMode={props.setActionMode}
                    selected={props.selectedIds}
                    rows={props.rows}
                    handleDelete={props.handleDelete}
                    handleShowRows={props.handleShowRows}
                    handleHideRows={props.handleHideRows}
                    tableActionMode={props.tableActionMode}
                />

                {viewMode == "List" || viewMode == "" ?
                    props.pendingReq == true ?
                        <>
                            <Loader size={"301px"} />
                            {/* <></> */}
                        </> :
                        <Card top={20} style={{ height: '85vh' }}>
                            <></>
                            <Table searchData={props.searchData}
                                pageData={props.pageData}
                                getPaginationData={getPaginationData}
                                form_id={props?.listForm}
                                list_info={props.list_info}
                                data_source={props.data_source?.toLowerCase()}
                                headers={headers}
                                rows={props.rows}
                                headerType='Json'
                                default={true}
                                defaultLabel={'check'}
                                visible={true}
                                status={true}
                                actionMode={props.actionMode}
                                changeMode={props.changeMode}
                                loadFormData={props.loadFormData}
                                handleRowSelect={props.handleRowSelect}
                                selectedIds={props.selectedIds}
                                setSelectedIds={props.setSelectedIds}
                                tempPageData={props.tempPageData}
                                showOrHide={props.showOrHide}
                                tableActionMode={props.tableActionMode}
                                setShowOrHide={props.setShowOrHide}
                            />
                        </Card> : <></>}


                {importMode === true ?
                    <FileUpload list_info={props.list_info} title={'Import ' + props.title}
                        fileHandler={importData}
                        toggleMode={toggleImport} /> :
                    <></>}

            </Wrapper>


            {viewMode == "Grid" ?
                props.pendingReq == true ?
                    <>

                        <Loader size={"301px"} />
                    </> :

                    // <Card top={20} style={{ height: '85vh' }}>
                    // <></>
                    <GridView getPaginationData={getPaginationData} pageData={props.pageData} openList={openList}
                        list_info={props.list_info}
                        data_source={props.data_source?.toLowerCase()}
                        headers={headers}
                        rows={props.rows}
                        headerType='Json'
                        default={true}
                        defaultLabel={'check'}
                        visible={true}
                        status={true}
                        changeMode={props.changeMode}
                        loadFormData={props.loadFormData} />
                // </Card>  
                : <></>}
        </>
    );
}
const mapStateToProps = state => {
    return {
        form_info: state.sysData.form_info,
        field_items: state.sysData.field_items,
        listForm: state.sysData.listForm,
        column_items: state.sysData.column_items,
        pendingReq: state.appData.pendingReq,
        listRowsResponse: state.appData.listRowsResponse
    };
};

const mapDispatchToProps = {
    getColumns
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView);