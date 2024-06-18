import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

export default function GroupDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const groupDetails = useSelector(store => store.groupDetails);

    useEffect(() => {
        dispatch({ type: 'FETCH_GROUP_DETAILS', payload: params.id });
    }, []);

    return (
        <div className="container">
        <h1>Group Details</h1>
            <h2>{groupDetails.name}</h2>
        </div>
    )
}