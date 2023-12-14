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

    const [prevTripData, setPrevTripData] = useState([])

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
    

    useEffect(()=> {
        const prevTrip = async () => {
            try {
                const res = await axios.get("http://localhost:8000/trips/"+ tripId)
                const newData = res.data
                setPrevTripData(newData)
            } catch(err) {
                console.log(err);
            }
        }
        prevTrip()
    }, [])

  return (
    <div className="trip-update-card">
        <h1>Update My Trip</h1>
        <div className="update-form">
        {prevTripData? (prevTripData.map((prev, key)=>{
            const visitDate = prev.date_to_visit.slice(0,10).toString().replace(/-/g, '/')
            return <div className="current-trip-details" key={key}>
                    <div className="field">
                        <label >Current</label>
                        <input type="text" placeholder={prev.place_name} name="place_name" readOnly/>
                    </div>
                    <div className="field">
                        <label >Current</label>
                        <input type="string"  value={visitDate} id="current-trip-date" readOnly/>

                    </div>
                    <div className="field number-field">
                        <label >Current</label>   
                            <div className="toggles">
                                <input type="number" value={prev.how_long} name="how_long" readOnly/>
                            </div>
                    </div>
                    <div className="field">
                        <label >Current</label>
                        <input type="text" placeholder={prev.activities} name="activities" readOnly/>
                    </div>
                    <div className="field">
                        <label >Current</label>
                        <input type="text" placeholder={prev.google_maps_link} name="google_maps_link" readOnly/>
                    </div>
                </div>
            })) : <div className="">Loading</div>
         }
            <div className="input-field">
                <div className="field">
                    <label >Name Of Place</label>
                    <input type="text" placeholder="" onChange={handleChange} name="place_name"/>
                </div>
                <div className="field">
                    <label >Date Of Visit</label>
                    <input type="date" placeholder="Date Visited (year/month/day)" onChange={handleChange} name="date_to_visit"/>
                </div>
                <div className="field number-field">
                    <label >Length Of Stay (Days)</label>   
                        <div className="toggles">
                            <button className="add-days" onClick={addDays}>+</button>
                            <input type="number" value={trip.how_long} onChange={handleChange} name="how_long" id="how_long"/>
                            <button className="subtract-days" onClick={subtractDays}>-</button>
                        </div>
                </div>
                <div className="field">
                    <label >Activities</label>
                    <input type="text" placeholder="" onChange={handleChange} name="activities"/>
                </div>
                <div className="field">
                    <label >Google Maps Link</label>
                    <input type="text" placeholder="" onChange={handleChange} name="google_maps_link"/>
                </div>
            </div>
        
        </div>
        <button className="update-trip-button" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default UpdateTrip