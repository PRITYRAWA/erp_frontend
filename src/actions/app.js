import axios from 'axios';

import {
  createAction,
  GET__CUSTOMERS, GET__CUSTOMER__DATA, GET__CUSTOMER__ADDRESS,
  POST__CUSTOMER__DATA, PUT__CUSTOMER__DATA,
  GET__USERS,
  GET__FORMS,
  GET__FIELDS,
  GET__ADDRESSES, GET__ADDRESS__DATA,
  GET__LIST__ROWS,  JSON_PLACEHOLDER,
} from './action';
import { HEADERS } from '../config/appHeaders';
import { BASE_URL } from '../config/api';



//get rows of any list
export const getListRows = (api_name, filters) => {
  return createAction({
    type: GET__LIST__ROWS,
    action: async () => await axios.get(`${BASE_URL}/${api_name}${filters}`,
      { data: {}, headers: HEADERS.AUTHENTIC() })
  });
}

// update customer data
export const updateRecord = (api_name, updateData) => {
  let recordID = updateData?.id;
  return createAction({
    type: PUT__CUSTOMER__DATA,
    action: async () => await axios.put(`${BASE_URL}/${api_name}/${recordID}/`,updateData, { headers: HEADERS.AUTHENTIC() })
  });
}


export const saveRecord = (api_name, formData) => {
  return createAction({
    type: POST__CUSTOMER__DATA,
    action: async () => await axios.post(`${BASE_URL}/${api_name}/`,formData, { headers: HEADERS.AUTHENTIC() })
  });
}


// Deactivate any form
// export const deactivateForm = (api_name,recordID) => {
//   return createAction({
//     type: POST__CUSTOMER__DATA,
//     action: async () => await axios.put(`${BASE_URL}/${api_name}/${recordID}`,formData, { headers: HEADERS.AUTHENTIC() })
//   });
// }


// export const updateRecord = async(api_name , recordID, updateData) =>{
//   await axios.put(`${BASE_URL}/${api_name}/${recordID}`, updateData , {headers :HEADERS.AUTHENTIC()}).then(res=>console.log(res.status))
// }



//get Vendors Data







//get all customer list
export const getCustomers = () => {
  return createAction({
    type: GET__CUSTOMERS,
    action: async () => await axios.get(`${BASE_URL}/customers/`,
     { data: {}, headers: HEADERS.AUTHENTIC() })
    // action: async () => await fetch(`${BASE_URL}/customers${filters}`, { data: {}, headers: HEADERS.AUTHENTIC() })
  });
}


//get customer data
export const createCustomer = (customer) => {
  return createAction({
    type: POST__CUSTOMER__DATA,
    action: () => axios.post(`${BASE_URL}/customers/`, customer, { headers: HEADERS.AUTHENTIC() })
  });
}


//get customer data
export const getCustomerData = (customerID) => {
  return createAction({
    type: GET__CUSTOMER__DATA,
    action: () => axios.get(`${BASE_URL}/customers/${customerID}/`, { data: {}, headers: HEADERS.AUTHENTIC() })
  });
}

//get customer address
export const getCustomerAddress = (customerID) => {
  return createAction({
    type: GET__CUSTOMER__ADDRESS,
    action: async () => await axios.get(`${BASE_URL}/customers/${customerID}/addresses/`, { data: {}, headers: HEADERS.AUTHENTIC() })
  });
}

//get addresses
export const getAddresses = (filters) => {
  return createAction({
    type: GET__ADDRESSES,
    action: () => axios.get(`${BASE_URL}/addresses${filters}`, { data: {}, headers: HEADERS.AUTHENTIC() })
  });
}

//get customer data
export const getAddressData = (addressID) => {
  return createAction({
    type: GET__ADDRESS__DATA,
    action: async () => await axios.get(`${BASE_URL}/addresses/${addressID}/`, { data: {}, headers: HEADERS.AUTHENTIC() })
  });
}

//get all users list
export const getUsers = (filters) => {
  return createAction({
    type: GET__USERS,
    action: () => axios.get(`${BASE_URL}/users/`, { data: {}, headers: HEADERS.AUTHENTIC() })
  });
}












