import React, { useState } from 'react';
import { Card, Wrapper, Input, Label, FormHeader, Table, ListHeader, TableHeader, SubTable, Modal } from '../../components'
import FormModal from '../model_views/FormModal';
import ListModal from '../model_views/ListModal';
import EyeIcon from '../model_views/EyeIcon';
import FormView from './FormView';



function SubListView(props) {
    const [tableRows, setTableRows] = useState(props.rows.slice(0, 5))
    const [addMode, setAddMode] = useState(false)
    const [exportMode, setExportMode] = useState(false)
    const [visible, setVisMode] = useState(true)
    const [collapse, setCollapse] = useState(true)
    const [eyeMode, setEyeMode] = useState(false)


    let toggleAddMode = () => {
        setAddMode(!addMode)
    }

    let toggleExportMode = () => {
        setExportMode(!exportMode)
    }

    let shuffleMode = () => {
        setAddMode(!addMode)
        setExportMode(!exportMode)
    }

    let removeRow = () => {
        setAddMode(false)
    }

    let saveRecord = (rowData) => {
        toggleAddMode()
        setTableRows(tableRows => [...tableRows, rowData])
        props.loadList(props.type, rowData)
    }

    let setVisible = (Mode) => {
        setVisMode(Mode)
    }


    let collapseList = () => {
        setCollapse(!collapse)
    }


    const eyeModeVisible = () => {
        setEyeMode(!eyeMode)
    }
    const notSavedata = () => {
        setEyeMode(!eyeMode)


    }

    const SaveandClose = () => {
        setEyeMode(!eyeMode)


    }
    const closePopup = () => {
        setEyeMode(!eyeMode)


    }
    const toogleEyeMode = () => {
        setEyeMode(!eyeMode)



    }

    // const higherOrderComponent = (Componet) => {
    //     { console.log("ULDGLUD", Componet) }

    //     return (props) => (
    //         <>



    //             {console.log("ULDGLUD", props)}
    //             <Componet {...props} />
    //         </>
    //     )
    // }


    let modalMode = addMode === true ? 'show' : ''

    let defaultLabel = props.defaultLabel == undefined ? 'Default' : props.defaultLabel

    return (
        <>
            <Wrapper>
                <></>
                <Card top={20} style={{ minHeight: '100px' }}>
                    {/* {higherOrderComponent(FormView)} */}
                    <TableHeader eyeModeVisible={eyeModeVisible} title={props.title} headerIcon={props.icon} tableMode={props.tableMode} collapseList={collapseList} collapse={collapse} visible={visible} setVisible={setVisible} toggleAddMode={toggleAddMode} toggleExportMode={toggleExportMode} />
                    {!collapse ?


                        <SubTable headers={props.headers} rows={tableRows} removeRow={removeRow} pushRow={() => { }}
                            headerType='Json' defaultLabel={defaultLabel} visible={visible}
                            status={false} default={true} changeMode={props.changeMode} loadFormData={props.loadFormData} /> : <></>}
                </Card>
                <FormModal modalShow={addMode}
                    title={props.title}
                    toggleMode={toggleAddMode}
                    shuffleMode={shuffleMode}
                    saveRecord={saveRecord}
                    fields={props.headers} />

                <ListModal modalShow={exportMode}
                    title={props.title}
                    icon={props.icon}
                    toggleMode={toggleExportMode}
                    shuffleMode={shuffleMode}
                    toggleAddMode={toggleAddMode}
                    rows={tableRows}
                    fields={props.headers} />
            </Wrapper>


            {/* {eyeMode === true ?
                <EyeIcon
                    data_source={props.data_source.toLowerCase()}
                    options={props.headers}
                    // resetHeaders={resetHeaders}
                    defaultHeaders={props.headers}
                    viewMode={"List"}
                    // viewMode={props.viewMode}
                    notSavedata={notSavedata}
                    closePopup={closePopup}
                    SaveandClose={SaveandClose}
                    toogleEyeMode={toogleEyeMode}
                // saveData={saveData}
                // changeView={changeView}
                ></EyeIcon> : <></>
            } */}
        </>



    );
}

export default SubListView;