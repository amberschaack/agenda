import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

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
        <h1>Group Details</h1>
            <img src={groupDetails.logo} />
            <h2>{groupDetails.name}</h2>
            <h3>Group Owner: {groupDetails.owner}</h3>
            <h4>{groupDetails.description}</h4>
            <h4>Group Members:</h4>
                <ul>
                    {memberships.map((member) => (
                        <>
                        <li key={member.id}>{member.username}</li>
                        <AvatarGroup max={10}>
                            <Avatar alt={member.username} src={member.user_avatar} />
                        </AvatarGroup>
                        </>
                    ))}
                </ul>
        </div>
    )
}