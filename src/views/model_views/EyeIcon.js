import React from 'react'
import { useState, useEffect } from 'react'
import { Wrapper, Icon, Button } from '../../components'
import { CustomModal } from '../../components'
import "../../styles/components/Modal.css"
import DragandDrop from '../drag&drop/DragandDrop'


function EyeIcon(props) {

    let getItems = JSON.parse(sessionStorage.getItem(props.data_source))
    const [mode, setMode] = useState(props.viewMode)
    const [headers, setHeaders] = useState(getItems)
    // const [dragDrop, setDragDrop] = useState([])




    let removeRef = JSON.parse(JSON.stringify(props.defaultHeaders))


    const [views, setViews] = useState(["List", "Grid", "Location", "Graph", "Calender"])
    useEffect(() => {
        setHeaders(getItems)
    }, [sessionStorage.getItem(props.data_source)])



    if (headers != undefined) {
        headers.map((value) => {
            if (value.visibility == "required")
                value.check = true
        })

    }

    let handleClick = (e) => {
        const { value } = e.target
        setMode(value)

    }


    let buttonStyle = {
        "color": "#1c74bd",
        "border": "1px solid blueviolet",
        "width": "50%",
    }



    var WholeData = []
    var DumpData = []
    var requiredData = []


    const getValue = (e, option) => {

        let HeaderFilter = headers.filter((value) => {
            return value.label == option.label
        })
        if (option.visibility == "required") {
            HeaderFilter[0].visibility = "optional"
            HeaderFilter[0].check = false
            WholeData = [...WholeData, HeaderFilter[0]]


        }
        else if (option.visibility == "optional") {
            HeaderFilter[0].visibility = "required"
            HeaderFilter[0].check = true
            WholeData = [...WholeData, HeaderFilter[0]]

        }
        requiredData = [...WholeData, ...headers]
        DumpData = [...DumpData, option]

    }

    const SaveandClose = () => {
        if (requiredData.length != 0) {
            props.SaveandClose(requiredData)
            sessionStorage.setItem(props.data_source, JSON.stringify(requiredData))

        }
        else {
            props.toogleEyeMode()
        }

        sessionStorage.setItem("mode", mode)
        props.changeView(mode)
        setMode(mode)
        sessionStorage.setItem(props.data_source, JSON.stringify([...new Set(headers)]))
        props.SaveandClose([...new Set(headers)])



    }
    const dragdropColumns = (data) => {



        // setHeaders(prev => {
        //     return [...prev, ...data]
        // })
        setHeaders(data)





    }



    //For Reverting the Change
    const closePopup = () => {
        props.closePopup()


        //For Reverting the Change for visibility

        sessionStorage.setItem(props.data_source, JSON.stringify(getItems))

        //For Reverting the Change for visibility  
        if (DumpData.length >= 0) {
            let ToBeFiltered = DumpData
            const FilteredIds = ToBeFiltered.map(o => o.id)
            const FilteredArray = ToBeFiltered.filter(({ id }, index) => !FilteredIds.includes(id, index + 1))
            FilteredArray.map((value) => {
                if (value.visibility == "required") {
                    value.visibility = "optional"
                    value.check = false

                }
                else if (value.visibility == "optional") {
                    value.visibility = "required"
                    value.check = true

                }
            })


            DumpData = [...DumpData, ...getItems]
            //For Reverting the Change for Drag and Drop position

            sessionStorage.setItem(props.data_source, JSON.stringify([...new Set(getItems)]))

        }


    }
    let resetData = () => {
        sessionStorage.setItem(props.data_source, JSON.stringify(removeRef))
        sessionStorage.setItem("mode", "List")
        props.resetHeaders()

        props.closePopup()

    }



    let ModalHeader = <Wrapper style={{
        width: '100%', display: "flex", "flex-direction": "column", "align-items": "center", "gap": "15px", "padding": "10px"
    }}>
        <label style={{ marginLeft: 10, fontSize: 26, fontWeight: 'bold', color: "#1c74bd" }} >

        </label>
        <div className="Advance-Icons">
            <div style={buttonStyle} ><Icon icon='fa-solid fa-check fa-xl' style={{ "padding": "17px 3px" }} clickHanlder={SaveandClose} /></div>

            <div style={buttonStyle} ><Icon icon='fa-solid fa-xmark fa-xl' style={{ "padding": "17px 9px" }} clickHanlder={closePopup} /></div>

            <div style={buttonStyle} ><Icon icon='fa-solid fa-rotate-left fa-xl' style={{ "padding": "17px 4px" }} clickHanlder={resetData} /></div>
        </div>
    </Wrapper >


    let data = <React.Fragment>
        <div className="viewChan">

            {views.map((option, keys) => {
                return (
                    <>
                        <div className="optionView col">
                            {props.viewMode == option ?
                                <input type="radio" className='checkOn' name="Checkbox" value={option} onClick={(e) => { handleClick(e) }} defaultChecked /> :
                                <input type="radio" className='checkOn' name="Checkbox" value={option} onChange={(e) => { handleClick(e) }} />
                            }
                            <label className='labelOn'>{option}</label>
                        </div>
                    </>)
            })}

        </div>
        <hr />

        {mode == "List" || mode == "" ?
            <div className="viewChan alldrop-search ">

                {headers != undefined ?

                    <DragandDrop dragdropColumns={dragdropColumns} dragdrop={headers} getValue={getValue} />
                    // headers.map((value, indx) => {
                    //     return (
                    //         <>
                    //             {value.visibility == "optional" || value.visibility == "required" || value.visibility == "default" ?
                    //                 <div className="col">
                    //                     {value.visibility == "required" ?
                    //                         <input type="checkbox" key={indx} className="checkOn" value={value.label} onClick={(e) => { getValue(e, value) }}
                    //                             defaultChecked={value.check} ></input> : <></>


                    //                     }
                    //                     {value.visibility == "default" ?
                    //                         <input type="checkbox" key={indx} className="checkOn" value={value.label} onClick={(e) => { getValue(e, value) }}
                    //                             checked disabled ></input> : <></>}
                    //                     {value.visibility == "optional" ?
                    //                         <input type="checkbox" key={indx} className="checkOn" value={value.label} onClick={(e) => { getValue(e, value) }}  ></input> : <></>

                    //                     }


                    //                     <label className='labelOn'>{value.label}</label>
                    //                 </div>
                    //                 : <></>}
                    //         </>)
                    // }) 


                    : <></>}
            </div>
            : <></>}




        {mode == "Grid" ?
            <div className="viewChan">
            </div>
            : <></>}


    </React.Fragment>


    return (
        <>
            <CustomModal modalheader={ModalHeader} style={{ width: "33%", height: "50%" }} display={true} title={'in this'} modalbody={data} loseBtn={true} />

        </>
    )
}

export default EyeIcon