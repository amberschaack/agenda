import React from 'react';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import GroupItems from './GroupItems';
import MyGroupItems from './MyGroupItems';
import { Stack, Typography } from '@mui/joy';
import Add from '@mui/icons-material/Add';
import Button from '@mui/joy/Button';

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

    return (
        <div className="container">
        <h1>My Groups</h1>
        <h3>Joined Groups</h3>
        <Stack direction="column" justifyContent="space-around" alignItems="center" spacing={1} sx={{ paddingBottom: "10px" }}>
                {groups.map((group) => (
                    <GroupItems key={group.id} group={group} />
                ))}
        </Stack>
        {myGroups.length>0 ? 
        <>
        <h3>Manage My Groups</h3>
        <Stack direction="column" justifyContent="space-around" alignItems="center" spacing={1} sx={{ paddingBottom: "10px" }}>
                {myGroups.map((group) => (
                    <MyGroupItems key={group.id} group={group} />
                ))}
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