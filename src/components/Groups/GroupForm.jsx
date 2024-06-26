import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useScript } from '../../hooks/useScript';
import { Avatar, Badge, Button, Stack, Typography } from '@mui/joy';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function GroupForm() {
    const dispatch = useDispatch();
    const [newGroup, setNewGroup] = useState({name: '', description: '', logo: ''});
    const history = useHistory();

    const backToUpcoming = () => {
        history.push('/user');
    }

    const addGroup = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_GROUP', payload: newGroup });
        history.push('/my-groups');
        setNewGroup({name: '', description: '', logo: ''});
    }

    const handleChange = (event) => {
        switch (event.target.id) {
            case 'group-name':
                setNewGroup({...newGroup, name: event.target.value});
                break;
            case 'group-description':
                setNewGroup({...newGroup, description: event.target.value});
                break;
        }
    }

    const openWidget = () => {
        // Currently there is a bug with the Cloudinary <Widget /> component
        // where the button defaults to a non type="button" which causes the form
        // to submit when clicked. So for now just using the standard widget that
        // is available on window.cloudinary
        // See docs: https://cloudinary.com/documentation/upload_widget#look_and_feel_customization
        !!window.cloudinary && window.cloudinary.createUploadWidget(
           {
              sources: ['local', 'url', 'camera'],
              cloudName: 'dz2bil44j',
              uploadPreset: 'hl5wdxak'
           },
           (error, result) => {
              if (!error && result && result.event === "success") {
                 // When an upload is successful, save the uploaded URL to local state!
                 setNewGroup({
                    ...newGroup,
                    logo: result.info.secure_url
                 })
              }
           },
        ).open();
     }

    return (
        <>
        <div className='container'>
            <form onSubmit={addGroup}>
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    sx={{ mb: '10px' }}
                    >
                    <Button onClick={backToUpcoming} sx={{ bgcolor: '#ADB5BD' }}>Cancel</Button>
                    <Button sx={{ bgcolor: '#1BAC5C' }} type="submit">Create New Group</Button>
                </Stack>
                <h1>New Group Form</h1>
                <div className='col-12 mb-3'>
                    <label>Group Name</label>
                    <input id='group-name' type='text' placeholder='Group Name' className='form-control' value={newGroup.name} onChange={handleChange} />
                </div>
                <div className='col-12 mb-3'>
                    <label>Group Name</label>
                    <input id='group-description' type='text' placeholder='Group Description' className='form-control' value={newGroup.description} onChange={handleChange} />
                </div>
                    { /* This just sets up the window.cloudinary widget */ }
                    {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}
                <Stack direction="column" justifyContent="space-evenly" alignItems="center" spacing={3}>
               <Typography>Select Group Picture</Typography>
                <Badge
                    onClick={openWidget}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="outlined"
                    badgeContent={
                    <CameraAltIcon
                        sx={{ width: '35px', height: '35px', color: '#343A40' }}
                    />
                    }
                    badgeInset="14%"
                    sx={{ '--Badge-paddingX': '0px' }}
                >
                    <Avatar variant="outlined" sx={{ width: 150, height: 150 }} />
                </Badge>
                </Stack>
            </form>
        </div>
        </>
    )
}