import React from 'react'
import { Wrapper, Card, Table, CustomModal, Icon } from '../../components'

function ActionButton(props) {


    let SaveandClose = () => {
        props.ClosePopup()

    }

    let closepopup = () => {

    }

    let resetData = () => {

    }
    let buttonStyle = {
        "color": "#1c74bd",
        "border": "1px solid blueviolet",
        "width": "50%",
    }


    let ModalHeader = <Wrapper style={{
        width: '100%', display: "flex", "flex-direction": "column", "align-items": "center", "gap": "15px", "padding": "10px"
    }}>
        <label style={{ marginLeft: 10, fontSize: 26, fontWeight: 'bold', color: "#1c74bd" }} >

        </label>
        <div className="Advance-Icons">
            <div style={buttonStyle} ><Icon icon='fa-solid fa-check fa-xl' style={{ "padding": "17px 3px" }} clickHanlder={SaveandClose} /></div>
            <div style={buttonStyle} ><Icon icon='fa-solid fa-xmark fa-xl' style={{ "padding": "17px 9px" }} clickHanlder={closepopup} /></div>
            <div style={buttonStyle} ><Icon icon='fa-solid fa-rotate-left fa-xl' style={{ "padding": "17px 4px" }} clickHanlder={resetData} /></div>
        </div>
    </Wrapper >



    let data =
        <Table data_source="customers" visible={true} status={true} rows={props.rows} headers={props.headers} headerType='Json' default={true} defaultLabel={'check'} visible={true} />


    //  <React.Fragment>
    //     <div className="viewChan">



    //     </div>



    // </React.Fragment>


    return (
        <>


            {props.optionValue == "Show Selected" ?

                <CustomModal modalheader={ModalHeader} style={{ width: "90%", height: "50%" }} display={true} title={'in this'} modalbody={data} loseBtn={true} /> : <></>

            }
        </>
    )



}


export default ActionButton
