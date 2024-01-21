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
            const res = await axios.get('http://localhost:8000/admin/all-photos')
            setPhotosInfo(res.data)
        } catch(err) {
            console.log(err);
        }
        }

    //Get All Photo Countries //
    const getAllCountries = () => {
        const data = photosInfo.map((photo,key)=>{ return photo.country} )
        const uniqueCountries = []
        data.filter((val)=> val && val.includes('null') === false )
            .forEach(c => { if(!uniqueCountries.includes(c)){
            uniqueCountries.push(c)}})
            setAllCountries(uniqueCountries)
        }   
    useEffect(()  => {
        
        
        fetchAllPhotos()
        getAllCountries()   
    }, [])
 
    //Holds users selected Country info // 
    const selectCountry = (e) => {
        setSelectedInfo(prev => ({...prev, [e.target.name]: e.target.value}))  
        getProvinces()
    }
    //Holds users selected Country info // 
    const selectProvince = (e) => {
        setSelectedInfo(prev => ({...prev, [e.target.name]: e.target.value}))  
        getCities()
    }
    //Holds users selected Photo info // 
    const selectPhotos = (e) => {
        setSelectedInfo(prev => ({...prev, [e.target.name]: e.target.value}))  
        getPhotos()
    }
    const getProvinces = () => { 
        const conSelected = selectedInfo.country  
        const provArr = []
        photosInfo.filter(c => { return c.country == conSelected})
            .forEach( c=> {if(!provArr.includes(c.province)){  
                provArr.push(c.province)
                setAllProvinces(provArr)
            }})     
    }
    // Get All Seleced Provinces // 
    const getCities = () => { 
        const provinceSelected = selectedInfo.province  
        const cityArr = []
        photosInfo.filter(p => { return p.country == provinceSelected})
            .forEach( p=> {if(!cityArr.includes(p.city)){ 
                cityArr.push(p.city) 
                setAllCities(cityArr) 
            }})  
                  
    }
    // Get All Selected Photo(s) //
    const getPhotos = () => {
        const citySelected = selectedInfo.city
        const photoArr = photosInfo.filter(p => {return p.city == citySelected})
        
        setAllPhotos(photoArr)
    }

  return (
    <div className="">
        <div className="all-files"> 
            <div className="all-countries">
                <h2>All Countries</h2>
                <img src={folder} alt="folder" />
                <div className="country-list">     
                    {allCountries?.map((country, key) => {
                        return <button name="country" value={country} onClick={selectCountry} className="file-btn country" key={key}>{country}</button>
                    })}
                </div>   
                
            </div> 
            <div className="all-provinces">   
                {
                    allProvinces?.map((prov, key) => {
                        return <button name="province" value={prov} onClick={selectProvince} className="file-btn province" key={key}>{prov}</button>
                    })
                }
            </div>
            <div className="all-cities"> 
            {
                    allCities?.map((city, key)=> {
                        return <button name="city" value={city} onClick={selectPhotos} className="file-btn city" key={key}>{city}</button>
                    })
                }
            </div>
            <div className="all-photos">
                {
                    allPhotos?.map((p,key)=> {
                       return <p>{p.place_name}</p> 
                    })
                }
            </div>

        </div>
    </div>
  )
}

export default GetAllPhotos