import React, {useEffect, useState} from 'react'
import axios from 'axios'

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
    <div>
      <h1>All books</h1>
      <div className="">
         {
          trips? (trips.map((trip, key) => {
            return <p key={key}>{trip.place_name}</p>
          })) : <p>Loading</p>
         }
         
         {console.log(trips)}
      </div>
    </div>
  )
}

export default Home