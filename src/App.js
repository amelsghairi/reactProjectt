import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Porfile from './pages/Porfile';
import Singin from './pages/Singin';
import Singup from './pages/Singup';
import {useContext } from "react";
import ThemeContext from "./theme/themeContext"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1>SORROY.........</h1>,
  },

  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/singin",
    element: <Singin />,
  },
  {
    path: "/singup",
    element: <Singup  />,
  },


  {
    path: "/Porfile",
    element: <Porfile />,
  },
]);
function App() {

  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}


export default App;
