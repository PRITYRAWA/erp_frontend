import React from 'react'
import { useEffect } from 'react'
import "../../styles/components/Table.css"
import { useState } from 'react'
import { Card } from "../../components"
import InfiniteScroll from 'react-infinite-scroll-component'



function GridView(props) {

    // let colorOptions = { '0': 'green', '1': 'red', '2': 'yellow', 'no': 'black', "null": "black" }


    let colorOptions = { 'normal': 'lightblue', 'urgent': 'red', 'warning': 'yellow', 'no': 'black', "done": "green" }

    let colorOptionsSVG = {
        'normal': 'invert(56%) sepia(32%) saturate(1886%) hue-rotate(163deg) brightness(102%) contrast(102%)',
        'urgent': 'invert(14%) sepia(98%) saturate(7051%) hue-rotate(360deg) brightness(103%) contrast(112%)',
        'warning': 'invert(99%) sepia(92%) saturate(4766%) hue-rotate(358deg) brightness(103%) contrast(105%)',
        "done": "invert(72%) sepia(62%) saturate(6240%) hue-rotate(84deg) brightness(123%) contrast(123%)",
        'no': 'black'
    }

    let getItems = JSON.parse(sessionStorage.getItem(props.data_source))

    const [headers, setHeaders] = useState(getItems != undefined ? getItems.filter(header => header.visibility == 'default' || header.visibility == 'required') : [])
    const [rows, setRows] = useState(props.pageData)



    useEffect(() => {

        let sortedData = Array.from(new Set([...rows, ...props.pageData]))

        // let sorted = sortedData.filter((value) => {
        //     return !value.list
        // })

        setRows(sortedData)


    }, [props.pageData,])


    let viewRecord = (record) => {

        if (props.list_info.id !== "90001") {
            props.changeMode('view')
            loadRecord(record)
        }
        else {
            props.openList(record.list)
        }
    }

    let loadRecord = (record) => {
        props.loadFormData(record.id)
    }
    let fetchMoreData = async () => {



        props.getPaginationData(props.rows)


    }


    // let viewRecord = (record) => {
    //     if (props.data_source !== "hometiles" && props.data_source !== "home tiles" && props.data_source !== undefined) {
    //       props.changeMode('view')
    //       loadRecord(record)
    //     }

    //     else {
    //       props.openList(record.list.id)
    //     }
    //   }


    let GridForm = document.getElementById("GridForm")

    let gridData, gridStatus
    let gridCol =


        props.list_info.id == "90001" ?

            <div className="GridForm" style={{ userSelect: "none" }} id="GridForm" >
                {props.pageData ?
                    rows?.map((rowData, ind) => {
                        let dataDisplay = rowData.system_name
                        // gridData = headers.map((header, index) => {
                        //     // let dataDisplay = rowData[header.field]
                        //     return <div className={`gridElements-${index}`} > {dataDisplay}</div>
                        // })
                        // gridStatus = props.status ?
                        //     <                                                    div >
                        //         <i className='fas fa-circle pos-rel' style={{ "color": colorOptions[rowData['status']] }}></i></div>
                        //     : <></>
                        return <div className="Grid-Display" id="Home-Grid" onDoubleClick={() => { viewRecord(rowData) }}>
                            <div className="felx-cen Home">
                                <div><img src={rowData?.list?.icon} className="Img-src" height="40px" style={{ "filter": colorOptionsSVG[rowData['status']] }} /></div>
                                <div>{dataDisplay}</div>
                                <div>{gridStatus}</div>
                            </div>

                        </div>
                    }) : <></>}
            </div >











            :
            <Card top={20} style={{ height: '85vh' }}>
                <></>


                <div id="infinte">
                    <InfiniteScroll
                        dataLength={props.rows.results == undefined ? 30 : rows.length}
                        next={fetchMoreData}
                        hasMore={props.rows.next != null ? true : false}
                        loader={<h4><center>Loading...</center></h4>}
                        scrollableTarget="GridForm"
                    >

                        <div className="GridForm" id="GridForm" style={{ height: "85vh", userSelect: "none" }}>
                            {props.pageData ?
                                rows?.map((rowData, ind) => {
                                    gridData = headers.map((header, index) => {
                                        let dataDisplay = rowData[header.field]
                                        return (

                                            header.field == "flag" ?
                                                <img src={dataDisplay} alt="" /> : <div className={`gridElements-${index}`} > {dataDisplay}</div>
                                        )
                                    })
                                    gridStatus = props.status ?
                                        <div >
                                            <i className='fas fa-circle pos-rel' style={{ 'color': colorOptions[rowData['status']] }}></i></div>
                                        : <></>
                                    return <div className="Grid-Display" onDoubleClick={() => { viewRecord(rowData) }}>
                                        <div className="felx-cen">
                                            <div>{gridData}</div><div>{gridStatus}</div></div>
                                    </div>
                                }) : <></>}

                        </div >

                    </InfiniteScroll>


                </div>
            </Card >





    // let

    return (
        <>

            {gridCol}



        </>
    )
}

export default GridView