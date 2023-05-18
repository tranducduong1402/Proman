import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing_page from "./screens/Home/Landingpage";
import LoginScreen from "./screens/Login/LoginScreen";
import SignUpScreen from "./screens/SignUp/SignupScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import ResetPassword from "./screens/SignUp/ResetScreen";
import UserScreen from "./screens/User/UserScreen";
import RoleScreen from "./screens/Role/RoleScreen";
import RoleTree from "./screens/Role/RoleTree";
import ClientScreen from "./screens/Client/ClientScreen";
import TaskScreen from "./screens/Task/TaskScreen";
import ProjectDetail from "./screens/Project/ProjectDetail";
import Project from "./screens/Project/Project";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Position from "./screens/Position/position";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing_page />,
  },
  {
    path: "/home",
    element: <HomeScreen />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/register",
    element: <SignUpScreen />,
  },

  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },

  {
    path: "/user",
    element: <UserScreen />,
  },
  {
    path: "user/search/:keyword",
    element: <UserScreen />,
  },
  {
    path: "/role",
    element: <RoleScreen />,
  },
  {
    path: "/roletree",
    element: <RoleTree />,
  },

  {
    path: "/client",
    element: <ClientScreen />,
  },

  {
    path: "/task",
    element: <TaskScreen />,
  },

  {
    path: "/project",
    element: <Project />,
  },
  {
    path: "/project/search/:keyword",
    element: <Project />,
  },

  {
    path: "/projectdetail",
    element: <ProjectDetail />,
  },

  {
    path: "/position",
    element: <Position />,
  },
  {
    path: "position/search/:keyword",
    element: <Position />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // useEffect(() => {
  //   if (userInfo ) {
  //     console.log('cos user r')
  //   }
  // }, [dispatch, userInfo]);


  return (
    <div className="App">
      <ToastContainer style={{ display: "inline-block" }} />

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
