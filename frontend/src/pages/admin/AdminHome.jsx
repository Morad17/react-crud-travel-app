import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

import ReactFlagsSelect from 'react-flags-select'

const AdminHome = () => {

    const [file, setFile] = useState()
    const [tags, setTags] = useState()
    const [selectedCountry, setSelectedCountry] = useState("")
    const [ tripData, setTripData] = useState({
        date:null,
        place_name:"",
        province:null,
        city:"",
        country:"",
        tags: null

    })
      
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

    const submit = async e => {
        e.preventDefault()
        const tagElements = document.getElementsByClassName("tag-checkbox")
        const tagElementsArray = Array.from(tagElements)
        const selectedTags = tagElementsArray.filter(tag => tag.checked === true)
            .map(tag => tag.name)
        setTripData(prev => ({
            ...prev, tags: selectedTags
        }))

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

    const fileSelected = e => {
        const file = e.target.files[0]
        setFile(file)
    }

  return (
    <div className="">
        <form onSubmit={submit} encType="multipart/form-data">
            <div className="field">
                <label htmlFor=""></label>
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
                <ReactFlagsSelect selected={selectedCountry} onSelect={(code) => setSelectedCountry(code)} />
            </div>
            <div className="field">
                <label htmlFor="">Province</label>
                <input name="province" onChange={handleChange} type="text" />
            </div>
            <div className="field">
                <label htmlFor="">City</label>
                <input name="city" onChange={handleChange} type="text" />
            </div>
            <div className="field">
                <h3>Tags</h3>
                {
                    tags?.map((tag, key)=> {
                        return <div className="tag-checkbox-list">
                            <label >{tag}</label>
                            <input key={key} className="tag-checkbox" name={tag} type="checkbox" />
                        </div>
                    })
                }
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AdminHome