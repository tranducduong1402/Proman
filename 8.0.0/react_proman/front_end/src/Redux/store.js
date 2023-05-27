import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
   userCreateReducer,
   userDeleteReducer,
    userEditReducer, 
    userListReducer, 
    userLoginReducer, 
    userRegisterReducer, 
    userUpdateReducer } from "./Reducers/UserReducer";
import { positionCreateReducer, positionDeleteReducer, positionListReducer, positionUpdateReducer, postionDetailReducer, postionEditReducer } from "./Reducers/PositionReducer";
import { roleListReducer } from "./Reducers/RoleReducer";
import { projectCreateReducer, projectDeleteReducer, projectListReducer } from "./Reducers/ProjectReducer";
import { loadState, saveState } from '../helpers/localStorage';
import stateHistoryEnhancer from "./Reducers/stateHistoryEnhancer";
import board from "./Reducers/boardReducer";
import search from './Reducers/searchReducer';
import { clientCreateReducer, clientDeleteReducer, clientEditReducer, clientListReducer, clientUpdateReducer } from "./Reducers/ClientReducer";

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userList: userListReducer,
    adminCreate: userCreateReducer,
    userEdit: userEditReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    positionList: positionListReducer,
    positionCreate: positionCreateReducer,
    positionDelete: positionDeleteReducer,
    positionDetail: postionDetailReducer,
    positionUpdate: positionUpdateReducer,
    roleList: roleListReducer,
    projectList: projectListReducer,
    projectDelete: projectDeleteReducer,
    projectCreate: projectCreateReducer,
    board: stateHistoryEnhancer(board),
    search
    clientList: clientListReducer,
    clientCreate: clientCreateReducer,
    clientEdit: clientEditReducer,
    clientUpdate: clientUpdateReducer,
    clientDelete: clientDeleteReducer,
  });

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();

  const middleware = [thunk]
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  
store.subscribe(() => {
  const state = { ...store.getState() };
  saveState(state);
});

  export default store;