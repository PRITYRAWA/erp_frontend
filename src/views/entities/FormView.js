import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import axios from 'axios';
import {
    getFormData,
    getFields
} from '../../actions/system'
import { HEADERS } from '../../config/appHeaders';
import { Card, Wrapper, Input, Label, FormHeader, Table, ListHeader, TableHeader } from '../../components'
import SubListView from './SubListView';
import "../../App.css"
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { BASE_URL } from '../../config/api';


function FormView(props) {




    const param = useParams()


    const [form_info, setFormInfo] = useState({})
    const [formData, setFormData] = useState({})
    const [updateData, setUpdateData] = useState({})
    const [isFormValid, setIsFormValid] = useState(true);
    const [selected, setSelected] = useState();
    const [choices, setChoices] = useState()
    const [formDataLoaded, setFormDataLoaded] = useState()

    let iconColor = { 'Normal': '#50C878', 'Urgent': '#F75D59', 'Warning': 'yellow', 'no': 'black' }

    let titleStyle = {
        fontWeight: 'bold',
        fontSize: 33,
        marginLeft: 20
    }

    let imgStyle = {
        width: 45
    }

    // useEffect(() => {
    //     if ((props.listForm.results).length > 0) {
    //         props.getFormData(param.form_id).then(() => { })
    //     }
    //     }
    // }, [param.form_id])



    // useEffect(() => {
    //     if ((props.listForm.results).length > 0) {
    //         setFormInfo(props.form_info)
    //     } else {
    //         setFormInfo({})
    //     }
    // }, [props.form_info])



    useEffect(() => {
        if ((props.listForm.results).length > 0) {
            // if ((props.listForm.results).length > 0 && props.formMode == "view") {
            // if ((props.listForm.results).length > 0 && props.formMode == "view") {
            // if ((props.listForm.results).length > 0 && (props.formMode == "edit" || props.formMode == "add")) {
            props.getFormData(props.form_id).then(() => { })
        }
    }, [props.listForm])



    useEffect(() => {
        setFormDataLoaded(form_info.form_data)
    }, [form_info])




    useEffect(() => {
        if ((props.listForm.results).length > 0) {
            setFormInfo(props.form_info)
        }
        else {
            setFormInfo({})
        }
    }, [props.form_info])




    useEffect(() => {
        if (Object.keys(props.dataObj).length !== 0) {
            setFormData(props.dataObj)
            if (props.dataObj.id != undefined)
                setUpdateData({ id: props.dataObj.id })
        }
    }, [props.dataObj])



    const getChildId = (event) => {
        const { value } = event.target
        return value

    }


    let dropDownFields

    let allData = []

    async function fetchDropdownOptions() {
        if (form_info.form_data == undefined || form_info.form_data == null) {
            let formData = await axios.get(`${BASE_URL}/forms/${props.form_id}/`, { headers: HEADERS.AUTHENTIC() })
            dropDownFields = await formData.data.form_data.filter((item) => {
                return item.type == "dropdown" && item.link !== null
            })


            for (const dropdown of dropDownFields) {
                if (dropdown.parent_field === null && dropdown.link) {
                    try {
                        let response = await axios.get(dropdown.link, { headers: HEADERS.AUTHENTIC() });
                        response.data.results.map((value) => {
                            value.parentId = dropdown.id
                        })
                        updateItem(dropdown.id, 'choices', response.data.results, formData.data.form_data)

                        if (response.data.next !== null) {
                            for (let i = response.data.nextPageNumber; i <= response.data.pages; i++) {

                                let changedLink = response.data.next.split("")
                                changedLink[changedLink.length - 1] = i
                                let newLink = changedLink.join("")
                                let nextPageData = await axios.get(newLink, { headers: HEADERS.AUTHENTIC() });


                                nextPageData.data.results.map((value) => {
                                    value.parentId = dropdown.id
                                })
                                allData = [...allData, ...nextPageData.data.results]


                            }
                        }
                        updateItem(dropdown.id, 'choices', allData, formData.data.form_data)
                    } catch (error) {
                        console.error(error);
                    }

                }
            }
        }
        else {

            dropDownFields = form_info.form_data.filter((item) => {
                return item.type == "dropdown" && item.link !== null
            })


            for (const dropdown of dropDownFields) {
                if (dropdown.parent_field === null && dropdown.link) {
                    try {
                        let response = await axios.get(dropdown.link, { headers: HEADERS.AUTHENTIC() });
                        // let response = await axios.get(  { headers: HEADERS.AUTHENTIC() });
                        response.data.results.map((value) => {
                            value.parentId = dropdown.id
                        })
                        updateItem(dropdown.id, 'choices', response.data.results, form_info.form_data)

                        if (response.data.next !== null) {
                            for (let i = response.data.nextPageNumber; i <= response.data.pages; i++) {
                                let changedLink = response.data.next.split("")
                                changedLink[changedLink.length - 1] = i
                                let newLink = changedLink.join("")
                                let nextPageData = await axios.get(newLink, { headers: HEADERS.AUTHENTIC() });


                                nextPageData.data.results.map((value) => {
                                    value.parentId = dropdown.id
                                })
                                allData = [...allData, ...nextPageData.data.results]
                            }
                        }
                        updateItem(dropdown.id, 'choices', allData, form_info.form_data)
                    } catch (error) {
                        console.error(error);
                    }

                }
            }
        }

    }



    useEffect(() => {
        if (props.formMode === "edit" || props.formMode === "add") {
            fetchDropdownOptions()

        }
    }, [props.formMode]);






    let newChoice = []

    const updateItem = async (id, whichvalue, newvalue, dropDownFields) => {


        // This is for the data with choices 
        if (newvalue?.length != 0) {
            newChoice = [...newChoice, ...newvalue]
            let newChoicesData = newChoice.filter((value) => {
                return value.parentId === id
            })


            //add the choices in that specific form_data
            let index = dropDownFields.findIndex(x => x.id === id);
            if (index !== -1) {

                let temporaryarray = dropDownFields.slice();
                temporaryarray[index][whichvalue] = newChoicesData;
                setFormInfo(prev => { return { ...prev, form_data: temporaryarray } })
            }

        }
        // This is for the data with NO-choices 
        else {

            //add the NO-choices in that specific form_data

            let index = dropDownFields.findIndex(x => x.id === id);
            let temporaryarray = dropDownFields.slice();
            if (index !== -1) {

                temporaryarray[index][whichvalue] = []
                setFormInfo(prev => { return { ...prev, form_data: temporaryarray } })



            }

        }

    }





    const DataFetched = (e, data) => {

        if (data.choices === null) {
            if (data.link) {
                async function Data() {
                    let dataVar = await axios.get(`${data.link}`, { headers: HEADERS.AUTHENTIC() })
                    // let response = await dataVar.data
                    let response = await dataVar.data.results
                    // data.choices = response
                    if (response) {
                        updateItem(data.id, 'choices', response, form_info.form_data)
                    }
                }
                Data()
            }
        }
    }




    let addChangeHandler = (event, name, fieldIsValied, data) => {
        const { value } = event.target;
        let sepIndex = (name).indexOf('.')
        if (sepIndex !== -1) {
            let outerKey = name.substring(0, sepIndex)
            let innerKey = name.substring(sepIndex + 1, name.length)
            if (formData[outerKey] != undefined) {
                setFormData(formData => ({ ...formData, [outerKey]: { ...formData[outerKey], [innerKey]: value } }))
            } else {
                setFormData(formData => ({ ...formData, [outerKey]: { [innerKey]: value } }))
            }
        } else {
            setFormData(formData => ({ ...formData, [name]: value }))
        }
        if (data.child_field) {
            const childLink = form_info.form_data.filter((item) => {
                if (item.field === data.child_field)
                    return item
            })
            async function childChoices(value, link) {
                let form_data = [...form_info.form_data]
                let childData = []
                let dataVar = await axios.get(`${link}${value}`, { headers: HEADERS.AUTHENTIC() })
                let response = dataVar.data.results
                let responseOne = dataVar.data
                response.map((value) => {
                    value.parentId = childLink[0].id
                })
                childData = [...childData, ...response]

                //For loop will automatically request all the pagination data in the child-choices
                if (responseOne.next != null) {
                    for (let i = responseOne.nextPageNumber; i <= responseOne.pages; i++) {
                        let changedLink = responseOne.next.split("")
                        changedLink[changedLink.length - 1] = i
                        let newLink = changedLink.join("")
                        let nextPageData = await axios.get(newLink, { headers: HEADERS.AUTHENTIC() });
                        nextPageData.data.results.map((value) => {
                            value.parentId = childLink[0].id
                        })
                        // allData = [...allData, ...nextPageData.data.results]
                        childData = [...childData, ...nextPageData.data.results]
                    }
                    updateItem(childLink[0].id, 'choices', childData, form_data)

                }
                else {
                    updateItem(childLink[0].id, 'choices', childData, form_data)

                }
            }
            // childChoices(value, childLink[0]?.link)
            // if (childLink[0].link !== undefined || childLink[0].link !== null)
            childChoices(value, childLink[0]?.link)

        }

        // setIsFormValid(fieldIsValied);
    }
    let editChangeHandler = (event, name, fieldIsValied, data) => {
        const { value } = event.target;
        let sepIndex = (name).indexOf('.')
        if (sepIndex !== -1) {
            let outerKey = name.substring(0, sepIndex)
            let innerKey = name.substring(sepIndex + 1, name.length)
            if (formData[outerKey] != undefined) {
                setFormData(formData => ({ ...formData, [outerKey]: { ...formData[outerKey], [innerKey]: value } }))
                setUpdateData(updateData => ({ ...updateData, [outerKey]: { ...updateData[outerKey], [innerKey]: value } }))
            } else {
                setFormData(formData => ({ ...formData, [outerKey]: { [innerKey]: value } }))
                setUpdateData(updateData => ({ ...updateData, [outerKey]: { [innerKey]: value } }))
            }
        } else {
            setFormData(formData => ({ ...formData, [name]: value }))
            setUpdateData(updateData => ({ ...updateData, [name]: value }))
        }
        if (data.child_field !== undefined) {
            const childLink = form_info.form_data.filter((item) => {
                if (item.field === data.child_field)
                    return item
            })


            async function childChoices(value, link) {
                let childData = []
                let dataVar = await axios.get(`${link}${value}`, { headers: HEADERS.AUTHENTIC() })
                let response = dataVar.data.results
                let responseOne = dataVar.data
                response.map((value) => {
                    value.parentId = childLink[0].id
                })
                childData = [...childData, ...response]

                //For loop will automatically request all the pagination data in the child-choices

                if (responseOne.next != null) {
                    for (let i = responseOne.nextPageNumber; i <= responseOne.pages; i++) {
                        let changedLink = responseOne.next.split("")
                        changedLink[changedLink.length - 1] = i
                        let newLink = changedLink.join("")
                        let nextPageData = await axios.get(newLink, { headers: HEADERS.AUTHENTIC() });
                        nextPageData.data.results.map((value) => {
                            value.parentId = childLink[0].id
                        })
                        childData = [...childData, ...nextPageData.data.results]
                    }
                    updateItem(childLink[0].id, 'choices', childData, form_info.form_data)

                }
                else {
                    updateItem(childLink[0].id, 'choices', childData, form_info.form_data)

                }
            }
            if (childLink[0]?.link !== undefined || childLink[0]?.link !== null)

                childChoices(value, childLink[0]?.link)
            //     const childRes = childChoices(value,childLink[0].link)
            //     setDropdata(prevState => ({...prevState , child : childLink}))
            //     if(childRes !== null && childRes !== undefined){
            //      updateItem(childLink[0].id , form_info.form_data.choices ,dropdata.child )
            //    }
        }
        // setIsFormValid(fieldIsValied);
    }


    let manageFieldData = (dataObj, field, fieldType) => {
        let fieldKey = field.field
        // if (field.data) {
        //     fieldKey = field.data.field
        // }
        if (field.data === "" || field.data === null)
            fieldKey = field.label

        let sepIndex = fieldKey && (fieldKey).indexOf('.')
        let dataMap = ''
        if (fieldType == 'composite') {
            let compFields = fieldKey && fieldKey.split('+')
            if (compFields) {
                compFields.map((field, indx) => {
                    if (dataObj[field] != null && dataObj[field] != '')
                        dataMap = dataObj[field] + ' '
                })
            }

        }
        else {
            dataMap = dataObj[fieldKey]
        }
        if (sepIndex !== -1 && fieldKey !== undefined && fieldKey !== null) {
            dataMap = dataObj[(fieldKey).substring(0, sepIndex)]
            if (dataMap != null)
                dataMap = dataMap[(fieldKey).substring(sepIndex + 1, fieldKey.length)]
        }

        if (fieldKey === 'created_time' || fieldKey === 'modified_time' || fieldKey === 'used') {
            dataMap = (new Date(dataObj[fieldKey])).toLocaleDateString('en-US')
        }
        return dataMap

    }

    //Comparer Function    
    let GetSortOrder = (key, nkey) => {
        return function (a, b) {
            if (a[key] != null && b[key] != null) {
                if (a[key][nkey] > b[key][nkey]) {
                    return 1;
                } else if (a[key][nkey] < b[key][nkey]) {
                    return -1;
                }
            }
            return 0;
        }
    }

    const groupByMake = (arr = [], key, key2) => {
        arr = arr.sort(GetSortOrder('section', 'section_sequence'))


        let result = [];
        if (arr.length > 0) {
            result = arr.reduce((r, a) => {
                let divider = a[key]
                if (key2 != '' && key2 != null && a[key] != null) {
                    divider = a[key][key2]
                }
                r[divider] = r[divider] || [];
                r[divider].push(a);
                return r;
            }, Object.create(null))
        };
        return result;
    };

    let GetSortOrderRoot = (key) => {
        return function (a, b) {
            if (a[key] != null && b[key] != null) {
                if (a[key] > b[key]) {
                    return 1;
                } else if (a[key] < b[key]) {
                    return -1;
                }
            }
            return 0;
        }
    }

    const groupByDataMultipleKeys = (data = [], key) => {
        if (data && data.length > 0) {
            let groupedData = data.reduce(function (item, a) {
                let keyVal = '';
                for (let i = 0; i < key.length; i++) {
                    keyVal += (a[key[i]]);
                    if ((i + 1) < key.length) {
                        keyVal += '-';
                    }
                }

                item[keyVal] = item[keyVal] || [];
                item[keyVal].push(a);
                return item;
            }, Object.create(null));
            return groupedData;
        }
        else {
            return {

            };
        }
    }

    const updateRecord = () => {
        // if (isFormValid)
        //     props.updateRecord(updateData);
        // else if (!isFormValid && Object.keys(updateData).length <= 1) {
        //     alert('Please make some changes to save.');
        // }
        // else {
        //     alert('Form Invalid');
        // }
        props.updateRecord(updateData);

    }

    const saveRecord = () => {
        // if (isFormValid)
        //     props.saveRecord(formData);
        // else {
        //     alert('Form Invalid');
        // }
        props.saveRecord(formData);

    }
    const collapseList = (e, index) => {
        let divEle = document.getElementById(`row-${index}`)
        let arrow = document.getElementById(`arrow-${index}`)

        if (divEle.style.display == "none") {
            // arrow.style.transform = "rotate(180deg)";
            arrow.style.transform = "rotate(1turn)";
            arrow.style.padding = "0px 8px 0px 5px"
            divEle.style.display = ""

        }
        else {

            arrow.style.padding = "0px 8px 0px 5px"
            arrow.style.transform = "rotate(-0.50turn)";
            // arrow.style.transform = "rotate(360deg)";
            divEle.style.display = "none"
        }

    }

    let pageHeaderItems = [];
    if (form_info.form_data && form_info.form_data.length > 0) {
        pageHeaderItems = form_info.form_data.filter(item => {
            return item.is_heading == true;
        });
    }

    pageHeaderItems.sort(GetSortOrderRoot('sequence'));
    let column_pageHeaderItems = groupByDataMultipleKeys(pageHeaderItems, ['sequence']);

    let pageHeaderSkelton = Object.keys(column_pageHeaderItems).map((colGrpHeader, inx) => {
        let items = column_pageHeaderItems[colGrpHeader];
        return (
            <div className='page-Header'>
                {
                    items.map((item, indx) => {
                        let dataMap = manageFieldData(formData, item, item.data.field_type)
                        return (
                            <div>
                                {
                                    <label style={titleStyle}> {typeof (dataMap) === 'object' && dataMap !== null ? dataMap.system_name : dataMap}</label>
                                }
                            </div>
                        )
                    })
                }
            </div>)
    })

    let otherFormItems = [];
    if (form_info.form_data && form_info.form_data.length > 0) {
        otherFormItems = form_info.form_data.filter(item => {
            return !item.is_heading;
        });
    }

    let getPaginationData = (data) => {


    }

    let grouped_items = groupByMake(otherFormItems, 'section', 'section_title')

    let FormSkelton = Object.keys(grouped_items).map((fieldGrp, inx) => {
        let column_grouped = groupByMake(grouped_items[fieldGrp], 'column', '');
        return (
            <>

                <div className='row' key={inx} >
                    {fieldGrp != null && fieldGrp != undefined && fieldGrp != 'null' ?
                        <div className='Collapse-List' >
                            <div className="post">
                                <i class="fa-sharp fa-solid fa-caret-down fa-2x fa-border-padding" id={`arrow-${inx}`} style={{ cursor: "pointer" }} onClick={(e) => { collapseList(e, inx) }}></i></div>
                            <label className='section'><i>{fieldGrp}</i><span className="line"></span></label>
                        </div> :
                        <div className='Collapse-List'>
                            {/* <div className="post">
                            <i class="fa-sharp fa-solid fa-caret-down fa-2x arrow" id={`arrow-${inx}`} style={{ cursor: "pointer" }} onClick={(e) => { collapseList(e, inx) }}></i></div>
                            <label className='section'><i>Others</i><span className="line"></span></label> */}
                            {/* <div className="post">
                                <i class="fa-sharp fa-solid fa-caret-down fa-2x arrow" id={`arrow-${inx}`} style={{ cursor: "pointer" }} onClick={(e) => { collapseList(e, inx) }}></i></div> */}
                            <label className='section'><i></i><span className="line"></span></label>
                        </div>}
                    <div className="row" id={`row-${inx}`} key={inx}  >



                        {Object.keys(column_grouped).map((columnGrp, indx) => {
                            let columnGroupedItems = column_grouped[columnGrp];
                            columnGroupedItems = columnGroupedItems.sort(GetSortOrderRoot('sequence'));
                            let column_groupedSeq = groupByDataMultipleKeys(columnGroupedItems, ['sequence']);
                            return (

                                <div className='col-md-6 fltlft' style={{ width: "45%" }} key={'row-column-' + inx + '-' + indx}>
                                    {Object.keys(column_groupedSeq).map((columnGrpSeq, indxSeq) => {

                                        const itemLength = column_groupedSeq[columnGrpSeq].length;
                                        let colValue = 12 / (itemLength == 0 ? 1 : itemLength);
                                        if (fieldGrp == null || fieldGrp == 'null') {
                                            colValue = 12;
                                        }
                                        let items = column_groupedSeq[columnGrpSeq];
                                        items = items.sort(GetSortOrderRoot('sequence'))
                                        let labelNamesList = [];
                                        return (
                                            <div className='row row-style' key={'column-' + indx + '-' + indxSeq}>
                                                {items.map((columnFieldSeq, idexSeq) => {
                                                    let labelHeading = columnFieldSeq.display_label ? columnFieldSeq.display_label : columnFieldSeq.label;
                                                    let heading = labelHeading ? ((labelHeading).charAt(0)).toUpperCase() + ((labelHeading).slice(1)).replace('_', ' ') : <></>
                                                    let dataMap = manageFieldData(formData, columnFieldSeq, columnFieldSeq.type)
                                                    let fieldName = columnFieldSeq.field
                                                    let fieldWdth = '25%'
                                                    if (fieldName == '' || fieldName == null)
                                                        fieldName = columnFieldSeq.data
                                                    if (fieldName == 'entity' && dataMap == '1')
                                                        dataMap = 'Individual'
                                                    if (fieldName == 'entity' && dataMap == '2')
                                                        dataMap = 'Company'

                                                    let displayHeading = true;
                                                    if (labelNamesList.indexOf(heading) < 0) {
                                                        labelNamesList.push(heading);
                                                    }
                                                    else {
                                                        displayHeading = false;
                                                    }


                                                    let fieldIsRequired = columnFieldSeq.data ? (columnFieldSeq.data.field_type != "read-only" && columnFieldSeq.validations && columnFieldSeq.validations.required) ? true : false : <></>
                                                    return (
                                                        <div className={'col-md-' + colValue + ' fltlft'} >
                                                            <React.Fragment key={'Fragment' + columnFieldSeq.id}>
                                                                {displayHeading ?
                                                                    <div>
                                                                        <Label label={heading} class='formLabel' parentClass='fieldRtl col-md-6 fltlft' />
                                                                        {fieldIsRequired ? <span>*</span> : ""}
                                                                    </div>
                                                                    : ""}
                                                                {props.formMode === 'view' ?

                                                                    typeof (dataMap) === 'object' && dataMap !== null ?
                                                                        <Label label={dataMap.system_name} class='formValue' parentClass='fieldValue col-md-6 fltlft' /> :
                                                                        <Label label={dataMap} class='formValue' parentClass='fieldValue col-md-6 fltlft' /> :
                                                                    props.formMode === 'edit' ?
                                                                        columnFieldSeq.link !== null ?
                                                                            <div className='fieldWrap col-md-6 fltlft'>
                                                                                <Input
                                                                                    getPaginationData={getPaginationData}
                                                                                    choices={columnFieldSeq.choices}
                                                                                    link={columnFieldSeq.link}
                                                                                    label={columnFieldSeq.field}
                                                                                    type={columnFieldSeq.type}
                                                                                    class='formInput'
                                                                                    value={dataMap}
                                                                                    // selected={selected}
                                                                                    onClick={(e) => { DataFetched(e, columnFieldSeq) }}
                                                                                    onChange={(event, fieldIsValied) => { editChangeHandler(event, fieldName, fieldIsValied, columnFieldSeq) }} />
                                                                            </div> :
                                                                            columnFieldSeq.type === 'readable' ?
                                                                                <span>{dataMap}</span> :
                                                                                //
                                                                                <div className='fieldWrap col-md-6 fltlft'>
                                                                                    <Input field_label={columnFieldSeq.label}
                                                                                        label={columnFieldSeq.field}
                                                                                        data_type={columnFieldSeq.data_type}
                                                                                        type={columnFieldSeq.type}
                                                                                        class='formInput'
                                                                                        validations={columnFieldSeq.validations}
                                                                                        value={dataMap}
                                                                                        onChange={(event, fieldIsValied) => { editChangeHandler(event, fieldName, fieldIsValied) }} />
                                                                                </div> :
                                                                        <div className='fieldWrap col-md-6 fltlft'>
                                                                            <Input field_label={columnFieldSeq.label}
                                                                                getPaginationData={getPaginationData}
                                                                                choices={columnFieldSeq.choices}
                                                                                label={columnFieldSeq.field}
                                                                                data_type={columnFieldSeq.data_type}
                                                                                type={columnFieldSeq.type}
                                                                                class='formInput'
                                                                                validations={columnFieldSeq.validations}
                                                                                value={formData[fieldName]}
                                                                                // selected={selected}
                                                                                onClick={(e) => { DataFetched(e, columnFieldSeq) }}
                                                                                onChange={(event, fieldIsValied) => { addChangeHandler(event, fieldName, fieldIsValied, columnFieldSeq) }} />
                                                                        </div>
                                                                }
                                                            </React.Fragment>
                                                        </div>
                                                    )
                                                })
                                                }
                                            </div>
                                        )

                                    })}

                                </div>)
                        })}
                    </div></div></>)
    })
    let iconStage = formData.stage != undefined ? formData.stage.stage : 'no'
    let formLists = form_info.form_list != undefined ? form_info.form_list.filter(formList => formList.relation = 'parent') : []
    console.log("JVGULDV", form_info.form_list)
    return (
        <Wrapper>
            <></>

            <>

                {props.formMode === 'edit' ?
                    <FormHeader rows={props.rows} recordID={props.recordID} changeMode={props.changeMode} formMode={props.formMode} disableSave={!isFormValid}
                        recControl={(formID) => { props.loadFormData(formID) }} saveRecord={() => updateRecord()} handleDeactivateForm={() => props.handleDeactivateForm()} /> :
                    <FormHeader rows={props.rows} recordID={props.recordID} changeMode={props.changeMode} formMode={props.formMode} disableSave={!isFormValid}
                        recControl={(formID) => { props.loadFormData(formID) }} saveRecord={() => saveRecord()} />}
                {props.formDataPendingReq == true ?
                    <Loader size={"265px"} /> :

                    <>

                        <Card top={20} style={{ minHeight: '200px' }}>
                            <></>
                            {/* {props.formDataPendingReq == true ? */}
                            {/* <Loader size={"39px"} /> : */}
                            {/* <> */}
                            <div className='page-Header-Skelton'>
                                <div class="icon">{form_info.icon != undefined && form_info.icon != '' ? <img style={imgStyle} src={form_info.icon}></img> : ""}</div>
                                <div class="col-md-10">{pageHeaderSkelton}</div>
                            </div>
                            <br></br><br></br>


                            {FormSkelton}

                            {/* </>} */}
                        </Card>
                        {formLists.map((formList, indx) => {
                            let columns = formList.list != null ? formList.list.columns.filter(option => option.visibility == "default" || option.visibility == "required") : []
                            let label = formList.list != null ? formList.list.label : ''
                            let rows = props.lists.length != undefined ? props.lists.filter(record => record.type == formList.relation) : []
                            return <React.Fragment key={indx}>
                                <Wrapper>
                                    <></>

                                    <SubListView title={label} data_source={props.data_source} changeMode={props.changeMode} tableMode={props.formMode}
                                        loadFormData={props.loadFormData} headers={columns} type={formList.relation}
                                        icon={formList.icon}
                                        loadList={props.loadList} rows={props.rows} />
                                </Wrapper>

                            </React.Fragment>
                        })}
                    </>}


            </>
        </Wrapper>
    );
}

const mapStateToProps = state => {

    return {
        form_info: state.sysData.form_info,
        field_items: state.sysData.field_items,
        listForm: state.sysData.listForm,
        formDataPendingReq: state.sysData.formDataPendingReq,

    };
};


const mapDispatchToProps = {
    getFormData, getFields
}

export default connect(mapStateToProps, mapDispatchToProps)(FormView);