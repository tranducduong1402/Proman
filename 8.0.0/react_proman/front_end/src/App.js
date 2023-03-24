import './App.css';
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import Landing_page from './screens/Home/Landingpage';
import LoginScreen from './screens/Login/LoginScreen';
import SignUpScreen from './screens/SignUp/SignupScreen';
import HomeScreen from './screens/Home/HomeScreen';
import ResetPassword from './screens/SignUp/ResetScreen';
import UserScreen from './screens/User/UserScreen';

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
    element: <SignUpScreen/>,
  },

  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },

  {
    path: "/user",
    element: <UserScreen />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
