import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

const AdminHome = () => {

    const [file, setFile] = useState()
    const [ caption, setCaption ] = useState("")
      
    const navigate= useNavigate()
    const submit = async e => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("images", file)
        formData.append("caption", caption)
        await axios.post("http://localhost:8000/admin/posts", formData, { headers:{'Content-Type': 'multipart/form-data'}})
        navigate("/")
    }

    const fileSelected = e => {
        const file = e.target.files[0]
        setFile(file)
    }

  return (
    <div>
        <form onSubmit={submit} encType="multipart/form-data">
            <input onChange={fileSelected} name="images" accept="image/*" type="file" />
            <input value={caption} name="caption" onChange={e => setCaption(e.target.value) } type="text" />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AdminHome