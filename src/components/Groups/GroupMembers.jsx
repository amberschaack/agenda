import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import { Button, ListItemContent } from '@mui/joy';

export default function GroupMembers({ member }) {
    const removeMember = (memberId) => {
        console.log('Clicked!', memberId);
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
