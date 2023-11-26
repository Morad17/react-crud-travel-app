import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const AddTrip = () => {
    const [trip, setTrip] = useState({
        place:"",
        date:null,
        length:null,
        activities:"",
        location:""
    })

    const navigate = useNavigate()
    const handleChange = (e) => {
        setTrip(prev=>({...prev, [e.target.name]:e.target.value }))
        
    }
    const handleSubmit = async e => {
        e.preventDefault()
        try{
            console.log(typeof(trip.length))
            await axios.post("http://localhost:8000/new-trip",trip)
            console.log(trip+"sent");
            navigate("/")
            
        } catch(err) {
            console.log(err);
        }
    }
  return (
    <div className="add-form">
        <h1>Add A New Trip</h1>
        <input type="text" placeholder="Place Name" onChange={handleChange} name="place"/>
        <input type="date" placeholder="Date Visited (year/month/day)" onChange={handleChange} name="date"/>
        <input type="number" placeholder="Length Of Stay (days)" onChange={handleChange} name="length"/>
        <input type="text" placeholder="Activities" onChange={handleChange} name="activities"/>
        <input type="text" placeholder="Google Maps Link" onChange={handleChange} name="location"/>
        <button className="add-trip-button" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default AddTrip