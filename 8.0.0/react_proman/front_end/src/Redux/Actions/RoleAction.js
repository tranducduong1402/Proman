import axios from "axios";
import {
    ADMIN_CREATE_ROLE_FAIL,
    ADMIN_CREATE_ROLE_REQUEST,
    ADMIN_CREATE_ROLE_SUCCESS,
    ROLE_LIST_FAIL,
    ROLE_LIST_REQUEST, 
    ROLE_LIST_SUCCESS
} from "../Constants/RoleContants";

// ALL USER
export const listRole = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ROLE_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.result.accessToken}`,
            },
        };

        const { data } = await axios.get(
            `https://localhost:44311/api/services/app/Role/GetAll`,
            config
        );

        dispatch({ type: ROLE_LIST_SUCCESS, payload: data.result.items});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: ROLE_LIST_FAIL,
            payload: message,
        });
    }
};

//admin create
export const createRole =
  ({ name, displayName, description }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_CREATE_ROLE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      console.log(userInfo.result.accessToken);
      const config = {
        headers: { Authorization: `Bearer ${userInfo.result.accessToken}` },
      };
      const { data } = await axios.post(
        `https://localhost:44311/api/services/app/Role/Create`,
        {
            name, displayName, description
        },
        config
      );
      dispatch({ type: ADMIN_CREATE_ROLE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ADMIN_CREATE_ROLE_FAIL,
        payload: message,
      });
    }
  };