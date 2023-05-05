import React, { useState, useCallback, useEffect } from 'react'
import { FormItem } from './FormItem'
import {
    getFormInfo,
    getFields
} from '../../actions/system'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import ListLayout from '../entities/ListLayout'

let borderStyle = {
    border: '1px',
    borderStyle: 'dashed',
    padding: '10px',
    paddingTop: '20px',
    marginTop: '30px'
}

const Droppable = (props) => {

    const [fields, setFields] = useState([])

    let indexedFieldList = (fields) => {
        let new_field_list = []
        let grouped_items = groupByMake(fields, 'section', 'section_title')
        Object.keys(grouped_items).map((fieldGrp, inx) => {
            let column_grouped = groupByMake(grouped_items[fieldGrp], 'column', '')
            Object.keys(column_grouped).map((columnGrp, indx) => {
                column_grouped[columnGrp].map((columnField, inddx) => {
                    new_field_list.push(columnField)
                })
            })
        })
        setFields(new_field_list)
    }

    useEffect(() => {
        if ((props.form_info).length > 0) {
            if (props.form_info[0].form_data != undefined)
                indexedFieldList(props.form_info[0].form_data)
        }
    }, [props.form_info])

    const movePetListItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = fields[dragIndex]
            const hoverItem = fields[hoverIndex]
            // Swap places of dragItem and hoverItem in the fields array
            setFields(fields => {
                const updatedFields = [...fields]
                updatedFields[dragIndex] = hoverItem
                updatedFields[hoverIndex] = dragItem
                return updatedFields
            })
        },
        [fields],
    )

    const groupByMake = (arr = [], key, key2) => {
        let result = [];
        if (arr.length > 0) {
            result = arr.reduce((r, a) => {
                let divider = a[key]
                if (key2 != '' && key2 != null) {
                    divider = a[key][key2]
                }
                r[divider] = r[divider] || [];
                r[divider].push(a);
                return r;
            }, Object.create(null))
        };
        return result;
    };

    let grouped_items = groupByMake(fields, 'section', 'section_title')

    let index = -1

    let formSkelton = Object.keys(grouped_items).map((fieldGrp, inx) => {
        let column_grouped = groupByMake(grouped_items[fieldGrp], 'column', '')
        return (
            <div className='row' key={inx} style={borderStyle}>
                <div className='row' >
                    <input className='section' value={fieldGrp} style={{ background: 'hsl(240deg 6% 87%)', border: 'none' }} onChange={() => { }} />
                </div>
                {Object.keys(column_grouped).map((columnGrp, indx) => {
                    return (
                        <div className='col-6'>
                            {column_grouped[columnGrp].map((columnField, inddx) => {
                                index += 1
                                return (
                                    <React.Fragment key={inddx}>
                                        <FormItem key={columnField.id}
                                            index={index}
                                            label={columnField.label}
                                            type={columnField.type}
                                            column={columnField.column}
                                            moveListItem={movePetListItem} />
                                    </React.Fragment>)
                            })}
                        </div>)
                })}
            </div>
            )
    })

    let listSkelton = (props.form_info).length > 0 ?
        props.form_info[0].form_list != undefined ?
            props.form_info[0].form_list.map((formList, indx) => {
                let columns = formList.list != null ? formList.list.columns : []
                let label = formList.list != null ? formList.list.label : ''
                return <div className='row' key={indx} style={borderStyle}>
                    <ListLayout title={label} changeMode={props.changeMode} tableMode={props.formMode}
                        loadFormData={props.loadFormData} headers={columns} type={'Customer'}
                        icon={formList.icon}
                        loadList={() => { }} rows={[]} />
                </div>
            }) :
            <></> : <></>

    let loadLayout = (event) => {
        props.getFormInfo('?form=' + event.target.value).then(() => { }) //props.list_info.form.id
    }

    return (
        <React.Fragment>
            <label>Select Layout</label>
            <select style={{ margin: '10px' }} onChange={loadLayout}>
                <option disabled selected>Choose Form</option>
                {props.menu_items.map((menuItem, inx) => {
                    let label = menuItem.list != null ? menuItem.list.form != null ? <option key={inx} >{menuItem.list.label}</option> : <></> : <></>
                    return <>{label}</>
                })}
            </select>
            <Button variant="primary" style={{ float: 'right' }} disabled>Save</Button>
            {formSkelton}
            {listSkelton}
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        menu_items: state.sysData.menu_items,
        form_info: state.sysData.form_info,
        field_items: state.sysData.field_items
    };
};

const mapDispatchToProps = {
    getFormInfo, getFields
}

export default connect(mapStateToProps, mapDispatchToProps)(Droppable);