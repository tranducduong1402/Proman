import {
    ADMIN_CREATE_POSITION_FAIL,
    ADMIN_CREATE_POSITION_REQUEST,
    ADMIN_CREATE_POSITION_SUCCESS,
    POSITION_CREATE_RESET,
    POSITION_DELETE_FAIL,
    POSITION_DELETE_REQUEST,
    POSITION_DELETE_SUCCESS,
    POSITION_EDIT_FAIL,
    POSITION_EDIT_REQUEST,
    POSITION_EDIT_SUCCESS,
    POSITION_LIST_FAIL, 
    POSITION_LIST_REQUEST, 
    POSITION_LIST_RESET, 
    POSITION_LIST_SUCCESS,
    POSITION_UPDATE_FAIL,
    POSITION_UPDATE_REQUEST,
    POSITION_UPDATE_RESET,
    POSITION_UPDATE_SUCCESS
} from "../Constants/PositionContants";

// ALL POSITION
export const positionListReducer = (state = { positions: [] }, action) => {
    switch (action.type) {
        case POSITION_LIST_REQUEST:
            return { loading: true };
        case POSITION_LIST_SUCCESS:
            return { loading: false, positions: action.payload };
        case POSITION_LIST_FAIL:
            return { loading: false, error: action.payload };
        case POSITION_LIST_RESET:
            return { positions: [] };
        default:
            return state;
    }
};

//Admin create Position
export const positionCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_CREATE_POSITION_REQUEST:
        return { loading: true };
      case ADMIN_CREATE_POSITION_SUCCESS:
        return { loading: false, success: true, position: action.payload };
      case ADMIN_CREATE_POSITION_FAIL:
        return { loading: false, error: action.payload };
        case POSITION_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  // EDIT Position
export const postionDetailReducer = (
    state = { user:{} },
    action
  ) => {
    switch (action.type) {
      case POSITION_EDIT_REQUEST:
        return { loading: true };
      case POSITION_EDIT_SUCCESS:
        return { loading: false, position: action.payload };
      case POSITION_EDIT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // UPDATE Position
  export const positionUpdateReducer = (state = { position: {} }, action) => {
    switch (action.type) {
      case POSITION_UPDATE_REQUEST:
        return { loading: true };
      case POSITION_UPDATE_SUCCESS:
        return { loading: false, success: true, position: action.payload };
      case POSITION_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case POSITION_UPDATE_RESET:
        return { position: {} };
      default:
        return state;
    }
  };
  
  // DELETE Position
  export const positionDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case POSITION_DELETE_REQUEST:
        return { loading: true };
      case POSITION_DELETE_SUCCESS:
        return { loading: false, success: true };
      case POSITION_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };