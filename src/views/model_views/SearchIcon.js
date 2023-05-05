import React from 'react'
import { useState, useEffect } from 'react'
import { CustomModal } from '../../components'
import FormModal from './FormModal'
import { RiDeleteBinLine } from "react-icons/ri";
import { Wrapper, Icon } from "../../components/index"
import "../../styles/components/Modal.css"
import { connect } from 'react-redux';
import { getFormData } from '../../actions/system';
import { BASE_URL } from '../../config/api';
import axios from 'axios';
import { HEADERS } from '../../config/appHeaders';



function SearchIcon(props) {


    const [list, setList] = useState([])
    const [filter, setFilter] = useState({ "list": props.listForm.results[0].list.id, "logic": null, "sublogic": null })


    useEffect(() => {

        if ((props.listForm.results).length > 0) {
            props.getFormData(props.listForm.results[0].form.id).then(() => { })
        }
    }, [props.listForm])


    const operators = [{ "is": 113001 }, { "is not": 113002 }, { "is greater": 113003 }, { "is lesser": 113004 }, { "is greater than equal to": 113005 }, { "is lesser than equal to": 113006 }]


    //This is for mapping 
    let allData = [
        {
            field: "logic",
            options: [
                { "and": 1 },
                { "or": 2 },
                { "not": 3 },
            ],
            fieldName: "logic",
            type: "dropdown"
        },

        {
            field: "form_data",
            options: props.form_info.form_data,
            fieldName: "data",
            type: "dropdown"
        },
        {
            field: "logic_operators",
            options: operators,
            fieldName: "operator",
            type: "dropdown"
        },


        {
            field: "input_filter",
            options: null,
            fieldName: "",
            type: "enterable"
        },

        {
            field: "sub_logic",
            options: [
                { "and": 1 },
                { "or": 2 },
                { "not": 3 },
            ],
            fieldName: "sublogic",
            type: "dropdown"
        },

    ]







    let buttonStyle = {
        "color": "#1c74bd",
        "border": "1px solid blueviolet",
        "width": "50%",
    }

    const addData = () => {
        // setAdd(data)
    }

    let wdthStyle = (width) => {
        return ({
            ...props.style,
            width: width + '%',
        })
    }
    let HideModal = () => {
        props.toggleMode()
    }

    let saveFilterData = (event) => {

        setFilter((obj) => {
            return {
                ...obj,
                [event.target.name]: event.target.value

            }
        })

    }

    // let data = <React.Fragment>
    //     <div className="alldrop-search">
    //         <select className="DropDown" onChange={saveFilterData} style={wdthStyle(100)}>
    //             {props.form_info.form_data?.map((value) => {
    //                 return <option value={value.label}>{value.label}</option>
    //             })}
    //         </select>

    //         <select className="DropDown" name="operator" onChange={saveFilterData} style={wdthStyle(100)}>
    //             {Object.entries(operators)?.map(([key, value]) => {
    //                 return <option value={value}>{key}</option>
    //             })}


    //         </select>
    //         <input type="text" style={wdthStyle(100)} />
    //         <select className="DropDown" style={wdthStyle(100)}>
    //             <option>none</option>
    //             <option>and</option>
    //             <option>or</option>
    //             <option>and</option>
    //         </select>
    //         <div className="btndel">
    //             <AiFillDelete size="30px" />
    //         </div>
    //     </div>
    // </React.Fragment>





    let data =
        <React.Fragment>
            {allData.map((value, index) => {
                return (<>
                    {value.type == "dropdown" ?
                        <select className="DropDown" key={index} name={value.fieldName} onChange={saveFilterData} style={wdthStyle(100)}>
                            {value?.options?.length > 0 ?
                                value?.options?.map((option) => {
                                    return (<>
                                        {!option.label ?
                                            Object.entries(option).map(([keyPair, valuePair]) => {
                                                return (
                                                    <>
                                                        <option disabled hidden selected>Select an Option</option>
                                                        <option value={valuePair}>{keyPair}</option>
                                                    </>)
                                            }) :
                                            <>
                                                <option disabled hidden selected>Select an Option</option>
                                                <option value={option.field}>{option.label}</option>
                                            </>
                                        }
                                    </>)
                                })
                                : <></>
                            }
                        </select> : <input placeholder='Enter some Text' name="value" type="text" value={filter.value} onChange={saveFilterData} style={wdthStyle(100)} />}
                </>)
            })}
        </React.Fragment>








    let AddList = () => {
        setList([...list, data])

    }




    let saveList = () => {


        let response = axios.post(`${BASE_URL}/listfilters/`, filter, { headers: HEADERS.AUTHENTIC() })

    }

    let resetFilter = () => {
        // setList({ "list": props.listForm.results[0].list.id, "logic": null, "sublogic": null })
        setList({ "list": props?.listForm?.results[0]?.list?.id, "logic": null, "sublogic": null })
    }




    const deleteRow = (index) => {
        let newElee = [...list]
        newElee.splice(index, 1)
        setList([...newElee])
    }


    let filterRows =
        list?.length != 0 ?
            list?.map((value, index) => {

                return (
                    <React.Fragment key={index}>
                        <div className="alldrop-search" id={index} key={index}>

                            {value}
                            <div className="btndel" key={index}>
                                < RiDeleteBinLine color='#267abf' size="30px" style={{ "cursor": "pointer" }} onClick={() => { deleteRow(index) }} />
                            </div>
                        </div>
                    </React.Fragment>
                )
            }) : <>
                <div style={{ marginTop: "150px", color: "grey" }}><center>Click on Plus Icon to add Filters</center></div></>





    // let mapData = data.map((value, index) => {

    //     return (<>




    //         <React.Fragment>
    //             <div className="alldrop-search">
    //                 <select className="DropDown" onChange={saveFilterData} style={wdthStyle(100)}>
    //                     {props.form_info.form_data?.map((value) => {
    //                         return <option value={value.label}>{value.label}</option>
    //                     })}
    //                 </select>

    //                 <select className="DropDown" name="operator" onChange={saveFilterData} style={wdthStyle(100)}>
    //                     {Object.entries(operators)?.map(([key, value]) => {
    //                         return <option value={value}>{key}</option>
    //                     })}


    //                 </select>
    //                 <input type="text" style={wdthStyle(100)} />
    //                 <select className="DropDown" style={wdthStyle(100)}>
    //                     <option>none</option>
    //                     <option>and</option>
    //                     <option>or</option>
    //                     <option>and</option>
    //                 </select>
    //                 <div className="btndel">
    //                     <AiFillDelete size="30px" />
    //                 </div>
    //             </div>
    //         </React.Fragment >


    //     </>)
    // })
    // let aBC = list.map((value) => {
    // })




    let ModalHeader = <Wrapper style={{
        width: '100%', display: "flex", "flex-direction": "column", "align-items": "center", "gap": "15px", "padding": "10px"
    }}>
        <label style={{ marginLeft: 10, fontSize: 26, fontWeight: 'bold', color: "#1c74bd" }} >

        </label>
        <div className="Advance-Icons">
            <div style={buttonStyle} ><Icon icon='fa-solid fa-check fa-xl' style={{ "padding": "17px 3px" }} clickHanlder={saveList} /></div>
            <div style={buttonStyle} ><Icon icon='fa-solid fa-xmark fa-xl' style={{ "padding": "17px 9px" }} clickHanlder={HideModal} /></div>
            <div style={buttonStyle} ><Icon icon="fa-solid fa-rotate fa-xl" style={{ "padding": "17px 4px" }} clickHanlder={resetFilter} /></div>
            <div style={buttonStyle} ><Icon icon='fa-solid fa-plus fa-xl' style={{ "padding": "17px 4px" }} clickHanlder={AddList} /></div>
        </div>
    </Wrapper >





    return (
        <>
            <CustomModal modalheader={ModalHeader} style={{ width: "50%", height: "50%" }} display={true} onAdd={addData} title={'in this'} modalbody={filterRows} loseBtn={true} />
        </>
    )

}

const mapStateToProps = state => {

    return {
        form_info: state.sysData.form_info,

    };
};


const mapDispatchToProps = {
    getFormData
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchIcon);