import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userCreateReducer, userDeleteReducer, userEditReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateReducer } from "./Reducers/UserReducer";

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userList: userListReducer,
    adminCreate: userCreateReducer,
    userEdit: userEditReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer
  });

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

  const middleware = [thunk]
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  export default store;