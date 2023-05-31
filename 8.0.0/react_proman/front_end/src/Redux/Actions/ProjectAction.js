import axios from "axios";
import {
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_LIST_FAIL,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
} from "../Constants/ProjectContants";
import { POSITION_LIST_SUCCESS } from "../Constants/PositionContants";
import { USER_DELETE_FAIL } from "../Constants/UserContants";

// ALL Project
export const listProject = (keyword = "") => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_LIST_REQUEST });

    const {userLogin: { userInfo }} = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.result.accessToken}`,
      },
    };

    const { data } = await axios.post(
      `https://localhost:44311/api/services/app/Project/GetAllPaging`,{ searchText: keyword},
      config
    );
    dispatch({ type: PROJECT_LIST_SUCCESS, payload: data.result.items });
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PROJECT_LIST_FAIL,
      payload: message,
    });
  }
};


// DELETE Project
export const deleteProject = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
   
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.result.accessToken}`,
      },
    };

    await axios.delete(`https://localhost:44311/api/services/app/Project/Delete?Id=${id}`, config);

    dispatch({ type: PROJECT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    });
  }
};


//REGISTER
export const registerProject =
  (body) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_PROJECT_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://localhost:44311/api/services/app/Project/AddNew",
        body,
        config
      );
      dispatch({ type: CREATE_PROJECT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_PROJECT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

