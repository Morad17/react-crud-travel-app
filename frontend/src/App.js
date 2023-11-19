import {Outlet, createBrowserRouter, RouterProvider} from 'react-router-dom'

import './App.css';
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {

const Layout = () => {
  return(
   <div className="main-layout">
    <Navbar />
    <Outlet />
  </div> 
  )
  
}

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children: [{
      path:"/",
      element: <Home />,

    },{
      path: "/register",
      element: <Register />
    },{
      path: "/login",
      element: <Login />
    }
  ]
  }
])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
