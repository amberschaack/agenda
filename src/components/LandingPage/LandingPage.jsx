import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import Box from '@mui/joy/Box';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import { Stack, Typography } from '@mui/joy';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
    {/* <center> */}
    <Box
      // height={200}
      my={4}
      display="flex"
      alignItems="center"
      p={0}
      sx={{ width: '91vw' }}
    >
      <Stack direction="column" spacing={1.5}>
        <img src="/public/AgendaBanner.png" />
        <Typography level="h3">
          Simplify your social life with Agenda—because planning events should be as fun as attending them!
        </Typography>
        <br/>
        <Typography level='h2' sx={{alignSelf: 'center'}}>About Agenda</Typography>
        <Typography >
          Agenda is a simple yet interactive platform designed to make event planning with friends a breeze! 
          Are you tired of endless group messages and confusing threads? Agenda centralizes all your event details in 
          one easy-to-access place, so you can focus on having fun, not on organizing.
        </Typography>
        <br/>
        <Typography level='h2' sx={{alignSelf: 'center'}}>With Agenda, you can:</Typography>
        <Typography>
          <b>Join or Create Groups:</b> Whether you're planning a big trip with friends or just a casual get-together, 
          create your own group or join existing ones with ease.
        </Typography>
        <Typography>
          <b>RSVP to Events:</b> Keep track of who's in and who's out with our easy-to-use RSVP system. 
          Never miss an event or leave anyone hanging.
        </Typography>
        <Typography>
          <b>Create Your Own Events:</b> Got something special in mind? Create your own events within your groups, 
          and let everyone know the time and place.
        </Typography>
      </Stack>
    </Box>
    {/* </center> */}
    </div>
  );
}

export default LandingPage;
