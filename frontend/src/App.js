import {Outlet, createBrowserRouter, Routes, Route, RouterProvider} from 'react-router-dom'

import './App.css';
import Home from './pages/Home'
import Navbar from './components/Navbar'

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
