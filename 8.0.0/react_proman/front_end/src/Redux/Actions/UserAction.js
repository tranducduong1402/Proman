import axios from "axios";
import {
  ADMIN_CREATE_USER_FAIL,
  ADMIN_CREATE_USER_REQUEST,
  ADMIN_CREATE_USER_SUCCESS,
  USER_EDIT_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL
} from "../Constants/UserContants";

// LOGIN
export const login = (userNameOrEmailAddress, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `https://localhost:44311/api/TokenAuth/Authenticate`,
      { userNameOrEmailAddress, password }
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: message,
    });
  }
};

// ALL USER
export const listUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.result.accessToken}`,
      },
    };

    const { data } = await axios.get(
      `https://localhost:44311/api/services/app/User/GetAllPagging`,
      config
    );

    dispatch({ type: USER_LIST_SUCCESS, payload: data.result.items });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    });
  }
};

//REGISTER
export const register =
  (name, surname, userName, emailAddress, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://localhost:44311/api/services/app/Account/Register",
        { name, surname, userName, emailAddress, password },
        config
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//admin create

export const createUser =
  ({
    userName,
    name,
    surname,
    roleNames,
    sex,
    level,
    password,
    emailAddress,
  }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_CREATE_USER_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      
      const config = {
        headers: { Authorization: `Bearer ${userInfo.result.accessToken}` },
      };
      const { data } = await axios.post(
        `https://localhost:44311/api/services/app/User/Create`,
        {
          userName,
          name,
          surname,
          roleNames,
          sex,
          level,
          password,
          emailAddress,
        },
        config
      );
      dispatch({ type: ADMIN_CREATE_USER_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ADMIN_CREATE_USER_FAIL,
        payload: message,
      });
    }
  };


  // EDIT USER
export const editUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_EDIT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.result.accessToken}`,
      },
    };

    const { data } = await axios.get(`https://localhost:44311/api/services/app/User/Get?Id=${id}`, config);
    dispatch({ type: USER_EDIT_SUCCESS, payload: data.result });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    
    dispatch({
      type: USER_EDIT_FAIL,
      payload: message,
    });
  }
};




// UPDATE USER
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

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
      `https://localhost:44311/api/services/app/User/Update`,
      user,
      config
    );

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    });
  }
};


// DELETE PRODUCT
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
   
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.result.accessToken}`,
      },
    };

    await axios.delete(`https://localhost:44311/api/services/app/User/Delete?Id=${id}`, config);

    dispatch({ type: USER_DELETE_SUCCESS });
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