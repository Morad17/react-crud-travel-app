import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'

import 'leaflet/dist/leaflet.css'



const InteractiveMap = () => {

    const markers = [
        {
            geocode: [-8.40488, 115.23594],
            popUp: "Indonesia"
        },
        {
            geocode: [3.15221, 101.68595],
            popUp: "Kuala Lumpur"
        },
        {
            geocode: [1.29670, 103.79790],
            popUp: "Singapore"
        },
        {
            geocode: [37.56040, 127.02013],
            popUp: "South Korea"
        },
        {
            geocode: [35.68, 139.77],
            popUp: "Japan"
        }
    ]

    //Icon

    const customIcon = new Icon({
        iconUrl: require("../assets/images/pin-red.png"),
        iconSize: [35, 35] //size in px
    })

    console.log(process.env.REACT_APP_JAWG_ACCESS_TOKEN);

  return (
    <div className="interactive-map">
        <MapContainer 
            center={ [ 14.59, 120.98]}
            zoom={ 3.5 }
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