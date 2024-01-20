import React, { useState, useEffect } from 'react'
import UploadPhotos  from '../../components/admin/UploadPhotos'
import GetAllPhotos from '../../components/admin/GetAllPhotos'

const AdminHome = () => {

    

  return (
    <div className="admin-home">
        <div className="all-photos">
            <GetAllPhotos />
        </div>
        <div className="upload-photo-form">
            {/* <UploadPhotos /> */}
        </div>
        
    </div>
  )
}

export default AdminHome