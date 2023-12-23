import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { Icon } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'

import 'leaflet/dist/leaflet.css'



const DetailsMap = () => {

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
    const polyLines = [
        [-8.40488, 115.23594],
        [3.15221, 101.68595],
        [1.29670, 103.79790],
        [37.56040, 127.02013],
        [35.68, 139.77]
    ]

    //Icon

    const customIcon = new Icon({
        iconUrl: require("../assets/images/pin-red.png"),
        iconSize: [35, 35] //size in px
    })

  return (
    <div className="details-map">
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
            })}
            <Polyline positions={polyLines} dashArray={4} weight={2} opacity={0.8} color="#408b59"/>
         
        </MapContainer>
    </div>
  )
}

export default DetailsMap