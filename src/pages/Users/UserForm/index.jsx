import React, { useState, useReducer, useContext, useEffect } from 'react';
import './UserForm.css';
import { signupUser } from '../../../WS/API';
import { useHistory } from "react-router-dom";
import FormFieldset from '../../../components/FormFieldset';
import { userDataContext } from '../../../utils/context';
import { profiles_list } from '../../../utils/profiles';

const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
}

const registrationTypes_list = [{_id:"cin", name:"CIN"}, {_id:"passport", name:"Passeport"}];

function UserForm({ mode, user }){
    const [submitting, setSubmitting] = useState(false);
    const { userData } = useContext(userDataContext);
    const [formData, setFormData] = useReducer(formReducer, {isActive:true});
    const [errorMsg, setErrorMsg] = useState("");
    const history = useHistory();
    
    const navigateToUsers = () => history.push('/users');

    /* Setting initial values for user form */
    useEffect(() => {
        if (mode === "create") {
            setFormData({ name: "creationUser", value: userData, });
        }
        if (mode === "read") {
            console.log(user)
            Object.entries(user).map(([ref, val]) => (
                setFormData({ name: ref, value: val, })
            ))
        }
    },[userData, mode, user])

    useEffect(() => {
        if (mode === "create") {
            let now = new Date()
            let dateNow = now.getDate()+"/"+parseInt(now.getMonth()+1)+"/"+now.getFullYear()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+":"+now.getUTCMilliseconds()
            setFormData({ name: "creationDate", value: dateNow, });
        }
    },[mode])

    const handleChange = event => {
        const isCheckbox = event.target.type === 'checkbox';
        setFormData({
            name: event.target.name,
            value: isCheckbox ? event.target.checked : event.target.value,
        });
    }

    const handleValidation = () => {
        if(formData.contact && formData.username && formData.password && formData.profile){
            return true        
        }
        else{
            setErrorMsg("Veuillez renseigner les champs requis du formulaire");
            return false
        }
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (handleValidation()){
            setSubmitting(true);
            let resp = await signupUser( formData );
            setSubmitting(false);
            if(resp?.error){
                setErrorMsg(resp.error.message);
            }
            else{
                navigateToUsers();
            }
        }
        setSubmitting(false);
    }

    return(
        <div className="userformcontainer">
            <div className="Buttons">
                {submitting && <span>(Connexion au serveur)</span>}
                <span className="errorMsg">{errorMsg}</span>
                {mode !== "read" && <input id="saveButton" type="submit" value="Enregistrer" onClick={handleSubmit}/>}
                <input id="backButton" type="button" value="Retour" onClick={navigateToUsers}/>
            </div>
            <div className="cardscontainer">
            <form className="mincardcontainer" onSubmit={handleSubmit}>
                <h3 className="mincardtitle">Authentification</h3>
                <FormFieldset value={formData.contact || ''} setValue={handleChange} title="Nom complet" type="text" required={true} id="contact" hasError={errorMsg && !formData.contact} disabled={submitting || mode === "read"}/>
                <FormFieldset value={formData.username || ''} setValue={handleChange} title="Nom d'utilisateur" type="text" required={true} id="username" hasError={errorMsg && !formData.username} disabled={submitting || mode === "read"}/>
                { (mode === "create" || mode === "update") &&
                <div className="rowforminputs">
                    <FormFieldset value={formData.password} setValue={handleChange} title="Mot de passe" type="password" required={true} id="password" hasError={errorMsg && !formData.password} disabled={submitting}/>
                    <FormFieldset value={formData.matchPassword} setValue={handleChange} title="Confirmer mot de passe" type="password" required={true} id="matchPassword" hasError={formData.matchPassword !== formData.password} disabled={submitting}/>
                </div>}
                <FormFieldset value={formData.profile} setValue={handleChange} choiceslist={profiles_list} title="Profil" type="select" required={true} id="profile" hasError={errorMsg && !formData.profile} disabled={submitting || mode === "read"}/>
            </form>
            <form className="mincardcontainer" onSubmit={handleSubmit}>
                <h3 className="mincardtitle">Coordonnées</h3>
                <div className="rowforminputs">
                    <FormFieldset value={formData.registrationType} setValue={handleChange} choiceslist={registrationTypes_list} title="Identifiant" type="select" id="registrationType" disabled={mode === "read"}/>
                    <FormFieldset value={formData.registration || ''} setValue={handleChange} id="registration" disabled={mode === "read"}/>
                </div>
                <FormFieldset value={formData.email || ''} setValue={handleChange} type="email" id="email" title="Email" disabled={mode === "read"}/>

                <div className="rowforminputs">
                    <FormFieldset value={formData.phone || ''} setValue={handleChange} id="phone" title="Téléphone" disabled={mode === "read"}/>
                    <FormFieldset value={formData.phonePoste || ''} setValue={handleChange} id="phonePoste" title="Poste" disabled={mode === "read"}/>
                </div>
                <FormFieldset value={formData.mobile || ''} setValue={handleChange} id="mobile" title="Mobile" disabled={mode === "read"}/>
            </form>
            <form className="mincardcontainer" onSubmit={handleSubmit}>
                <h3 className="mincardtitle">Fonction</h3>
                <FormFieldset value={formData.title || ''} setValue={handleChange} id="title" title="Titre" disabled={mode === "read"}/>
                <FormFieldset value={formData.matricule || ''} setValue={handleChange} id="matricule" title="Matricule"disabled={mode === "read"} />
                <FormFieldset value={formData.company || ''} setValue={handleChange} id="company" title="Société" disabled={mode === "read"}/>
                <FormFieldset value={formData.department || ''} setValue={handleChange} id="department" title="Département" disabled={mode === "read"}/>
                <div className="rowforminputs">
                    <FormFieldset value={formData.site || ''} setValue={handleChange} id="site" title="Site" disabled={mode === "read"}/>
                    <FormFieldset value={formData.local || ''} setValue={handleChange} id="local" title="Local" disabled={mode === "read"}/>
                </div>
                </form>
                <form className="mincardcontainer" onSubmit={handleSubmit}>
                    <h3 className="mincardtitle">Etat</h3>
                    <div className="rowforminputs">
                        <FormFieldset disabled={true} value={formData.creationDate || ''} setValue={handleChange} type="text" id="datecreation" title="Date de création" />
                        <FormFieldset disabled={true} value={formData.creationUser?.contact || ''} setValue={handleChange} id="usercration" title="Créé par" />
                    </div>
                    <div className="rowforminputs">
                        <FormFieldset disabled={true} value={formData.updateDate || ''}setValue={handleChange} type="text" id="datemodifictaion" title="Dernière de modification" />
                        <FormFieldset disabled={true} value={formData.updateUser || ''} setValue={handleChange} id="usermodification" title="Modifié par" />
                    </div>
                    <FormFieldset disabled={true} value={formData.isActive || false} setValue={handleChange} type="checkbox" id="actif" title="Actif : " />
                </form>
            </div>
        </div>
    )
}

export default UserForm;