import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

import ReactFlagsSelect from 'react-flags-select'
import { getName } from 'country-list'

const UploadPhotos = () => {
  
    const [file, setFile] = useState()
    const [tags, setTags] = useState()
    const [selected, setSelected] = useState("")
    const [ tripData, setTripData] = useState({
        date:null,
        place_name:null,
        province:null,
        city:null,
        country:null,
        tags: "",

    })

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
    //Adding Country to form //
    const handleCountry = () => {
        const country = getName(selected)
        setTripData( prev => ({
            ...prev, country:country
        }))
        console.log(country, tripData.country);
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
       
    const submit = async e => {
        
        e.preventDefault()
        const formCheck = () => {
            console.log(tripData);
            // let i =  0
            // while (tripData[i] !== null){
                
            //     if (tripData[i] === null)
            //         error = tripData[i]
            //         console.log(tripData[i])
            //             break
            //     i++
            // }
            for (let i=0;i<tripData.length; i++) {
                if(tripData[i] == null){
                    console.log(tripData[i])
                    return false

            }
            
        }
        if( formCheck.form === false) {
            errorMessage()
        } else {
            handleCountry()
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
        }}

    const fileSelected = e => {
        const file = e.target.files[0]
        setFile(file)
    }

  return (
            <form onSubmit={submit} encType="multipart/form-data">
                <h2>Upload Your Photo</h2>
                <div className="field">
                    <label >Choose A Photo</label>
                    <input onChange={fileSelected} name="images" accept="image/*" type="file" />
                </div>
                <div className="field">
                    <label htmlFor="">Date</label>
                    <input name="date"type="date" placeholder="Date Visited (year/month/day)" onChange={handleChange} />
                </div>
                <div className="field">
                    <label htmlFor="">Place Name</label>
                    <input name="place_name" onChange={handleChange} type="text" />
                </div>
                <div className="field">
                    <label htmlFor="">Country</label>
                    <ReactFlagsSelect required selected={selected} onSelect={(code) => setSelected(code)} />
                </div>
                <div className="field">
                    <label htmlFor="">Province</label>
                    <input name="province" onChange={handleChange} type="text" />
                </div>
                <div className="field">
                    <label htmlFor="">City</label>
                    <input name="city" onChange={handleChange} type="text" />
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