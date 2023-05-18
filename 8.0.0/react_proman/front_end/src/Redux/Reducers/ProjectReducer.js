import { CREATE_PROJECT_REQUEST } from "../Constants/ProjectContants";
import { PROJECT_CREATE_RESET } from "../Constants/ProjectContants";
import { CREATE_PROJECT_FAIL } from "../Constants/ProjectContants";
import {
  CREATE_PROJECT_SUCCESS,
  PROJECT_DELETE_FAIL,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_LIST_FAIL,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_RESET,
  PROJECT_LIST_SUCCESS,
} from "../Constants/ProjectContants";

// ALL PROJECT
export const projectListReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case PROJECT_LIST_REQUEST:
      return { loading: true };
    case PROJECT_LIST_SUCCESS:
      return { loading: false, projects: action.payload };
    case PROJECT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_LIST_RESET:
      return { projects: [] };
    default:
      return state;
  }
};

// DELETE PROJECT
export const projectDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_DELETE_REQUEST:
      return { loading: true };
    case PROJECT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PROJECT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const projectCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROJECT_REQUEST:
      return { loading: true };
    case CREATE_PROJECT_SUCCESS:
      return { loading: false, success: true, project: action.payload };
    case CREATE_PROJECT_FAIL:
      return { loading: false, error: action.payload };
      case PROJECT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};