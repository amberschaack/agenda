import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import GroupItems from './GroupItems';
import MyGroupItems from './MyGroupItems';
import { Stack, Typography } from '@mui/joy';
import Add from '@mui/icons-material/Add';
import Button from '@mui/joy/Button';
import {IconButton} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export default function MyGroups() {
    const groups = useSelector(store => store.group);
    const myGroups = useSelector(store => store.myGroup);
    console.log('groups', groups);
    console.log('my groups', myGroups);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_GROUP' });
        dispatch({ type: 'FETCH_MY_GROUP' });
    }, []);

    const newGroup = () => {
        console.log('Clicked');
        history.push('/add-group');
      }

      const groupsPerPage = 3;
      const [currentIndex, setCurrentIndex] = useState(0);
      const currentGroups = groups.slice(currentIndex, currentIndex + groupsPerPage);
  
      const nextGroups = () => {
          if (currentIndex + groupsPerPage >= groups.length) {
            setCurrentIndex(0);
          } else {
              setCurrentIndex(currentIndex + groupsPerPage);
          }
        }
      
        const previousGroups = () => {
          if (currentIndex + groupsPerPage >= groups.length) {
            setCurrentIndex(0);
          } else {
            if (currentIndex === 0) {
              return;
            } else {
              setCurrentIndex(currentIndex - groupsPerPage);
            }
          }
        }

        const myPerPage = 3;
        const [mycurrentIndex, setmyCurrentIndex] = useState(0);
        const mycurrentGroups = myGroups.slice(mycurrentIndex, mycurrentIndex + myPerPage);
    
        const nextMyGroups = () => {
            if (mycurrentIndex + myPerPage >= myGroups.length) {
              setmyCurrentIndex(0);
            } else {
                setmyCurrentIndex(mycurrentIndex + myPerPage);
            }
          }
        
          const prevMyGroups = () => {
            if (mycurrentIndex + myPerPage >= myGroups.length) {
              setCurrentIndex(0);
            } else {
              if (mycurrentIndex === 0) {
                return;
              } else {
                setmyCurrentIndex(mycurrentIndex - myPerPage);
              }
            }
          }

    return (
        <div className="container">
            <center>
                <h1>My Groups</h1>
            </center>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{mb: '5px'}}>
             <h3>Joined Groups</h3>
             <GroupAddIcon sx={{fontSize: '40px', color: "#0097B2"}} onClick={newGroup}/>
            </Stack>
        <Stack direction="column" justifyContent="space-around" alignItems="center" spacing={1} sx={{ paddingBottom: "10px" }}>
                {currentGroups.map((group) => (
                    <GroupItems key={group.id} group={group} />
                ))}
        </Stack>
            <Stack direction='row' justifyContent='space-between' sx={{ margin: '6px'}}>
                    <IconButton onClick={previousGroups}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton onClick={nextGroups}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Stack>
        {myGroups.length>0 ? 
        <>
        <h3>Manage My Groups</h3>
        <Stack direction="column" justifyContent="space-around" alignItems="center" spacing={1} sx={{ paddingBottom: "10px" }}>
                {mycurrentGroups.map((group) => (
                    <MyGroupItems key={group.id} group={group} />
                ))}
        </Stack>
            <Stack direction='row' justifyContent='space-between' sx={{ margin: '6px'}}>
                    <IconButton onClick={prevMyGroups}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton onClick={nextMyGroups}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Stack>
        </>
        :
        <>
        <h3>Manage My Groups</h3>
        <Stack direction="column" justifyContent="space-around" alignItems="center" spacing={1} sx={{ paddingBottom: "10px" }}>
                <Typography fontSize='20px'>You currently don't own any groups.</Typography>
                <Button sx={{ bgcolor: "#0097B2" }} startDecorator={<Add />} onClick={newGroup} >Create New Group</Button>
        </Stack>
        </>
        }
        </div>
    )
}