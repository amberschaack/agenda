import { useDispatch, useSelector } from 'react-redux';
import { useScript } from '../../hooks/useScript';
import React, { useState } from 'react';

export default function MyProfile() {
   const dispatch = useDispatch();
   const [editProfile, setEditProfile] = useState({avatar: ''});
   const userInfo = useSelector(store => store.user);

   const handleSubmit = (event) => {
      event.preventDefault();
      dispatch({ type: 'EDIT_PROFILE', payload: editProfile });
      setEditProfile({avatar: ''});
   }

    const openWidget = () => {
        !!window.cloudinary && window.cloudinary.createUploadWidget(
           {
              sources: ['local', 'url', 'camera'],
              cloudName: 'dz2bil44j',
              uploadPreset: 'hl5wdxak'
           },
           (error, result) => {
              if (!error && result && result.event === "success") {
                 setEditProfile({
                    ...editProfile,
                    avatar: result.info.secure_url
                 })
              }
           },
        ).open();
     }

    return (
        <div className="container">
            <h1>My Profile</h1>
            <h3>Current Profile Photo:</h3>
               <img src={userInfo.avatar} />
            <h3>Edit Profile Picture</h3>
            { /* This just sets up the window.cloudinary widget */ }
                    {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}

                    Photo to upload: <button type="button" onClick={openWidget}>Select Photo</button>
                    <br />
               <button onClick={handleSubmit}>Add New Profile Photo</button>
        </div>
    )
}