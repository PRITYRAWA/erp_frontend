import baseState from '../store/baseState';
import {
    GET__FORMS,
    GET__LISTS, GET__COLUMNS,
    GET__CUSTOMERS, GET__CUSTOMER__DATA, GET__CUSTOMER__ADDRESS,
    POST__CUSTOMER__DATA,
    GET__ADDRESSES,
    GET__USERS,
    GET__FIELDS,
    GET__ADDRESS__DATA,
    PUT__CUSTOMER__DATA,
    GET__LIST__ROWS, DEACTIVATE__FORM, GET__SORT__LIST__ROWS,
} from '../actions/action';

export default (state = baseState.appData, { payload, type, error }) => {
    switch (type) {

        case GET__LIST__ROWS.REQUEST:

            return {
                ...state,
                pendingReq: true,



            };

        case GET__LIST__ROWS.SUCCESS:


            return {
                ...state,
                listRows: payload.data,
                listRowData: payload.data,
                pendingReq: false,




            };

        case GET__LIST__ROWS.FAILURE:
            return {
                ...state,
                listRows: [],
                pendingReq: false

            };




      







        case GET__CUSTOMERS.REQUEST:
            return {
                ...state,
            };

        case GET__CUSTOMERS.SUCCESS:
            return {
                ...state,
                customers: payload.data
            };

        case GET__CUSTOMERS.FAILURE:
            return {
                ...state,
                customers: payload.data
            };

        case GET__ADDRESSES.REQUEST:
            return {
                ...state,
            };

        case GET__ADDRESSES.SUCCESS:
            return {
                ...state,
                addresses: payload.data
            };

        case GET__ADDRESSES.FAILURE:
            return {
                ...state,
                addresses: payload.data
            };

        case GET__ADDRESS__DATA.REQUEST:
            return {
                ...state,
            };

        case GET__ADDRESS__DATA.SUCCESS:
            return {
                ...state,
                addr_data: payload.data
            };

        case GET__ADDRESS__DATA.FAILURE:
            return {
                ...state,
                addr_data: payload.data
            };

        case GET__CUSTOMER__DATA.REQUEST:
            return {
                ...state,
            };

        case GET__CUSTOMER__DATA.SUCCESS:
            return {
                ...state,
                customerData: payload.data
            };

        case GET__CUSTOMER__DATA.FAILURE:
            return {
                ...state,
                customerData: payload.data
            };

        case POST__CUSTOMER__DATA.REQUEST:
            return {
                ...state,
            };

        case POST__CUSTOMER__DATA.SUCCESS:
            return {
                ...state,
                customerData: payload.data,
                reqStatus: payload.status
            };

        case POST__CUSTOMER__DATA.FAILURE:
            return {
                ...state,
                customerData: payload.data
            };

        case PUT__CUSTOMER__DATA.REQUEST:
            return {
                ...state,
            };

        case PUT__CUSTOMER__DATA.SUCCESS:
            return {
                ...state,
                customerData: payload.data
            };

        case PUT__CUSTOMER__DATA.FAILURE:
            return {
                ...state,
                customerData: payload.data
            };

        case GET__CUSTOMER__ADDRESS.REQUEST:
            return {
                ...state,
            };

        case GET__CUSTOMER__ADDRESS.SUCCESS:
            return {
                ...state,
                customerAddresses: payload.data
            };

        case GET__CUSTOMER__ADDRESS.FAILURE:
            return {
                ...state,
                customerAddresses: payload.data
            };

        case GET__USERS.REQUEST:
            return {
                ...state,
            };

        case GET__USERS.SUCCESS:
            //baseState.appData.menu_items = payload.data
            return {
                ...state,
                users: payload.data
            };

        case GET__USERS.FAILURE:
            return {
                ...state,
                users: payload.data
            };

        case DEACTIVATE__FORM.REQUEST:
            return {
                ...state
            };

        case DEACTIVATE__FORM.SUCCESS:
            return {
                ...state,
                customers: payload.data
            };

        case DEACTIVATE__FORM.FAILURE:
            return {
                ...state
            };

        default:
            return state;
    }
};