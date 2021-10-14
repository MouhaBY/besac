import React, { useState, useEffect } from 'react';
import './EditUser.css';
import { getUser, editUser } from '../../../WS/API';
import { useHistory, useParams } from "react-router-dom";


function EditUser(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [isAdmin, setIsAdmin] = useState();
    const [errorMsg, setErrorMsg] = useState("");
    const [hasError, setHasError] = useState(false);
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

    const handleValidation = () => {
        if(username !=="" & password!=="" & contact !==""){
            return true        
        }
        else{
            setErrorMsg("Veuillez renseigner tous les champs du formulaire");
            setHasError(true);
            return false
        }
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (handleValidation()){
            let resp = await editUser(id,{ username, password, contact, isAdmin });
            if(resp?.error){
                setErrorMsg(resp.error.message);
                setHasError(true);
            }
            else{
                navigateToUsers();
            }
        }
    }

    return(
        <div className="AddContainer">
            <form className="formContainer" onSubmit={handleSubmit}>
                <div className="Buttons">
                    <span className="errorMsg">{errorMsg}</span>
                    <input id="saveButton" type="submit" value="Enregistrer"/>
                    <input id="backButton" type="button" value="Retour" onClick={navigateToUsers}/>
                </div>
                <label className={hasError && !username ? "red-formTitle" : "formTitle"} for="username">Nom d'utilisateur</label>
                <input className={hasError && !username ? "red-formInput" : "formInput"} type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)}/>
                <label className={hasError && !password ? "red-formTitle" : "formTitle"} for="password">Mot de passe :</label>
                <input className={hasError && !password ? "red-formInput" : "formInput"} type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}/>
                <label className={hasError && !contact ? "red-formTitle" : "formTitle"} for="contact">Nom du contact</label>
                <input className={hasError && !contact ? "red-formInput" : "formInput"} type="text" name="contact" id="contact" value={contact} onChange={e => setContact(e.target.value)}/>
                <div className="checkBoxContainer">
                    <label className="formTitle" for="isAdmin">Administrateur : </label>
                    <input className="checkboxInput" type="checkbox" name="isAdmin" id="isAdmin" defaultChecked={isAdmin} onChange={ e => { setIsAdmin(e.target.checked) }}/>
                </div>
            </form>
        </div>
    )
}

export default EditUser;