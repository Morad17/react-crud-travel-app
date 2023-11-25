import React, {useEffect, useState} from 'react'
import axios from 'axios'
import TripCard from '../components/TripCard'

import { Link } from 'react-router-dom'

const Home = () => {
  const [trips, setTrips ] = useState([])

  

  useEffect(() => {
    const getAllTrips = async () => {
      try {
        const res = await axios.get("http://localhost:8000/trips")
        setTrips(res.data)
        console.log(trips);
      } catch(err) {
        console.log(err);
      }
    }
      getAllTrips()
  }, [])
  
  
  return (
    <div className="home">
      <h1>All Trips</h1>
      <div className="all-trips">
         {
          trips? (trips.map((trip, key) => {
            return <TripCard trip={trip} key={key} />
          })) : <p>Loading</p>
         }
         
         {console.log(trips)}
      </div>
      <button className="add-trip">
        <Link to="/add">Add Trip</Link> 
      </button>
    </div>
  )
}

export default Home