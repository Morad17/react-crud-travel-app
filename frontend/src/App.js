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


// Add new trip //
app.post("/new-trip",(req,res) => {
  const q = "INSERT INTO holidaytrips (`place_name`,`date_to_visit`,`how_long`,`activities`,`google_maps_link`) VALUES (?)" 
  const val = [
      req.body.place_name,
      req.body.date_to_visit,
      req.body.how_long,
      req.body.activities, 
      req.body.google_maps_link]
  mdb.query(q, [val],(err,data) => {
      if(err) return res.json(err)
      return res.json("success")
  })
})