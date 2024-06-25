import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { CardOverflow, Grid } from '@mui/joy';
import { CardActions, CardContent } from "@mui/material";
import Button from '@mui/joy/Button';

export default function GroupDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const groupDetails = useSelector(store => store.groupDetails);
    const memberships = useSelector(store => store.membership);
    console.log('Group Details', groupDetails);
    console.log('Members', memberships);

    useEffect(() => {
        dispatch({ type: 'FETCH_GROUP_DETAILS', payload: params.id });
        dispatch({ type: 'FETCH_MEMBERSHIPS', payload: params.id });
    }, []);

    return (
        <div className="container">
        <Grid>
            <Card sx={{ width: '90vw'}}>
                <Typography level='title-lg' noWrap>{groupDetails.name}</Typography>
                <Typography level='body-md'>Moderated By: {groupDetails.owner}</Typography>
                <CardOverflow>
                    <AspectRatio sx={{ midWidth: '50vw'}}>
                        <img src={groupDetails.logo} />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Typography level='body-md' fontWeight='bold'>Group Description:</Typography>
                    <Typography level='body-md' sx={{ mb: '10px' }}>{groupDetails.description}</Typography>
                    <Typography level='body-md' fontWeight='bold' sx={{ mb: '10px' }}>Group Members:</Typography>
                    <AvatarGroup max={10} sx={{ flexDirection: 'row', "--Avatar-size": "52px" }}>
                        {memberships.map((member, i) => (
                            <>
                                <Avatar alt={member.username} src={member.user_avatar} key={member.id} />
                            </>
                        ))}
                    </AvatarGroup>
                    </CardContent>
                    </Card>
                </Grid>
        </div>
    )
}