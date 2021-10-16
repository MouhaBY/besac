import React, { useState, useEffect } from 'react';
import { getUser } from '../../../WS/API';
import { useParams } from "react-router-dom";

import UserForm from '../UserForm';

function ViewUser(){    
    const { id } = useParams();
    const [user, setUser] = useState({});

    const getUserData = (userId) => {
        getUser(userId).then(result =>{
            setUser(result)
        })
    }

    useEffect(() => {
        getUserData(id);
    }, [id])

    return(
        <div className="addusercontainer">
            <h2 className="maintitle">Utilisateurs / Comptes / Consulter</h2>
            <UserForm mode="read" user={user}/>
        </div>
    )
}

export default ViewUser;