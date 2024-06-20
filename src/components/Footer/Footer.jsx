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

export default function Footer() {
  const [value, setValue] = React.useState(0);
  const history = useHistory();

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
    <Box sx={{ alignItems: 'center' }}>
      <CssBaseline />
      <Toolbar sx={{position: "fixed", bottom: 0, margin: "auto" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={goHome}/>
        <BottomNavigationAction label="Events" icon={<EventIcon />} onClick={goEvents}/>
        <BottomNavigationAction label="Groups" icon={<GroupsIcon />} onClick={goGroups}/>
      </BottomNavigation>
      </Toolbar>
    </Box>
  );
}
