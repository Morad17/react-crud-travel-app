import React, {useState,useEffect} from 'react'
import axios from 'axios'

import folder from '../../assets/images/icons/folder.png'

const GetAllPhotos = () => {

    const [photosInfo, setPhotosInfo] = useState([])
    const [allCountries, setAllCountries ] = useState([])
    const [allProvinces, setAllProvinces] = useState()
    const [allCities, setAllCities] = useState()
    const [allPhotos, setAllPhotos] = useState([])
    const [selectedInfo, setSelectedInfo ] = useState({
        date:"",
        place_name:"",
        province:"",
        city:"",
        country:"",
        tags: "",
    }) 
    const [photos, setPhotos] = useState()

    //Get All Photo Details //
    const fetchAllPhotos =  async () => {
        try{
            // Get All Data  //
            const res = await axios.get('http://localhost:8000/admin/all-photos')
            const data = res.data
            setPhotosInfo(data)
            // Extract All Unique Countries //
            const nData = data.map((photo,key)=>{ return photo.country} )
            const uniqueCountries = []
            nData.filter((val)=> val && val.includes('null') === false )
                .forEach(c => { if(!uniqueCountries.includes(c)){
                uniqueCountries.push(c)}})
                setAllCountries(uniqueCountries)
                console.log(uniqueCountries);
        } catch(err) {
            console.log(err);
        }
        }
        
    useEffect(()  => {

        fetchAllPhotos()
        
    }, [])
 
    //Holds users selected Country info & Updates related Provinces // 
    const selectCountry = (e) => {
        // Reset All Cities & Photos if changed Country
        setAllCities()
        setAllPhotos()
        const conSelected = e.target.value  
        const provArr = []
        photosInfo.filter(c => { return c.country === conSelected})
            .forEach( c=> {if(!provArr.includes(c.province)){  
                provArr.push(c.province)
                setAllProvinces(provArr)
            }})   
    }
    //Holds users selected Province info // 
    const selectProvince = (e) => {
        //Reset All Photos if changed Province //
        setAllPhotos()
        const provinceSelected = e.target.value 
        const cityArr = []
        photosInfo.filter(p => { return p.province === provinceSelected})
            .forEach( p=> {if(!cityArr.includes(p.city)){ 
                cityArr.push(p.city) 
                setAllCities(cityArr) 
            }})   
    }
    //Holds users selected Photo info // 
    const selectPhotos = (e) => {
        setSelectedInfo(prev => ({...prev, [e.target.name]: e.target.value}))  
        const citySelected = e.target.value
        const photoArr = photosInfo.filter(p => {return p.city === citySelected})
        setAllPhotos(photoArr) 
    }
  return (
    <div className="">
        <div className="all-files"> 
            <div className="all-countries">  
                <img className="folder-img"src={folder} alt="folder" />
                <h2>All Countries</h2>
                <div className="country-list">     
                    {allCountries?.map((country, key) => {
                    return <button name="country" value={country} onClick={selectCountry} 
                                className="file-btn country" key={key}>{country}
                            </button>
                    })}
                </div>   
                
            </div> 
            <div className="all-provinces"> 
                <img className="folder-img"src={folder} alt="folder" />
                <h2>All Provinces</h2>
                <div className="all-provinces">
                    {allProvinces?.map((prov, key) => {
                        return <button name="province" value={prov} onClick={selectProvince} 
                                    className="file-btn province" key={key}>{prov}
                                </button>
                    })}
                </div>
                
            </div>
            <div className="all-cities"> 
                <img className="folder-img"src={folder} alt="folder" />
                <h2>All Cities</h2>
                <div className="all-cities">
                    { allCities?.map((city, key)=> {
                        return <button name="city" value={city} onClick={selectPhotos} 
                                    className="file-btn city" key={key}>{city}
                                </button>
                    })}
                </div>
            </div>
            <div className="all-photos">
                
                    {allPhotos?.map((p,key)=> {
                       return <p>{p.place_name}</p> 
                    })}
            </div>
        </div>
    </div>
  )
}

export default GetAllPhotos