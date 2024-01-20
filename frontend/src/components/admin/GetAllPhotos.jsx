import React, {useState,useEffect} from 'react'
import axios from 'axios'


const GetAllPhotos = () => {

    const [photosInfo, setPhotosInfo] = useState([])
    const [photos, setPhotos] = useState()

    useEffect(  ()  => {
        const allPhotos =  async () => {
            try{
                const res = await axios.get('http://localhost:8000/admin/all-photos')
                setPhotosInfo(res.data)
                console.log(res.data,photosInfo);
            } catch(err) {
                console.log(err);
            }
        }
        allPhotos()
    }, [])

  return (
    <div className="">
        <div className="all-files">
            <div className="all-countries">
                <h2>All Countries</h2>
            {
                photosInfo.map((photo, key)=> {
                    <div className="">
                        <p>{photos.country}</p>
                    </div>
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