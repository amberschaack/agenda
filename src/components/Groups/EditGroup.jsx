import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useScript } from '../../hooks/useScript';
import { Avatar, ListSubheader, Stack, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import Badge from '@mui/joy/Badge';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import GroupMembers from './GroupMembers';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';


export default function EditGroup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const groupDetails = useSelector((store) => store.groupDetails);
  const memberships = useSelector((store) => store.membership);
  console.log('Members', memberships);
  console.log('Event Details Store:', groupDetails);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('All my changes', groupDetails);
    dispatch({
      type: 'EDIT_GROUP',
      payload: { groupId: groupDetails.id, details: groupDetails },
    });
    dispatch({ type: 'FETCH_GROUP' });
    dispatch({ type: 'FETCH_MY_GROUP' });
    history.push('/my-groups');
  };

  const backToMyGroups = () => {
    history.push('/my-groups');
  };

  const deleteGroup = (groupId) => {
    console.log('clicked', groupId);
    dispatch({ type: 'DELETE_GROUP', payload: groupId });
    dispatch({ type: 'FETCH_GROUP' });
    dispatch({ type: 'FETCH_MY_GROUP' });
    history.push('/my-groups');
  };

  const openWidget = () => {
    !!window.cloudinary &&
      window.cloudinary
        .createUploadWidget(
          {
            sources: ['local', 'url', 'camera'],
            cloudName: 'dz2bil44j',
            uploadPreset: 'hl5wdxak',
          },
          (error, result) => {
            if (!error && result && result.event === 'success') {
              dispatch({
                type: 'EDIT_GROUP_DETAILS',
                payload: { logo: result.info.secure_url },
              });
            }
          }
        )
        .open();
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <Stack
          direction='row'
          justifyContent='space-between'
          sx={{ mb: '10px' }}
        >
          <Button sx={{ bgcolor: '#ADB5BD' }} onClick={backToMyGroups}>
            Cancel
          </Button>
          <Button type='submit' sx={{ bgcolor: '#1BAC5C' }}>
            Save
          </Button>
        </Stack>
        <Stack
          direction='column'
          justifyContent='space-evenly'
          alignItems='center'
          spacing={3}
        >
          <Typography level='h3'>Edit {groupDetails?.name}</Typography>
          <Badge
            onClick={openWidget}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant='outlined'
            badgeContent={
              <CameraAltIcon
                sx={{ width: '35px', height: '35px', color: '#343A40' }}
              />
            }
            badgeInset='14%'
            sx={{ '--Badge-paddingX': '0px' }}
          >
            <Avatar
              variant='outlined'
              sx={{ width: 150, height: 150 }}
              src={groupDetails?.logo}
            />
          </Badge>
          {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}
        </Stack>
        <div className='col-12 mb-3'>
          <label>Edit Group Name</label>
          <input
            id='group-name'
            type='text'
            placeholder='Group Name'
            value={groupDetails?.name}
            className='form-control'
            onChange={(event) =>
              dispatch({
                type: 'EDIT_GROUP_DETAILS',
                payload: { name: event.target.value },
              })
            }
          />
        </div>
        <div className='col-12 mb-3'>
          <label>Edit Group Description</label>
          <input
            id='group-description'
            type='text'
            placeholder='Group Description'
            value={groupDetails?.description}
            className='form-control'
            onChange={(event) =>
              dispatch({
                type: 'EDIT_GROUP_DETAILS',
                payload: { description: event.target.value },
              })
            }
          />
        </div>
      </form>
      <div className='col-12 mb-3'>
        <label>Edit Group Members</label>
        <Box
          sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 5,
              maxHeight: '40vh',
              overflow: 'auto'
            }}
        >
            <List
              orientation='vertical'
              variant='outlined'
              sx={{
                  minWidth: 240,
                  borderRadius: 'sm',
                  "--ListItemDecorator-size": "60px",
                }}
            >
              {memberships.map((member) => (
                  <GroupMembers key={member.id} member={member} groupId={groupDetails.id} />
              ))}
            </List>
        </Box>
      </div>
      <Stack direction='row' justifyContent='space-evenly' alignItems='center'>
        <Button
          sx={{ bgcolor: '#AC2C1B' }}
          onClick={() => deleteGroup(groupDetails.id)}
        >
          Delete Group
        </Button>
      </Stack>
    </div>
  );
}
