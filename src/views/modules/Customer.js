import React, { useEffect, useState, useSyncExternalStore } from "react";
import { connect } from 'react-redux';

import {
  getCustomers,
  getAddresses,
  getCustomerData,
  createCustomer,
  updateRecord,
} from '../../actions/app'

import { Card, Wrapper, Input, Label, FormHeader, Table, ListHeader, TableHeader, Modal, Dropdown } from '../../components'
import FormView from "../entities/FormView";
import ListView from "../entities/ListView";

function Customer(props) {


  const [customer, setCustomers] = useState({ cust_list: [], cust_id: null, cust_json: { 'entity': '1' } });
  const [lists, setLists] = useState([])
  const [formMode, setFormMode] = useState('list');


  useEffect(() => {
    props.getCustomers('/').then(() => { })
  }, [])

  useEffect(() => {
    if ((props.cust_list) != undefined) {
      setCustomers(customer => ({ ...customer, cust_list: props.cust_list }))
    }
  }, [props.cust_list])

  let setAddressType = (custData) => {
    if (custData['address'] != undefined) {

      custData['address'].type = 'customer'
    }
    return custData
  }

  let saveRecord = (custData) => {
    custData['other_address'] = lists
    custData['entity'] = '1'
    props.createCustomer(setAddressType(custData)).then(() => {
      props.getCustomers('/').then(() => {
        setFormMode('list')
      })
    })
  }

  let updateRecord = (custData) => {
    custData['entity'] = '1'
    custData['other_address'] = lists
    props.updateCustomer(setAddressType(custData), custData.id).then(() => {
      props.getCustomers('/').then(() => {
        setFormMode('list')
      })
    })
  }

  let searchByName = (name) => {
    function customerFetch(customer_filter) {
      props.getCustomers(customer_filter).then(() => { })
    }
    customerFetch('?name__contains=' + name)
  }

  let changeMode = (mode) => {
    if (mode === 'save') {
    } else if (mode === 'edit') {
      setFormMode(mode)
      setLists([])
    } else {
      setFormMode(mode)
    }
  }

  let loadList = (listType, listData) => {
    listData.type = listType
    setLists(lists => [...lists, listData])
  }


  let addValue = (event, field) => {
    const { value } = event.target;
    setCustomers(customer => ({ ...customer, cust_json: { ...customer.cust_json, [field]: value } }))
  }

  let loadFormData = (customerID) => {
    let cust = customer.cust_list.find(cust => cust.id === customerID);
    if (cust != undefined) {
      setLists(cust.other_address)
      setCustomers(customer => ({ ...customer, cust_json: cust, cust_id: cust.id }))
    }
    else {
      alert('No Matching Record Found')
    }
  }
  // alert(customer)


  let billingRows = lists.length != undefined ? lists.filter(address => address.type == 'Billing') : []

  let shippingRows = lists.length != undefined ? lists.filter(address => address.type == 'Shipping') : []

  let contactRows = customer.cust_json['address'] != undefined ? Object.keys(customer.cust_json['address']).length != 0 ? [customer.cust_json['address']] : [] : []

  return (

    <Wrapper>
      {formMode === 'list' ?
        <ListView title={props.list_info.label}
          menuToggle={props.menuToggle}
          searchByName={searchByName}
          changeMode={changeMode}
          loadFormData={loadFormData}
          data_source={props.list_info.data_source}
          headers={props.list_info.columns}
          rows={props.cust_list} /> :
        formMode === 'edit' || formMode === 'view' ?
          <Wrapper>
            {props.list_info.form != null ?
              <FormView recordID={customer.cust_id}
                icon={props.icon}
                form_id={props.list_info.form.id}
                loadFormData={loadFormData}
                dataObj={customer.cust_json}
                formMode={formMode}
                changeMode={changeMode}
                saveRecord={saveRecord}
                loadList={loadList}
                lists={lists}
                updateRecord={updateRecord} /> :
              <></>}
            <></>
          </Wrapper> :
          formMode === 'add' ?
            <Wrapper>
              <FormView recordID={customer.cust_id}
                icon={props.icon}
                form_id={props.list_info.form.id}
                loadFormData={loadFormData}
                dataObj={{}}
                formMode={formMode}
                changeMode={changeMode}
                saveRecord={saveRecord}
                loadList={loadList}
                lists={[]}
                updateRecord={updateRecord} />
              <></>
            </Wrapper> :

            <></>}
      <></>
    </Wrapper>
  );
}


const mapStateToProps = state => {
  return {
    cust_list: state.appData.customers,
    cust_data: state.appData.customerData,
    addresses: state.appData.addresses,
    cust_addr: state.appData.customerAddresses,
    list_items: state.sysData.list_items,
    column_items: state.sysData.column_items
  };
};


const mapDispatchToProps = {
  getCustomers, getCustomerData, createCustomer, getAddresses, updateRecord
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer);