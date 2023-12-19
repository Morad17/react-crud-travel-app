import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'

import 'leaflet/dist/leaflet.css'



const InteractiveMap = () => {

    const markers = [
        {
            geocode: [48.85, 2.35],
            popUp: "Popup 1"
        },
        {
            geocode: [48.865, 2.315],
            popUp: "Popup 2"
        }
    ]

    //Icon

    const customIcon = new Icon({
        iconUrl: require("../assets/images/pin-red.png"),
        iconSize: [40, 40] //size in px
    })

    console.log(process.env.REACT_APP_JAWG_ACCESS_TOKEN);

  return (
    <div className="interactive-map">
        <MapContainer 
            center={ [ 48.85, 2.3]}
            zoom={ 13 }
            scrollWheelZoom={false} 
        >
        <TileLayer
            attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={`https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=${process.env.REACT_APP_JAWG_ACCESS_TOKEN}`}/>
            {
            markers.map((marker, key)=> {
                return <Marker position={marker.geocode} icon={customIcon}><h3>{marker.popUp}</h3></Marker>
            })
        }
        
        
        </MapContainer>
    </div>
  )
}

export default InteractiveMap