import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';

export default function GroupItems({ group }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user);
    console.log('user', user);
    // console.log('array includes', user.memberships.includes(group.id));

    const [joined, setJoined] = useState('');

    const joinGroup = (groupId) => {
        console.log('Clicked', groupId);
        dispatch({ type: 'JOIN_GROUP', payload: groupId });
        dispatch({ type: 'FETCH_USER' });
        setJoined(!joined);
    }

    const unjoinGroup = (groupId) => {
        dispatch({ type: 'UNJOIN_GROUP', payload: groupId});
        dispatch({ type: 'FETCH_GROUP' });
        dispatch({ type: 'FETCH_USER' });
        setJoined(!joined);
    }

    const groupDetails = (groupId) => {
        dispatch({ type: 'FETCH_GROUP_DETAILS', payload: groupId });
        history.push(`/group/details/${groupId}`);
    }

    return (
        <>
            <Card orientation="horizontal" variant="outlined" sx={{ width: '90vw' }}>
                <CardOverflow onClick={() => groupDetails(group.id)} sx={{cursor: 'pointer'}}>
                    <AspectRatio ratio="1" sx={{ width: 90 }}>
                        <img src={group.logo} />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Typography fontWeight="md">
                        {group.name}
                    </Typography>
                </CardContent>
                {!joined && !user.memberships?.includes(group.id) ? 
                <CardOverflow
                    onClick={() => joinGroup(group.id)}
                    variant="soft"
                    color="primary"
                    sx={{
                    px: 2,
                    writingMode: 'vertical-rl',
                    justifyContent: 'center',
                    fontSize: 'xs',
                    fontWeight: 'xl',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer'
                    }}
                >
                    Join
                </CardOverflow>
                :
                <CardOverflow
                onClick={() => unjoinGroup(group.id)}
                variant="soft"
                color="primary"
                sx={{
                px: 2,
                writingMode: 'vertical-rl',
                justifyContent: 'center',
                fontSize: 'xs',
                fontWeight: 'xl',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                borderLeft: '1px solid',
                borderColor: 'divider',
                bgcolor: '#A5D0A8',
                cursor: 'pointer'
                }}
            >
                Leave
            </CardOverflow>
                }
            </Card>
        </>
    )
}