import { 
    CLIENT_DELETE_FAIL,
    CLIENT_DELETE_REQUEST,
    CLIENT_DELETE_SUCCESS,
    CLIENT_EDIT_FAIL,
    CLIENT_EDIT_REQUEST,
    CLIENT_EDIT_SUCCESS,
    CLIENT_LIST_FAIL,
    CLIENT_LIST_REQUEST,
    CLIENT_LIST_RESET,
    CLIENT_LIST_SUCCESS,
    CLIENT_UPDATE_FAIL,
    CLIENT_UPDATE_REQUEST,
    CLIENT_UPDATE_RESET,
    CLIENT_UPDATE_SUCCESS,
    CREATE_CLIENT_FAIL, 
    CREATE_CLIENT_REQUEST, 
    CREATE_CLIENT_RESET, 
    CREATE_CLIENT_SUCCESS 
} from "../Constants/ClientContants";

// create client
export const clientCreateReducer = (state = {}, action) => {
switch (action.type) {
  case CREATE_CLIENT_REQUEST:
    return { loading: true };
  case CREATE_CLIENT_SUCCESS:
    return { loading: false, success: true, client: action.payload };
  case CREATE_CLIENT_FAIL:
    return { loading: false, error: action.payload };
    case CREATE_CLIENT_RESET:
    return {};
  default:
    return state;
}
};

// all client
export const clientListReducer = (state = { client: [] }, action) => {
switch (action.type) {
  case CLIENT_LIST_REQUEST:
    return { loading: true };
  case CLIENT_LIST_SUCCESS:
    return { loading: false, clients: action.payload };
  case CLIENT_LIST_FAIL:
    return { loading: false, error: action.payload };
  case CLIENT_LIST_RESET:
    return { clients: [] };
  default:
    return state;
}
};

// Edit client
export const clientEditReducer = (
state = { client:{} },
action
) => {
switch (action.type) {
  case CLIENT_EDIT_REQUEST:
    return { loading: true };
  case CLIENT_EDIT_SUCCESS:
    return { loading: false, client: action.payload };
  case CLIENT_EDIT_FAIL:
    return { loading: false, error: action.payload };
  default:
    return state;
}
};

// Update client
export const clientUpdateReducer = (state = { client: {} }, action) => {
switch (action.type) {
  case CLIENT_UPDATE_REQUEST:
    return { loading: true };
  case CLIENT_UPDATE_SUCCESS:
    return { loading: false, success: true, client: action.payload };
  case CLIENT_UPDATE_FAIL:
    return { loading: false, error: action.payload };
  case CLIENT_UPDATE_RESET:
    return { client: {} };
  default:
    return state;
}
};

// Delete client
export const clientDeleteReducer = (state = {}, action) => {
switch (action.type) {
  case CLIENT_DELETE_REQUEST:
    return { loading: true };
  case CLIENT_DELETE_SUCCESS:
    return { loading: false, success: true };
  case CLIENT_DELETE_FAIL:
    return { loading: false, error: action.payload };
  default:
    return state;
}
};
