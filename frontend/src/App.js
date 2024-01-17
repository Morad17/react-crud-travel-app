import {Outlet, createBrowserRouter, RouterProvider} from 'react-router-dom'


import Home from './pages/Home'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import AddTrip from './pages/AddTrip';
import UpdateTrip from './pages/UpdateTrip';
import DetailsMap from './components/DetailsMap'
import Country from './pages/Country'
import AdminHome from './pages/admin/AdminHome'

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
      element: <AdminHome />,

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


