import './App.css';
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import HomeScreen from './screens/Home/HomeScreen';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
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
