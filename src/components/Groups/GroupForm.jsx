import React, { useState }from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function GroupForm() {
    const dispatch = useDispatch();
    const [newGroup, setNewGroup] = useState({name: '', description: ''});
    const history = useHistory();

    const backToUpcoming = () => {
        history.push('/user');
    }

    const addGroup = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_GROUP', payload: newGroup });
        setNewGroup({name: '', description: ''});
    }

    const handleChange = (event) => {
        switch (event.target.id) {
            case 'group-name':
                setNewGroup({...newGroup, name: event.target.value});
                break;
            case 'group-description':
                setNewGroup({...newGroup, description: event.target.value});
                break;
        }
    }

    return (
        <>
        <div className='container'>
            <h1>New Group Form</h1>
            <form onSubmit={addGroup}>
                <input id='group-name' type='text' placeholder='Group Name' value={newGroup.name} onChange={handleChange} />
                <input id='group-description' type='text' placeholder='Group Description' value={newGroup.description} onChange={handleChange} />
                <button>Create New Group</button>
            </form>
                <button onClick={backToUpcoming}>Cancel</button>
        </div>
        </>
    )
}