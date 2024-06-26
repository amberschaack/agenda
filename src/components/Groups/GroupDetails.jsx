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

    function clampAvatars(memberships, options = { max: 6 }) {
        const { max = 6, total } = options;
        let clampedMax = max < 2 ? 2 : max;
        const totalAvatars = total || memberships.length;
        if (totalAvatars === clampedMax) {
          clampedMax += 1;
        }
        clampedMax = Math.min(totalAvatars + 1, clampedMax);
        const maxAvatars = Math.min(memberships.length, clampedMax - 1);
        const surplus = Math.max(totalAvatars - clampedMax, totalAvatars - maxAvatars, 0);
        return { avatars: memberships.slice(0, maxAvatars).reverse(), surplus };
      }

      const { avatars, surplus } = clampAvatars(memberships, {
        max: 6,
        total: memberships.total,
      });

    return (
        <div className="container">
        <Grid container justifyContent="center">
            <Card sx={{ width: '90vw' }}>
                <CardOverflow>
                    <AspectRatio sx={{ midWidth: '50vw'}}>
                        <img src={groupDetails.logo} />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Typography level='h2' noWrap>{groupDetails.name}</Typography>
                    <Typography level='body-md' fontWeight='bold'>Moderator:</Typography>
                    <Typography level='body-md'>{groupDetails.owner}</Typography>
                    <Typography level='body-md' fontWeight='bold'>Group Description:</Typography>
                    <Typography level='body-md' sx={{ mb: '10px' }}>{groupDetails.description}</Typography>
                    <Typography level='body-md' fontWeight='bold' sx={{ mb: '10px' }}>Group Members:</Typography>
                    <AvatarGroup sx={{ flexDirection: 'row', "--Avatar-size": "52px" }}>
                        {avatars.map((member, i) => (
                            <>
                                <Avatar alt={member.username} src={member.user_avatar} key={member.id} />
                            </>
                        ))}
                        {!!surplus && <Avatar>+{surplus}</Avatar>}
                    </AvatarGroup>
                    </CardContent>
                    </Card>
                </Grid>
        </div>
    )
}