import React, {useState,useEffect} from 'react'
import axios from 'axios'


const GetAllPhotos = () => {

    const [photosInfo, setPhotosInfo] = useState([])
    const [allCountries, setAllCountries ] = useState([])
    const [photos, setPhotos] = useState()

    useEffect(  ()  => {
        const allPhotos =  async () => {
            try{
                const res = await axios.get('http://localhost:8000/admin/all-photos')
                setPhotosInfo(res.data)
            } catch(err) {
                console.log(err);
            }
            }
        const getAllCountries = () => {


            console.log(photosInfo);
            const data = photosInfo.map((photo,key)=>{
                    return photo.country
                        } )
                        const uniqueCountries = []
            data.filter((val)=> val && val.includes('null') === false )
                            .forEach(c => { if(!uniqueCountries.includes(c)){
                            uniqueCountries.push(c)
                        }})
                        setAllCountries(uniqueCountries)
            console.log(uniqueCountries); 
                
            }   

        allPhotos()
        getAllCountries()
    }, [])

  return (
    <div className="">
        <div className="all-files">
            <div className="all-countries">
                <h2>All Countries</h2>
            {
                photosInfo.map((photo, key)=> {
                    return <div className="">
                        <p>{photo.country}</p>
                    </div>
                })
            }
            {
                allCountries?.map((country, key) => {
                    return <h1>{country}</h1>
                })
            }
            </div>
            <div className="all-provinces">

            </div>
            <div className="all-cities">
        </div>
        

        </div>
    </div>
  )
}

export default GetAllPhotos