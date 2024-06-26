import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';

export default function MyGroupItems({ group }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user);
    console.log('user', user);

    const groupDetails = (groupId) => {
        dispatch({ type: 'FETCH_GROUP_DETAILS', payload: groupId });
        history.push(`/group/details/${groupId}`);
    }

    const editGroup = (groupid) => {
        console.log('Clicked', groupid);
        dispatch({ type: 'FETCH_GROUP_DETAILS', payload: groupid });
        dispatch({ type: 'FETCH_MEMBERSHIPS', payload: groupid });
        history.push(`/group/edit/${groupid}`);
    }

    return (
        <>
            <Card orientation="horizontal" variant="outlined" sx={{ width: '90vw' }}>
                <CardOverflow onClick={() => groupDetails(group.id)}>
                    <AspectRatio ratio="1" sx={{ width: 90 }}>
                        <img src={group.logo} />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Typography fontWeight="md">
                        {group.name}
                    </Typography>
                </CardContent>
                <CardOverflow
                    onClick={() => editGroup(group.id)}
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
                    }}
                >
                    Edit
                </CardOverflow>
            </Card>
        </>
    )
}