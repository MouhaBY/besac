import React, { useState, useEffect } from 'react';
import './ViewUser.css';
import { getUser } from '../../../WS/API';
import { useHistory, useParams } from "react-router-dom";


function ViewUser(){
    const [username, setUsername] = useState("");
    const [contact, setContact] = useState("");
    const [isAdmin, setIsAdmin] = useState();
    const { id } = useParams();
    const history = useHistory();
    const navigateToUsers = () => history.push('/users');

    const getUserData = (userId) => {
        getUser(userId).then(result =>{
            setUsername(result.username);
            setContact(result.contact);
            setIsAdmin(result.isAdmin)
        })
    }

    useEffect(() => {
        getUserData(id);
    }, [id])

    return(
        <div className="ViewUserContainer">
            <h2 className="Userstitle">Acceuil / Consulter utilisateur</h2>
            <div className="Buttons">
                    <input id="backButton" type="button" value="Retour" onClick={navigateToUsers}/>
                </div>
            <form className="viewformContainer">
                <h2 className="ViewUserTitle">Consultation</h2>
                <label className="viewformTitle">Utilisateur Id</label>
                <input className="viewInput" type="text" name="Id" id="id" disabled value={id} />
                <label className="viewformTitle" for="username">Nom d'utilisateur</label>
                <input className="viewInput" type="text" name="username" id="username" disabled value={username} />
                <label className="viewformTitle" for="contact">Nom du contact</label>
                <input className="viewInput" type="text" name="contact" id="contact" disabled value={contact} />
                <div className="checkBoxViewContainer">
                    <label className="formTitle" for="isAdmin">Administrateur : </label>
                    <input className="checkboxInput" type="checkbox" name="isAdmin" id="isAdmin" disabled defaultChecked={isAdmin} />
                </div>
            </form>
        </div>
    )
}

export default ViewUser;