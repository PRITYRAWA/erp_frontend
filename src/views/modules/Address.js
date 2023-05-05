import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';

import { getAddresses } from '../../actions/app'

import { Card, Wrapper, Input, Label, FormHeader, Table, ListHeader, TableHeader } from '../../components'
import FormView from "../entities/FormView";
import ListView from "../entities/ListView";

function Address(props) {


  let AddressId = 1;
  const [address, setAddresss] = useState({ addr_list: [], addr_json: { 'entity': '1' } });
  const [formMode, setFormMode] = useState('list');


  useEffect(() => {
    props.getAddresses('/').then(() => {
    });
  }, [])


  

  useEffect(() => {
    if ((props.addresses) != undefined) {
      setAddresss(address => ({ ...address, addr_list: props.addresses }))
    }
  }, [props.addresses])

  let searchByName = (name) => {
    function addressFetch(address_filter) {
      props.getAddresses(address_filter).then(() => { })
    }
    addressFetch('?location__contains=' + name)
  }

  let changeMode = (mode) => {
    if (mode === 'save') {
      props.createAddress(Address.addr_json).then(() => {
        setFormMode('view')
      })
    } else if (mode === 'edit') {
      setFormMode(mode)

    } else {
      setFormMode(mode)
    }
  }


  let loadFormData = (addressID) => {
    let addr = address.addr_list.find(addr => addr.id === addressID);
    if (addr != undefined) {
      //setLists(cust.other_address)
      setAddresss(address => ({ ...address, addr_json: addr }))
    }
    else {
      alert('No Matching Record Found')
    }
  }

  return (

    <Wrapper>
      {formMode === 'list' ?
        <ListView title='Addresses'
          menu_id={props.menu.id}
          menuToggle={props.menuToggle}
          searchByName={searchByName}
          changeMode={changeMode}
          loadFormData={loadFormData}
          headers={props.column_items}
          rows={props.addresses} /> :
        formMode === 'add' || formMode === 'edit' || formMode === 'view' ?
          <FormView recordID={AddressId}
            icon='fas fa-home'
            menu_id={props.menu.id}
            loadFormData={loadFormData}
            dataObj={address.addr_json}
            formMode={formMode}
            changeMode={changeMode}
          /> :
          <></>}
      <></>
    </Wrapper>
  );
}


const mapStateToProps = state => {
  return {
    addresses: state.appData.addresses,
    list_items: state.sysData.list_items,
    column_items: state.sysData.column_items
  };
};


const mapDispatchToProps = {
  getAddresses
}

export default connect(mapStateToProps, mapDispatchToProps)(Address);