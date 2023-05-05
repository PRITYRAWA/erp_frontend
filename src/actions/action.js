export function createActionType(id) {
  return {
    FAILURE: `${id}__FAILURE`,
    REQUEST: `${id}__REQUEST`,
    SUCCESS: `${id}__SUCCESS`,
  };
}

export const DEACTIVATE__FORM = createActionType('DEACTIVATE__FORM')
export const GET__DROPDOWNS = createActionType("GET__DROPDOWNS")

export const RESET__PASSWORD__EMAIL = createActionType('RESET__PASSWORD__EMAIL');
export const CHANGE__PASSWORD = createActionType('CHANGE__PASSWORD');
export const USER__LOGIN = createActionType('USER__LOGIN');
export const GET__LOOKUP = createActionType('GET__LOOKUP')
export const GET__MENU = createActionType('GET__MENU');
export const GET__FORMS = createActionType('GET__FORMS');
export const GET__FORM__DATA = createActionType('GET__FORM__DATA');

export const GET__FORM__INFO = createActionType('GET__FORM__INFO');
export const GET__FIELDS = createActionType('GET__FIELDS');
export const GET__MENU__LISTS = createActionType('GET__MENU__LISTS');
export const GET__COLUMNS = createActionType('GET__COLUMNS');



export const PUT__COLUMNS = createActionType('PUT__COLUMNS');

export const GET__LISTS = createActionType('GET__LISTS');
export const GET__LIST__DATA = createActionType('GET__LIST__DATA');

export const GET__COUNTRIES = createActionType('GET__COUNTRIES');
export const GET__COUNTRY__DATA = createActionType('GET__COUNTRY__DATA');
export const POST__COUNTRY__DATA = createActionType('POST__COUNTRY__DATA');

export const GET__CUSTOMERS = createActionType('GET__CUSTOMERS');
export const GET__CUSTOMER__DATA = createActionType('GET__CUSTOMER__DATA');
export const POST__CUSTOMER__DATA = createActionType('POST__CUSTOMER__DATA');
export const PUT__CUSTOMER__DATA = createActionType('PUT__CUSTOMER__DATA');
export const GET__CUSTOMER__ADDRESS = createActionType('GET__CUSTOMER__ADDRESS');

export const GET__ADDRESSES = createActionType('GET__ADDRESSES');
export const GET__ADDRESS__DATA = createActionType('GET__ADDRESS__DATA');


export const GET__USERS = createActionType('GET__USERS');

export const GET__IMPORT__DATA = createActionType('GET__IMPORT__DATA');

//common action for managing list view data
export const GET__LIST__ROWS = createActionType('GET__LIST__ROWS');



export const GET__LIST__FORM = createActionType('GET__LIST__FORM');

export function createAction({ action, headers = {}, type }) {
  return async (dispatch) => {
    dispatch({ type: type.REQUEST, headers });
    try {
      dispatch({ type: type.SUCCESS, headers, payload: await action().then(value => value) });
    } catch (error) {
      dispatch({ type: type.FAILURE, headers, error });
    }
  };
}
