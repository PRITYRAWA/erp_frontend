import React, { useState } from "react";
import CardWrapper from '../../components/wrappers/CardWrapper';
import Table from '../../components/lists/Table';
import CustomInput from '../components/CustomInput';
import CustomButton from '../../components/fields/CustomButton';
import CustomField from '../components/CustomLabel';


function Menu(props) {

  let searchStyle = {
    height: 30,
    width: 250,
    float: 'right'
  }

  let titleStyle = {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 5
  }

  let buttonStyle = {
    padding: 2,
    marginLeft: 2,
    width: 30,
    float: 'right'
  }

  return (
    <>
      {props.form_mode === 'list' ?
        <CardWrapper left={250} top={50}>
          <label style={titleStyle}>{props.form_name}</label>
          <CustomButton btn='' icon='fas fa-eye' style={buttonStyle} value='' clickHanlder={() => { }} />
          <CustomButton btn='' icon='fas fa-plus' style={buttonStyle} value='' clickHanlder={() => { }} />
          <CustomButton btn='' icon='fas fa-search' style={buttonStyle} value='' clickHanlder={() => { }} />
          <CustomInput label={'search for ' + props.form_name} class='formField' style={searchStyle} />
          <hr style={{ height: 2, marginTop: 10, color: 'gray', backgroundColor: 'gray' }} /><br></br>
          <Table headers={props.form_fields} rows={props.listData} changeMode={props.changeMode} loadFormData={props.loadFormData} />
        </CardWrapper> :
        props.form_mode === 'view' || props.form_mode === 'edit' ?
          <CardWrapper left={250} top={50}>
            <i className='fas fa-user'></i>
            <label style={titleStyle}>{props.form_data['form_name']}</label>
            {props.form_mode === 'view' ?
              <CustomButton btn='' icon='fas fa-pen' clickHanlder={props.changeMode} value='edit' style={buttonStyle} /> :
              <CustomButton btn='' icon='fas fa-save' clickHanlder={props.changeMode} value='view' style={buttonStyle} />}
            <CustomButton btn='' icon='fas fa-backward' clickHanlder={props.changeMode} value='list' style={buttonStyle} /><br></br>
            {props.form_fields.map((field, inx) => {
              let heading = ((field.name).charAt(0)).toUpperCase() + ((field.name).slice(1)).replace('_', ' ')
              return (
                <>
                  <CustomField label={heading} class='formLabel' parentClass='fieldRtl' key={inx} />
                  {props.form_mode === 'view' ?
                    <CustomField label={props.form_data[field.name]} class='formValue' parentClass='' /> :
                    <div className='fieldWrap'>
                      <CustomInput label={''} class='formInput' value={props.form_data[field.name]} />
                    </div>}
                </>)
            })}
          </CardWrapper> :
          <></>}
    </>
  );
}

export default Menu;