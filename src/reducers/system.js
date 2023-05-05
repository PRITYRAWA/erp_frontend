import baseState from '../store/baseState';
import {
  GET__LOOKUP, GET__IMPORT__DATA,
  GET__MENU, GET__MENU__LISTS,
  GET__LISTS, GET__COLUMNS, PUT__COLUMNS,
  GET__FORMS, GET__FIELDS,
  GET__COUNTRIES, GET__COUNTRY__DATA, POST__COUNTRY__DATA, GET__FORM__DATA, GET__FORM__INFO, GET__LIST__DATA, GET__LIST__FORM
} from '../actions/action';

export default (state = baseState.sysData, { payload, type, error }) => {


  switch (type) {
    case GET__LOOKUP.REQUEST:
      return {
        ...state,
      };

    case GET__LOOKUP.SUCCESS:
      return {
        ...state,
        lookupData: payload.data
      };

    case GET__LOOKUP.FAILURE:
      return {
        ...state,
        lookupData: payload
      };

    case GET__IMPORT__DATA.REQUEST:
      return {
        ...state,
      };

    case GET__IMPORT__DATA.SUCCESS:
      return {
        ...state,
        importData: payload.data
      };

    case GET__IMPORT__DATA.FAILURE:
      return {
        ...state,
        importData: payload
      };

    case GET__MENU.REQUEST:
      return {
        ...state,
      };

    case GET__MENU.SUCCESS:
      return {
        ...state,
        menu_items: payload.data
      };

    case GET__MENU.FAILURE:
      return {
        ...state,
        menu_items: payload
      };

    case GET__MENU__LISTS.REQUEST:
      return {
        ...state,
      };

    case GET__MENU__LISTS.SUCCESS:
      return {
        ...state,
        list_items: payload.data
      };

    case GET__MENU__LISTS.FAILURE:
      return {
        ...state,
        list_items: payload
      };


    case GET__COLUMNS.REQUEST:
      return {
        ...state,
      };

    case GET__COLUMNS.SUCCESS:
      return {
        ...state,
        column_items: payload.data
      };

    case GET__COLUMNS.FAILURE:
      return {
        ...state,
        column_items: payload
      };




    case PUT__COLUMNS.REQUEST:
      return {
        ...state,
      };

    case PUT__COLUMNS.SUCCESS:
      return {
        ...state,
        put_column_items: payload.data
      };

    case PUT__COLUMNS.FAILURE:
      return {
        ...state,
        put_column_items: payload
      };













    case GET__FORMS.REQUEST:
      return {
        ...state,
      };

    case GET__FORMS.SUCCESS:
      return {
        ...state,
        form_items: payload.data
      };

    case GET__FORMS.FAILURE:
      return {
        ...state,
        form_items: payload.data
      };

    case GET__FORM__DATA.REQUEST:
      return {
        ...state,
        formDataPendingReq: true
      };

    case GET__FORM__DATA.SUCCESS:
      return {
        ...state,
        form_info: payload.data,
        formDataPendingReq: false

      };

    case GET__FORM__DATA.FAILURE:
      return {
        ...state,
        form_info: payload.data,
        formDataPendingReq: false

      };

    case GET__FORM__INFO.REQUEST:
      return {
        ...state,



      };

    case GET__FORM__INFO.SUCCESS:
      return {
        ...state,
        form_info: payload.data,



      };

    case GET__FORM__INFO.FAILURE:
      return {
        ...state,
        form_info: payload.data,




      };

    case GET__LIST__DATA.REQUEST:
      return {
        ...state,
        pendingReq: true
      };

    case GET__LIST__DATA.SUCCESS:
      return {
        ...state,
        list_data: payload.data,
        pendingReq: false
      };

    case GET__LIST__DATA.FAILURE:
      return {
        ...state,
        list_data: payload.data,
        pendingReq: false

      };

    case GET__FIELDS.REQUEST:
      return {
        ...state,
      };

    case GET__FIELDS.SUCCESS:
      return {
        ...state,
        field_items: payload.data
      };

    case GET__FIELDS.FAILURE:
      return {
        ...state,
        field_items: payload.data
      };

    case GET__COUNTRIES.REQUEST:
      return {
        ...state,
      };

    case GET__COUNTRIES.SUCCESS:
      return {
        ...state,
        countries: payload.data
      };

    case GET__COUNTRIES.FAILURE:
      return {
        ...state,
        countries: payload.data
      };

    case GET__COUNTRY__DATA.REQUEST:
      return {
        ...state,
      };

    case GET__COUNTRY__DATA.SUCCESS:
      return {
        ...state,
        countryData: payload.data
      };

    case GET__COUNTRY__DATA.FAILURE:
      return {
        ...state,
        countryData: payload.data
      };

    case POST__COUNTRY__DATA.REQUEST:
      return {
        ...state,
      };

    case POST__COUNTRY__DATA.SUCCESS:
      return {
        ...state,
        countryData: payload.data
      };

    case POST__COUNTRY__DATA.FAILURE:
      return {
        ...state,
        countryData: payload.data
      };

    case GET__LISTS.REQUEST:
      return {
        ...state,
      };

    case GET__LISTS.SUCCESS:
      return {
        ...state,
        lists: payload.data
      };

    case GET__LISTS.FAILURE:
      return {
        ...state,
        lists: payload
      };

    case GET__LIST__FORM.REQUEST:
      return {
        ...state,
      };

    case GET__LIST__FORM.SUCCESS:
      return {
        ...state,
        listForm: payload.data
      };

    case GET__LIST__FORM.FAILURE:
      return {
        ...state,
        listForm: []
      };

    default:
      return state;
  }
};