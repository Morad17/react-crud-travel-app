import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const AddTrip = () => {
    const [trip, setTrip] = useState({
        place_name:"",
        date_to_visit:null,
        how_long:0,
        activities:"",
        google_maps_link:""
    })

    const addDays = () => {
        const days = trip.how_long
        trip.how_long = days + 1     
        setTrip({...trip})

        console.log(days)
    }
    const subtractDays = () => {
        const days = trip.how_long
        if (days > 0) trip.how_long = days - 1
        setTrip({...trip})

        console.log(days);
    }

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
            <div className="input-field">
                <div className="field">
                    <label htmlFor="">Name Of Place</label>
                    <input type="text" placeholder="" onChange={handleChange} name="place_name"/>
                </div>
                <div className="field">
                    <label htmlFor="">Date Of Visit</label>
                    <input type="date" placeholder="Date Visited (year/month/day)" onChange={handleChange} name="date_to_visit"/>
                </div>
                <div className="field number-field">
                    <label htmlFor="">Length Of Stay (Days)</label>   
                        <div className="toggles">
                            <button className="add-days" onClick={addDays}>+</button>
                            <input type="number" value={trip.how_long} onChange={handleChange} name="how_long" id="how_long"/>
                            <button className="subtract-days" onClick={subtractDays}>-</button>
                        </div>
                </div>
                <div className="field">
                    <label htmlFor="">Activities</label>
                    <input type="text" placeholder="" onChange={handleChange} name="activities"/>
                </div>
                <div className="field">
                    <label htmlFor="">Google Maps Link</label>
                    <input type="text" placeholder="" onChange={handleChange} name="google_maps_link"/>
                </div>
            </div>
        <button className="add-trip-button" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default AddTrip