import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

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
            <h2>{groupDetails.name}</h2>
            <h3>Group Owner: {groupDetails.owner}</h3>
            <h4>{groupDetails.description}</h4>
            <h4>Group Members:</h4>
                <ul>
                    {memberships.map((member) => (
                        <li key={member.id}>{member.username}</li>
                    ))}
                </ul>
        </div>
    )
}