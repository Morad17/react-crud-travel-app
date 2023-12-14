import React, {Suspense, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Canvas } from '@react-three/fiber'
import { Earth } from '../components/earth'

import TripCard from '../components/TripCard'



const Home = () => {
  const [trips, setTrips ] = useState([])

  

  useEffect(() => {
    const getAllTrips = async () => {
      try {
        const res = await axios.get("http://localhost:8000/trips")
        setTrips(res.data)
      } catch(err) {
        console.log(err);
      }
    }
      getAllTrips()
  }, [])
  
  
  return (
    <div className="home">
      <h1>All Trips</h1>
      {/* <div className="all-trips">
         {
          trips? (trips.map((trip, key) => {
            return <TripCard trip={trip} key={key} />
          })) : <p>Loading</p>
         }
         

      </div>
      <div className="add-trip">
        <button className="add-trip-button">
        <Link to="/add">Add Trip</Link> 
      </button>
      </div> */}
      
      <div className="canvas-container">
        <Canvas>
          <Suspense fallback={null}>
            <Earth />
          </Suspense>
        </Canvas>
      </div>

    </div>
  )
}

export default Home