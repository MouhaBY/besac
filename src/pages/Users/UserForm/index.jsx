import React, { useState } from 'react';
import './UserForm.css';
import { signupUser } from '../../../WS/API';
import { useHistory } from "react-router-dom";
import FormInput from '../../../components/FormInput';

const profiles_list = [{_id:1,name:"Super administrateur"}, {_id:2,name:"Administrateur"}, {_id:3,name:"Resp. Sécurité & RH"}, {_id:4,name:"Fonct. Sécurité & RH"}, {_id:5,name:"Employé"}, {_id:6,name:"Visiteur"}]
const registrationTypes_list = [{_id:"cin", name:"CIN"}, {_id:"passport", name:"Passeport"}];

function UserForm({ mode }){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [matchPassword, setMatchPassword] = useState("");
    const [contact, setContact] = useState("");
    const [profile, setProfile] = useState();
    const [registration, setRegistration] = useState("");
    const [registrationType, setRegistrationType] = useState();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [phonePoste, setPhonePoste] = useState("");
    const [mobile, setMobile] = useState("");
    const [title, setTitle] = useState("");
    const [matricule, setmatricule] = useState("");
    const [company, setCompany] = useState("");
    const [department, setDepartment] = useState("");
    const [site, setSite] = useState("");
    const [local, setLocal] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [creationUser, setCreationUser] = useState("");
    const [updateDate, setUpdateDate] = useState("");
    const [updateUser, setUpdateUser] = useState("");
    const [isActif, setIsActif] = useState();

    const [errorMsg, setErrorMsg] = useState("");

    const history = useHistory();
    const navigateToUsers = () => history.push('/users');

    const handleValidation = () => {
        if(username !=="" && password !=="" && contact !==""){
            return true        
        }
        else{
            setErrorMsg("Veuillez renseigner tous les champs du formulaire");
            return false
        }
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (handleValidation()){
            let resp = await signupUser({ username, password, contact });
            if(resp?.error){
                setErrorMsg(resp.error.message);
            }
            else{
                navigateToUsers();
            }
        }
    }

    return(
        <div className="userformcontainer">
            <div className="Buttons">
                <span className="errorMsg">{errorMsg}</span>
                <input id="saveButton" type="submit" value="Enregistrer"/>
                <input id="backButton" type="button" value="Retour" onClick={navigateToUsers}/>
            </div>
            <div className="cardscontainer">
            <form className="mincardcontainer" onSubmit={handleSubmit}>
                <h3 className="mincardtitle">Authentification</h3>
                <FormInput value={contact} setValue={setContact} title="Nom complet" type="text" required={true} id="contact" hasError={errorMsg && !contact} />
                <FormInput value={username} setValue={setUsername} title="Nom d'utilisateur" type="text" required={true} id="username" hasError={errorMsg && !username} />
                <div className="rowforminputs">
                    <FormInput value={password} setValue={setPassword} title="Mot de passe" type="password" required={true} id="password" hasError={errorMsg && !password} />
                    <FormInput value={matchPassword} setValue={setMatchPassword} title="Confirmer mot de passe" type="password" required={true} id="matchPassword" hasError={matchPassword !== password} />
                </div>
                <FormInput value={profile} setValue={setProfile} choiceslist={profiles_list} title="Profil" type="select" required={true} id="profile" hasError={errorMsg && !profile} />
            </form>
            <form className="mincardcontainer" onSubmit={handleSubmit}>
                <h3 className="mincardtitle">Coordonnées</h3>
                <div className="rowforminputs">
                    <FormInput value={registrationType} setValue={setRegistrationType} choiceslist={registrationTypes_list} title="Identifiant" type="select" id="identifianttype" />
                        <FormInput value={registration} setValue={setRegistration} id="registration" />
                </div>
                <FormInput value={email} setValue={setEmail} type="email" id="email" title="Email" />

                <div className="rowforminputs">
                    <FormInput value={phone} setValue={setPhone} id="phone" title="Téléphone" />
                    <FormInput value={phonePoste} setValue={setPhonePoste} id="phonePoste" title="Poste" />
                </div>
                <FormInput value={mobile} setValue={setMobile} id="mobile" title="Mobile" />
            </form>
            <form className="mincardcontainer" onSubmit={handleSubmit}>
                <h3 className="mincardtitle">Fonction</h3>
                <FormInput value={title} setValue={setTitle} id="title" title="Titre" />
                <FormInput value={matricule} setValue={setmatricule} id="matricule" title="Matricule" />
                <FormInput value={company} setValue={setCompany} id="company" title="Société" />
                <FormInput value={department} setValue={setDepartment} id="department" title="Département" />
                <div className="rowforminputs">
                    <FormInput value={site} setValue={setSite} id="site" title="Site" />
                    <FormInput value={local} setValue={setLocal} id="local" title="Local" />
                </div>
                </form>
                { (mode === "update" || mode === "read") &&
                <form className="mincardcontainer" onSubmit={handleSubmit}>
                    <h3 className="mincardtitle">Etat</h3>
                    <div className="rowforminputs">
                        <FormInput disabled={true} value={creationDate} setValue={setCreationDate} type="date" id="datecreation" title="Date de création" />
                        <FormInput disabled={true} value={creationUser} setValue={setCreationUser} id="usercration" title="Créé par" />
                    </div>
                    <div className="rowforminputs">
                        <FormInput disabled={true} value={updateDate} setValue={setUpdateDate} type="date" id="datemodifictaion" title="Dernière de modification" />
                        <FormInput disabled={true} value={updateUser} setValue={setUpdateUser} id="usermodification" title="Modifié par" />
                    </div>
                    <FormInput disabled={true} value={isActif} setValue={setIsActif} type="checkbox" id="actif" title="Actif : " />
                </form>}
            </div>
        </div>
    )
}

export default UserForm;