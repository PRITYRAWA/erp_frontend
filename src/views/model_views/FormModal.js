import React, { useState } from 'react';
import { Card, Wrapper, Input, Label, FormHeader, Table, ListHeader, TableHeader, Icon, CustomModal } from '../../components'
import { RxCross2 } from "react-icons/rx";

function FormModal(props) {

    const [modalData, setModalData] = useState({ 'default': false })

    let changeHandler = (event, name) => {
        const { value } = event.target;
        setModalData(modalData => ({ ...modalData, [name]: value }))
    }

    let buttonStyle = {
        padding: 25,
        width: 40,
        float: 'right',
        color: 'rgb(12, 125, 177)'
    }

    let modalStyle = {
        width: '800px'
    }

    let saveRecord = () => {
        props.saveRecord(modalData)
        setModalData({ 'default': false })
    }

    let ModalHeader = <Wrapper style={{ width: '100%' }}>
        <i className={props.icon + ' fa-2x'} style={{ color: 'green' }} />
        <label style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold' }} >{(props.title).toUpperCase()}</label>
        {/* <RxCross2 style={buttonStyle} clickHanlder={() => { props.toggleMode() }} /> */}
        <Icon icon='fad fa-arrow-down-to-line fa-xl' style={buttonStyle} clickHanlder={() => { props.toggleMode() }} />
        <Icon icon='fas fa-gear fa-xl' style={buttonStyle} clickHanlder={() => { }} />
        <Icon icon='fas fa-close fa-xl' style={buttonStyle} clickHanlder={() => { props.shuffleMode() }} />
        <Icon icon='fas fa-check fa-xl' style={buttonStyle} clickHanlder={() => { saveRecord() }} />
    </Wrapper>

    let FormSkelton = props.fields.map((header, inx) => {
        return (
            <div className='row'>
                <div className='col-12'>
                    <label className='col-md-3 formLabel' style={{ float: 'left', marginTop: 20 }}>{(header.column)?.toUpperCase()}</label>
                    <div className='fieldWrapModal' style={{ marginTop: 20 }}>
                        <Input label={''} type={'modalField'} width={90} class='col-md-3 formInput' value={modalData[header.field]} onChange={(event) => { changeHandler(event, header.field) }} />
                    </div>
                </div>
            </div>)
    })

    return (
        <CustomModal display={props.modalShow} modalbody={FormSkelton} modalheader={ModalHeader} style={modalStyle} />
    );
}

export default FormModal;