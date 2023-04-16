import axios from "axios";
import {
    ADMIN_CREATE_POSITION_FAIL,
    ADMIN_CREATE_POSITION_REQUEST,
    ADMIN_CREATE_POSITION_SUCCESS,
    POSITION_DELETE_FAIL,
    POSITION_DELETE_REQUEST,
    POSITION_DELETE_SUCCESS,
    POSITION_EDIT_FAIL,
    POSITION_EDIT_REQUEST,
    POSITION_EDIT_SUCCESS,
    POSITION_LIST_FAIL,
    POSITION_LIST_REQUEST,
    POSITION_LIST_SUCCESS,
    POSITION_UPDATE_FAIL,
    POSITION_UPDATE_REQUEST,
    POSITION_UPDATE_SUCCESS
} from "../Constants/PositionContants";

// ALL POSITION
export const listPosition = (keyword = "") => async (dispatch, getState) => {
    try {
        dispatch({ type: POSITION_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.result.accessToken}`,
            },
        };

        const { data } = await axios.post(
            `https://localhost:44311/api/services/app/Position/GetAllPaging`, {
            searchText: keyword
        },
            config,
        );

        dispatch({ type: POSITION_LIST_SUCCESS, payload: data.result.items });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: POSITION_LIST_FAIL,
            payload: message,
        });
    }
};

//admin create position
export const createPosition =
    ({
        name,
        shortName,
        code,
        color,
    }) =>
        async (dispatch, getState) => {
            try {
                dispatch({ type: ADMIN_CREATE_POSITION_REQUEST });
                const {
                    userLogin: { userInfo },
                } = getState();

                const config = {
                    headers: { Authorization: `Bearer ${userInfo.result.accessToken}` },
                };
                const { data } = await axios.post(
                    `https://localhost:44311/api/services/app/Position/Create`,
                    {
                        name,
                        shortName,
                        code,
                        color,
                    },
                    config
                );
                dispatch({ type: ADMIN_CREATE_POSITION_SUCCESS, payload: data });
            } catch (error) {
                const message =
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;
                dispatch({
                    type: ADMIN_CREATE_POSITION_FAIL,
                    payload: message,
                });
            }
        };

  // Detail position
  export const detailPosition = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: POSITION_EDIT_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.result.accessToken}`,
        },
      };
  
      const { data } = await axios.get(`https://localhost:44311/api/services/app/Position/GetPositionById?Id=${id}`, config);
      dispatch({ type: POSITION_EDIT_SUCCESS, payload: data.result });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      
      dispatch({
        type: POSITION_EDIT_FAIL,
        payload: message,
      });
    }
  };

  // UPDATE Position
export const updatePosition = (position) => async (dispatch, getState) => {
    try {
      dispatch({ type: POSITION_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.result.accessToken}`,
        },
      };
  
      const { data } = await axios.put(
        `https://localhost:44311/api/services/app/Position/Update`,
        position,
        config
      );
  
      dispatch({ type: POSITION_UPDATE_SUCCESS, payload: data });
      dispatch({ type: POSITION_EDIT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POSITION_UPDATE_FAIL,
        payload: message,
      });
    }
  };

// DELETE Position
export const deletePosition = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: POSITION_DELETE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
     
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.result.accessToken}`,
        },
      };
  
      await axios.delete(`https://localhost:44311/api/services/app/Position/Delete?Id=${id}`, config);
  
      dispatch({ type: POSITION_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POSITION_DELETE_FAIL,
        payload: message,
      });
    }
  };