import axios from "axios";
import { CLIENT_DELETE_FAIL, CLIENT_DELETE_REQUEST, CLIENT_DELETE_SUCCESS, CLIENT_EDIT_FAIL, CLIENT_EDIT_REQUEST, CLIENT_EDIT_SUCCESS, CLIENT_LIST_FAIL, CLIENT_LIST_REQUEST, CLIENT_LIST_SUCCESS, CLIENT_UPDATE_FAIL, CLIENT_UPDATE_REQUEST, CLIENT_UPDATE_SUCCESS, CREATE_CLIENT_FAIL, CREATE_CLIENT_REQUEST, CREATE_CLIENT_SUCCESS } from "../Constants/ClientContants";

// all client
export const listClient = (keyword = "", listFilter, maxResultCount, skipCount ) => async (dispatch, getState) => {
  try {
    dispatch({ type: CLIENT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.result.accessToken}`,
      },
    };


    const { data } = await axios.post(
      `https://localhost:44311/api/services/app/User/GetAllClientPaging`, {searchText: keyword, filterItems: listFilter, maxResultCount, skipCount}
      , config,
    );

    dispatch({ type: CLIENT_LIST_SUCCESS, payload: data.result.items });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CLIENT_LIST_FAIL,
      payload: message,
    });
  }
};

// Create a new Client 
export const createClient =
  ({
    userName,
    name,
    surname,
    roleNames,
    sex,
    type,
    password,
    emailAddress,
  }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_CLIENT_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      
      const config = {
        headers: { Authorization: `Bearer ${userInfo.result.accessToken}` },
      };
      const { data } = await axios.post(
        `https://localhost:44311/api/services/app/User/CreateClient`,
        {
          userName,
          name,
          surname,
          roleNames,
          sex,
          type,
          password,
          emailAddress,
        },
        config
      );
      dispatch({ type: CREATE_CLIENT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CREATE_CLIENT_FAIL,
        payload: message,
      });
    }
  };

  
  // EDIT CLIENT
export const editClient = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CLIENT_EDIT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.result.accessToken}`,
      },
    };

    const { data } = await axios.get(`https://localhost:44311/api/services/app/User/Get?Id=${id}`, config);
    dispatch({ type: CLIENT_EDIT_SUCCESS, payload: data.result });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    
    dispatch({
      type: CLIENT_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE CLIENT
export const updateClient = (client) => async (dispatch, getState) => {
  try {
    dispatch({ type: CLIENT_UPDATE_REQUEST });

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
      `https://localhost:44311/api/services/app/User/UpdateClient`,
      client,
      config
    );

    dispatch({ type: CLIENT_UPDATE_SUCCESS, payload: data });
    dispatch({ type: CLIENT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CLIENT_UPDATE_FAIL,
      payload: message,
    });
  }
};

// DELETE CLIENT
export const deleteClient = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CLIENT_DELETE_REQUEST });

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

    dispatch({ type: CLIENT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CLIENT_DELETE_FAIL,
      payload: message,
    });
  }
};
