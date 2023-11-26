import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const AddTrip = () => {
    const [trip, setTrip] = useState({
        place_name:"",
        date_to_visit:null,
        how_long:null,
        activities:"",
        google_maps_link:""
    })

    const navigate = useNavigate()
    const handleChange = (e) => {
        setTrip(prev=>({...prev, [e.target.name]:e.target.value }))
    }
    const handleSubmit = async e => {
        e.preventDefault()
        try{
            
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
        <input type="text" placeholder="Place Name" onChange={handleChange} name="place_name"/>
        <input type="date" placeholder="Date Visited (year/month/day)" onChange={handleChange} name="date_to_visit"/>
        <input type="number" placeholder="Length Of Stay (days)" onChange={handleChange} name="how_long"/>
        <input type="text" placeholder="Activities" onChange={handleChange} name="activities"/>
        <input type="text" placeholder="Google Maps Link" onChange={handleChange} name="google_maps_link"/>
        <button className="add-trip-button" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default AddTrip