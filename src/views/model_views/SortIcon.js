import React from 'react'
import { CustomModal } from '../../components'
import FormModal from './FormModal'
import "../../App.css"
import { AiFillDelete } from "react-icons/ai";
import { Wrapper, Icon } from "../../components/index"
import "../../styles/components/Modal.css"


function SortIcon(props) {





    let buttonStyle = {
        "color": "#1c74bd",
        "border": "1px solid blueviolet",
        "width": "50%",
    }
    let wdthStyle = (width) => {
        return ({
            ...props.style,
            width: width + '%',
        })
    }

    let nestedStyle = (width) => {
        return ({
            marginLeft: '4px',
            width: width + '%',
        })
    }
    let HideModal = () => {
        props.SorttoggleMode()
    }


    let ModalHeader = <Wrapper style={{
        width: '100%', display: "flex", "flex-direction": "column", "align-items": "center", "gap": "15px", "padding": "10px"
    }}>
        <label style={{ marginLeft: 10, fontSize: 26, fontWeight: 'bold', color: "#1c74bd" }} >
            
        </label>
        <div className="Advance-Icons">
            <div style={buttonStyle} ><Icon icon='fa-solid fa-check fa-xl' style={{ "padding": "17px 3px" }} /></div>
            <div style={buttonStyle} ><Icon icon='fa-solid fa-xmark fa-xl' style={{ "padding": "17px 9px" }} clickHanlder={HideModal} /></div>
            <div style={buttonStyle} ><Icon icon="fa-solid fa-rotate fa-xl" style={{ "padding": "17px 4px" }} /></div>
            <div style={buttonStyle} ><Icon icon='fa-solid fa-plus fa-xl' style={{ "padding": "17px 4px" }} /></div>
        </div>
    </Wrapper >




    let data = <React.Fragment>
        <div className="alldrop-sort">
            <select className="DropDown" style={wdthStyle(100)}>
                <option>Country</option>
                <option>State</option>
                <option>Company</option>
            </select>
            <select className="DropDown" style={wdthStyle(100)}>
                <option>ascending</option>
                <option>descending</option>
            </select>
            <select className="DropDown" style={wdthStyle(100)}>
                <option>grouped</option>
                <option>ungrouped</option>
            </select>
            <div className="btndel">
                <AiFillDelete size={"30px"} />
            </div>
        </div>
    </React.Fragment>

    return (
        <>


            <CustomModal modalheader={ModalHeader} style={{ width: "33%", height: "50%" }} display={true} title={'in this'} modalbody={data} />

        </>
    )
}

export default SortIcon