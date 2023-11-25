import React from 'react'
import tripCardStock from '../assets/images/trip-card-stock.jpg'

const TripCard = (
    {trip: {place_name,date_to_visit,how_long,activities,google_maps_link}}, key
) => {
  return (
    <div className="trip-card" key={key}>
        <div className="card-block-image">
          <img src={tripCardStock} alt="" className="card-image" />  
        </div>
        
        <h2 className="card-title">{place_name}</h2>
        <div className="card-details">
           <span className="card-headings">
                <p className="card-date-heading">Date Visited:</p>
                <p className="card-duration-heading">Length Of Stay</p>
                <p className="card-activities-heading">Activities</p>
                <p className="card-location-heading">Location</p>
            </span>
            <span>
                <p className="card-date">{date_to_visit}</p>
                <p className="card-duration">{how_long}</p>
                <p className="card-activities">{activities}</p>
                <p className="card-location">{google_maps_link}</p>
            </span>
        </div>
    </div>
  )
}

export default TripCard