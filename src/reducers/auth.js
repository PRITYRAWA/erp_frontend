import baseState from '../store/baseState';
import {
  USER__LOGIN
} from '../actions/action';
import { RESET__PASSWORD__EMAIL, CHANGE__PASSWORD } from '../actions/action';

export default (state = baseState.authData, { payload, type, error }) => {
  switch (type) {


    case RESET__PASSWORD__EMAIL.REQUEST:
      return {
        ...state,
      }

    case RESET__PASSWORD__EMAIL.SUCCESS:
      return {
        ...state,
        resetPass: payload.data,
      }



    // case CHANGE__PASSWORD.REQUEST:
    //   return {
    //     ...state,
    //   }

    // case CHANGE__PASSWORD.SUCCESS:
    //   return {
    //     ...state,
    //     changePass: payload.data,
    //   }




    case USER__LOGIN.REQUEST:
      return {
        ...state,
      };

    case USER__LOGIN.SUCCESS:
      return {
        ...state,
        loginDetails: payload.data
      };

    // case RESET__PASSWORD__EMAIL.REQUEST:
    //   return {
    //     ...state,
    //   }

    // case RESET__PASSWORD__EMAIL.SUCCESS:
    //   return {
    //     ...state,
    //     resetPass: payload.data,
    //   }
    default:
      return state;
  }
};