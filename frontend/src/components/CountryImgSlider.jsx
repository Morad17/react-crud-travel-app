import React, { useState } from 'react'

import StockImage from '../assets/images/stock-country-slide.JPG'
import LeftArrow from '../assets/images/icons/left-arrow.png'
import RightArrow from '../assets/images/icons/right-arrow.png'


const CountryImgSlider = () => {

    const [activeIndex, setActiveIndex ] = useState(0)

    const updateIndex = (newIndex) => {
        if ( newIndex < 0) {
            newIndex = 0
        } else if (newIndex >= ImageArray.length) {
            newIndex = ImageArray.length - 1
        }
        setActiveIndex(newIndex)
    }   

    const ImageArray = [
        {image:StockImage},
        {image:StockImage},
        {image:StockImage},
    ]


  return (
    <div className="country-image-slider">
        <div className="slider-inner" 
            style={{ transform: `translate(-${activeIndex * 100}%)`}}>
            {
                ImageArray.map(
                    (i, key)=> {return <img className="slide-photo" key={key} src={i.image} alt="country" /> })
            }
        </div>
        <div className="slider-buttons">
            <button className="btn-left" onClick={()=> {
                updateIndex( activeIndex -1)
            }}>
                <img src={LeftArrow} alt="arrow" />
            </button>
            <button className="btn-right" onClick={()=> {
                updateIndex( activeIndex + 1)
            }}>
                <img src={RightArrow} alt="arrow" />
            </button>

        </div>
    </div>
  )
}

export default CountryImgSlider