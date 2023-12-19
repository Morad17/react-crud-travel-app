import React, {Suspense, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import InteractiveMap from '../components/InteractiveMap'

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
      <InteractiveMap />
    </div>
  )
}

export default Home