import {Outlet, createBrowserRouter, RouterProvider} from 'react-router-dom'

import './App.css';
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import AddTrip from './pages/AddTrip';
import UpdateTrip from './pages/UpdateTrip';

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

    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path:"/add",
      element: <AddTrip />
    },
    {
      path:"/update/:id",
      element: <UpdateTrip />
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
