import React, { useState, useEffect } from 'react'
import UploadPhotos  from '../../components/admin/UploadPhotos'

const AdminHome = () => {

    

  return (
    <div className="admin-home">
        <div className="all-photos">
            
        </div>
        <div className="upload-photo-form">
            <UploadPhotos />
        </div>
        
    </div>
  )
}

export default AdminHome