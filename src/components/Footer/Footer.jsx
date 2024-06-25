import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import { AppBar, Container, Toolbar } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ClassNames } from '@emotion/react';
import { useSelector } from 'react-redux';

export default function Footer() {
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const user = useSelector(store => store.user);

  const goHome = () => {
    history.push('/user');
  }

  const goEvents = () => {
    history.push('/my-events');
  }

  const goGroups = () => {
    history.push('/my-groups');
  }

  return (
    <>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    {user.id && (
      <Box sx={{position: "fixed", bottom: 0, margin: "auto", width: "100vw", zIndex: 1 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction sx={{ color: "#1B9AAA" }} label="Home" icon={<HomeIcon  sx={{ color: "#0097B2" }} />} onClick={goHome} />
          <BottomNavigationAction sx={{ color: "#1B9AAA" }} label="Events" icon={<EventIcon sx={{ color: "#0097B2" }} />} onClick={goEvents}/>
          <BottomNavigationAction sx={{ color: "#1B9AAA" }} label="Groups" icon={<GroupsIcon sx={{ color: "#0097B2" }} />} onClick={goGroups}/>
        </BottomNavigation>
      </Box>
    )}
  
    {!user.id && (
      <></>
    )}
    </>
  );
}
