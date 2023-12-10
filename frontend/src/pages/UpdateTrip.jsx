import axios from 'axios'
import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateTrip = (id) => {

    const [trip, setTrip] = useState({
        place_name:"",
        date_to_visit:null,
        how_long:null,
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
    const location = useLocation()

    const tripId = location.pathname.split("/")[2]

    const handleChange = (e) => {
        setTrip(prev=>({...prev, [e.target.name]:e.target.value }))
        
    }
    const handleSubmit = async e => {
        e.preventDefault()
        console.log(tripId+trip);
        try{
            console.log(trip)
            await axios.put("http://localhost:8000/trips/"+ tripId,trip)
            console.log(trip+"sent");
            navigate("/")
            
        } catch(err) {
            console.log(err);
        }
    }
  return (
    <div>
        <div className="trip-update-card">
            <div className="add-form">
                <h1>Update My Trip</h1>
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
        </div>
    </div>
  )
}

export default UpdateTrip