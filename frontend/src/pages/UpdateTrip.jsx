import axios from 'axios'
import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateTrip = (id) => {

    const [trip, setTrip] = useState({
        place:"",
        date: null,
        length:null,
        activities:"",
        location:""
    })

    const navigate = useNavigate()
    const location = useLocation()

    const tripId = location.pathname.split("/")[2]

    const handleChange = (e) => {
        setTrip(prev=>({...prev, [e.target.name]:e.target.value }))
        
    }
    const handleSubmit = async e => {
        e.preventDefault()
        try{
            console.log(typeof(trip.length))
            await axios.put("http://localhost:8000/trips/"+ tripId,trip)
            console.log(trip+"sent");
            navigate("/")
            
        } catch(err) {
            console.log(err);
        }
    }
  return (
    <div>
        <h1>Update My Trip</h1>
        <div className="trip-update-card">
        <div className="add-form">
        <h1>Add A New Trip</h1>
        <input type="text" placeholder="Place Name" onChange={handleChange} name="place"/>
        <input type="date" placeholder="Date Visited (year/month/day)" onChange={handleChange} name="date"/>
        <input type="number" placeholder="Length Of Stay (days)" onChange={handleChange} name="length"/>
        <input type="text" placeholder="Activities" onChange={handleChange} name="activities"/>
        <input type="text" placeholder="Google Maps Link" onChange={handleChange} name="location"/>
        <button className="add-trip-button" onClick={handleSubmit}>Submit</button>
        </div>
        </div>
    </div>
  )
}

export default UpdateTrip