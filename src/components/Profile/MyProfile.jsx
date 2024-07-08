import { useDispatch, useSelector } from 'react-redux';
import { useScript } from '../../hooks/useScript';
import React, { useState } from 'react';
import { Avatar, Stack, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import Badge from "@mui/joy/Badge";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

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
              cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
              uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
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
            <Stack direction="column" justifyContent="space-evenly" alignItems="center" spacing={3}>
               <Typography>Edit Profile Picture</Typography>
                <Badge
                    onClick={openWidget}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="outlined"
                    badgeContent={
                    <CameraAltIcon
                        sx={{ width: '35px', height: '35px', color: '#343A40', cursor: 'pointer' }}
                    />
                    }
                    badgeInset="14%"
                    sx={{ '--Badge-paddingX': '0px' }}
                >
                    <Avatar variant="outlined" sx={{ width: 150, height: 150 }} src={userInfo.avatar} />
                </Badge>
                    {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}
                  <Button onClick={handleSubmit} sx={{ bgcolor: "#1BAC5C" }}>Save Changes</Button>
                </Stack> 
            { /* This just sets up the window.cloudinary widget */ }
                    {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}
                    <br />
        </div>
    )
}