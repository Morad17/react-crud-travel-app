import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

import Select from 'react-select'
import countryList from 'react-select-country-list'

const UploadPhotos = () => {
  
    const [file, setFile] = useState()
    const [tags, setTags] = useState()
    const [country, setCountry] = useState("")
    const [ tripData, setTripData] = useState({
        date:"",
        place_name:"",
        province:"",
        city:"",
        country:"",
        tags: "",

    })
    const options = useMemo(() => countryList().getData(), [])

    // Get All Tags
    useEffect(()=>{
        const allTags = async () => {
            try{
                const res = await axios.get("http://localhost:8000/tags/")
                const tagArr = []
                res.data.map(tag => tagArr.push(tag.tag_name))
                setTags(tagArr)
            } catch(err){
                console.log(err);
            }
        } 
        allTags()
    }, [])

    const navigate= useNavigate()
    const handleChange = (e) => {
        setTripData(prev=>({...prev, [e.target.name]:e.target.value}))
    }
    // Error Message //
    const errorMessage = () => {
        return console.log("error in form")
    }

    // Adding All Selected Tags to Form //
    const handleTags = () => {
        const tagElements = document.getElementsByClassName("tag-checkbox")
        const tagElementsArray = Array.from(tagElements)
        const selectedTags = tagElementsArray.filter(tag => tag.checked === true)
            .map(tag => tag.name)
            .toString()
        setTripData(prev => ({
            ...prev, tags: selectedTags
        }))}

    const fileSelected = e => {
        const file = e.target.files[0]
        setFile(file)
    }

    const countryHandler = country => {
        const countryName = country.label
        setCountry(country)
        setTripData(prev => ({
            ...prev, country:countryName
        }))
        console.log(tripData.country, countryName);
      }


       
    const submit = async e => {
        
        e.preventDefault()
        
            handleTags()
            //Appending file with All form data //
            const formData = new FormData()
            formData.append("images", file)
            formData.append("photo_name",tripData.photo_name)
            formData.append("date", tripData.date)
            formData.append("place_name", tripData.place_name)
            formData.append("province", tripData.province)
            formData.append("city", tripData.city)
            formData.append("country", tripData.country)
            formData.append("tags", tripData.tags)

            await axios.post("http://localhost:8000/admin/posts", formData, { headers:{'Content-Type': 'multipart/form-data'}})
            console.log(formData);
            navigate("/")
        }

    

  return (
            <form onSubmit={submit} encType="multipart/form-data">
                <h2>Upload Your Photo</h2>
                <div className="field">
                    <label >Choose A Photo</label>
                    <input required onChange={fileSelected} name="images" accept="image/*" type="file" />
                </div>
                <div className="field">
                    <label htmlFor="">Date</label>
                    <input required name="date"type="date" placeholder="Date Visited (year/month/day)" onChange={handleChange} />
                </div>
                <div className="field">
                    <label htmlFor="">Place Name</label>
                    <input required name="place_name" onChange={handleChange} type="text" />
                </div>
                <div className="field">
                    <label htmlFor="">Country</label>
                    <Select required options={options} value={country} onChange={countryHandler} />
                </div>
                <div className="field">
                    <label htmlFor="">Province</label>
                    <input required name="province" onChange={handleChange} type="text" />
                </div>
                <div className="field">
                    <label htmlFor="">City</label>
                    <input required name="city" onChange={handleChange} type="text" />
                </div>
                <div className="field tag-checkbox-list">
                    <h3>Tags</h3>
                    <div className="tag-div">
                        {
                        tags?.map((tag, key)=> {
                            return <div key={key} className="tag">
                                <label >{tag}</label>
                                <input   className="tag-checkbox" name={tag} type="checkbox" />
                            </div>
                        })
                    }
                    </div>
                    
                </div>
                <button type="submit">Submit</button>
            </form>
  )
}

export default UploadPhotos