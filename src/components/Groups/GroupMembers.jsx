import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import { Button, ListItemContent } from '@mui/joy';
import { useDispatch } from 'react-redux';

export default function GroupMembers({ member, groupId }) {
    const dispatch = useDispatch();

    const removeMember = (memberId) => {
        console.log('Clicked!', memberId);
        dispatch({ type: 'REMOVE_MEMBER', payload: {member: memberId, group: groupId} });
    }

  return (
    <>
    <ListItem >
      <ListItemDecorator>
        <Avatar size='lg' src={member.user_avatar} />
      </ListItemDecorator>
      <ListItemContent>
        {member.username}
      </ListItemContent>
      <Button sx={{ bgcolor: '#ADB5BD' }} onClick={() => removeMember(member.id)}>Remove</Button>
    </ListItem>
    <ListDivider inset="gutter" />
    </>
  );
}
