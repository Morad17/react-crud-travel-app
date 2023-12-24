import React from 'react'
import DetailsMap from '../components/DetailsMap'

import Stock from '../assets/images/stock-country-slide.JPG'
import Activities from '../assets/images/icons/activities.png'
import Date from '../assets/images/icons/date.png'
import Days from '../assets/images/icons/days.png'
import CountryImgSlider from '../components/CountryImgSlider'

const Country = ({}) => {
  return (
    <div className="country-page">
        <div className="details-section">
          <div className="details-1">
            <h3>23Rd October</h3>
            <img className="icon" src={Date} alt="date" />
          </div>
          <div className="details-2">
            <h3>45 Days</h3>
            <img className="icon" src={Days} alt="days" />
          </div>
          <h3>White Water Rafting, Snorkeling</h3>
          <img className="icon" src={Activities} alt="" />
        </div>
        <div className="country-section">
          <div className="slideshow-and-navigation">
            <div className="slideshow">
              <CountryImgSlider />
            </div>
            <div className="navigation">

            </div>
          </div>
          <div className="map-and-description">
            <div className="country-map">
              <DetailsMap />
            </div>
            <div className="country-description">
              <p>
                Loren Ipsum
              </p>
            </div>
          </div>
        </div>
        
    </div>
  )
}

export default Country