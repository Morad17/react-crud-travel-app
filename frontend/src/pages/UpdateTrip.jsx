import axios from 'axios'
import React, {useState} from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateTrip = (id) => {

    const [trip, setTrip] = useState({
        place_name:"",
        date_to_visit:null,
        how_long:0,
        activities:"",
        google_maps_link:""
    })

    const [prevTripData, setPrevTripData] = useState('')

    const addDays = () => {
        const days = trip.how_long
        trip.how_long = days + 1     
        setTrip({...trip})

    }
    const subtractDays = () => {
        const days = trip.how_long
        if (days > 0) trip.how_long = days - 1
        setTrip({...trip})
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
    const prevTrip = async () => {
        try{
            const res = await axios.get("http://localhost:8000/trips/"+ tripId)
            const newData = res.data[0]
            setPrevTripData(newData)
            console.log(newData);
            console.log(prevTripData);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(()=> {
        prevTrip()
    }, [])
    

  return (
    <div>
        <div className="trip-update-card">
            <h1>Update My Trip</h1>
            <div className="update-form">
                {/* {
                    prevTripData? (prevTripData.map(()=>{
                        <div className="">{prevTripData.palce_name}</div>
                    })) : <div className="">Loading</div>
                } */}
                <div className="current-trip-details">
                    <div className="field">
                            <label htmlFor="">{}</label>
                            <input type="text" placeholder="" onChange={handleChange} name="place_name"/>
                        </div>
                        <div className="field">
                            <label htmlFor="">Current</label>
                            <input type="date" placeholder="Date Visited (year/month/day)" onChange={handleChange} name="date_to_visit"/>
                        </div>
                        <div className="field number-field">
                            <label htmlFor="">Current</label>   
                                <div className="toggles">
                                    <input type="number" value={trip.how_long} onChange={handleChange} name="how_long" id="how_long"/>
                                </div>
                        </div>
                        <div className="field">
                            <label htmlFor="">Current</label>
                            <input type="text" placeholder="" onChange={handleChange} name="activities"/>
                        </div>
                        <div className="field">
                            <label htmlFor="">Current</label>
                            <input type="text" placeholder="" onChange={handleChange} name="google_maps_link"/>
                        </div>
                </div>
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
            
            </div>
            <button className="update-trip-button" onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default UpdateTrip