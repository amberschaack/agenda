import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useScript } from '../../hooks/useScript';

export default function EditGroup() {
    const dispatch = useDispatch();
    const history = useHistory();
    const groupDetails = useSelector(store => store.groupDetails);
    console.log('Event Details Store:', groupDetails);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('All my changes', groupDetails);
        dispatch({ type: 'EDIT_GROUP', payload: {groupId: groupDetails.id, details: groupDetails} });
        history.push('/my-groups');
    }

    const backToMyGroups = () => {
        history.push('/my-groups');
    }

    const deleteGroup = (groupId) => {
        console.log('clicked', groupId);
        dispatch({ type: 'DELETE_GROUP', payload: groupId });
        history.push('/my-groups');
    }

    const openWidget = () => {
        !!window.cloudinary && window.cloudinary.createUploadWidget(
           {
              sources: ['local', 'url', 'camera'],
              cloudName: 'dz2bil44j',
              uploadPreset: 'hl5wdxak'
           },
           (error, result) => {
              if (!error && result && result.event === "success") {
                 dispatch({type: 'EDIT_GROUP_DETAILS', payload: {logo: result.info.secure_url}})
              }
           },
        ).open();
     }

    return (
        <div className="container">
            <h1>Update {groupDetails?.name}</h1>
            <form onSubmit={handleSubmit}>
                <p>Edit Group Name:</p>
                <input id='group-name' type='text' placeholder='Group Name' value={groupDetails?.name}
                    onChange={(event) => dispatch({type: 'EDIT_GROUP_DETAILS', payload: {name: event.target.value}})} />
                <br></br>
                <p>Edit Group Description:</p>
                <input id='group-description' type='text' placeholder='Group Description' value={groupDetails?.description}
                    onChange={(event) => dispatch({type: 'EDIT_GROUP_DETAILS', payload: {description: event.target.value}})} />
                <h2>Edit Group Photo</h2>
                <img src={groupDetails?.logo} />
                    {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}
                    Photo to upload: <button type="button" onClick={openWidget}>Pick Photo</button>
                    <br />
                <button>Edit Group</button>
            </form>
                <button onClick={() => deleteGroup(groupDetails.id)}>Delete Group</button>
                <button onClick={backToMyGroups}>Cancel</button>
        </div>
    )
}