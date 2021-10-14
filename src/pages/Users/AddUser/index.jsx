import React, { useState } from 'react';
import './AddUser.css';
import { signupUser } from '../../../WS/API';
import { useHistory } from "react-router-dom";

function AddUser(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [hasError, setHasError] = useState(false);

    const history = useHistory();
    const navigateToUsers = () => history.push('/users');

    const handleValidation = () => {
        if(username !=="" && password !=="" && contact !==""){
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
            let resp = await signupUser({ username, password, contact, isAdmin });
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
                <input className={hasError && !username ? "red-formInput" : "formInput"} type="text" name="username" id="username" onChange={e => setUsername(e.target.value)}/>
                <label className={hasError && !password ? "red-formTitle" : "formTitle"} for="password">Mot de passe :</label>
                <input className={hasError && !password ? "red-formInput" : "formInput"} type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}/>
                <label className={hasError && !contact ? "red-formTitle" : "formTitle"} for="contact">Nom du contact</label>
                <input className={hasError && !contact ? "red-formInput" : "formInput"} type="text" name="contact" id="contact" onChange={e => setContact(e.target.value)}/>
                <div className="checkBoxContainer">
                    <label className="formTitle" for="isAdmin">Administrateur : </label>
                    <input className="checkboxInput" type="checkbox" name="isAdmin" id="isAdmin" onChange={e => setIsAdmin(!isAdmin)}/>
                </div>
            </form>
        </div>
    )
}

export default AddUser;