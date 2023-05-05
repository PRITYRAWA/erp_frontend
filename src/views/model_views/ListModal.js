import React, { useState } from 'react';
import { Card, Wrapper, Input, Label, FormHeader, Table, ListHeader, TableHeader, SubTable, CustomModal, Icon } from '../../components'
import { RxCross2 } from "react-icons/rx";

function ListModal(props) {

    let buttonStyle = {
        padding: 25,
        width: 35,
        float: 'right',
        color: 'rgb(12, 125, 177)'
    }

    let ModalHeader = <Wrapper style={{ width: '100%' }}>
        <i className={props.icon + ' fa-2x'} style={{ color: 'green' }} />
        <label style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold' }} >{(props.title).toUpperCase()}</label>


        {/* <Icon icon='fa-sharp fa-regular fa-xmark' style={buttonStyle} clickHanlder={() => { props.toggleMode() }} /> */}
        <Icon icon='fas fa-close fa-xl' style={buttonStyle} clickHanlder={() => { props.toggleMode() }} />
        <Icon icon='fas fa-gear fa-xl' style={buttonStyle} clickHanlder={() => { props.toggleExportMode() }} />
        <Icon icon='fas fa-eye fa-xl' style={buttonStyle} clickHanlder={() => { props.toggleExportMode() }} />
        <Icon icon='fas fa-plus fa-xl' style={buttonStyle} clickHanlder={() => { props.shuffleMode() }} />
        <Icon icon='fas fa-search fa-xl' style={buttonStyle} clickHanlder={() => { props.toggleExportMode() }} />
    </Wrapper>

    let FormSkelton = <React.Fragment>
        <SubTable headers={props.fields} rows={props.rows} headerType='Json' defaultLabel={'Default'} visible={true}
            status={false} default={true} changeMode={() => { }} loadFormData={() => { }} />
    </React.Fragment>

    return (
        <CustomModal display={props.modalShow} modalbody={FormSkelton} modalheader={ModalHeader} />
    );
}

export default ListModal;