import React, { useState, useReducer, useContext, useEffect } from 'react';
import './UserForm.css';
import { signupUser } from '../../../WS/API';
import { useHistory } from "react-router-dom";
import FormFieldset from '../../../components/FormFieldset';
import { userDataContext } from '../../../utils/context';

const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
}

const profiles_list = [{_id:1,name:"Super administrateur"}, {_id:2,name:"Administrateur"}, {_id:3,name:"Resp. Sécurité & RH"}, {_id:4,name:"Fonct. Sécurité & RH"}, {_id:5,name:"Employé"}, {_id:6,name:"Visiteur"}]
const registrationTypes_list = [{_id:"cin", name:"CIN"}, {_id:"passport", name:"Passeport"}];

function UserForm({ mode }){
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useReducer(formReducer, {});
    const [errorMsg, setErrorMsg] = useState("");
    const { userData } = useContext(userDataContext);
    const history = useHistory();
    
    const navigateToUsers = () => history.push('/users');

    /* Setting initial values for creation user form */
    useEffect(() => {
        if (mode === "create") {
            setFormData({ name: "creationDate", value: "01/01/2021 01:01:01", });
            setFormData({ name: "creationUser", value: userData?._id, });
            setFormData({ name: "isActive", value: true, });
        }
    },[userData, mode])

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
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
        console.log(formData)
        //alert( Object.entries(formData).map(([name, value]) => ( "entité : "+ name + " / valeur : " + value)) )
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
                <FormFieldset value={formData.contact || ''} setValue={handleChange} title="Nom complet" type="text" required={true} id="contact" hasError={errorMsg && !formData.contact} disabled={mode === "read"}/>
                <FormFieldset value={formData.username} setValue={handleChange} title="Nom d'utilisateur" type="text" required={true} id="username" hasError={errorMsg && !formData.username} disabled={mode === "read"}/>
                { (mode === "create" || mode === "update") &&
                <div className="rowforminputs">
                    <FormFieldset value={formData.password} setValue={handleChange} title="Mot de passe" type="password" required={true} id="password" hasError={errorMsg && !formData.password} />
                    <FormFieldset value={formData.matchPassword} setValue={handleChange} title="Confirmer mot de passe" type="password" required={true} id="matchPassword" hasError={formData.matchPassword !== formData.password} />
                </div>}
                <FormFieldset value={formData.profile} setValue={handleChange} choiceslist={profiles_list} title="Profil" type="select" required={true} id="profile" hasError={errorMsg && !formData.profile} disabled={mode === "read"}/>
            </form>
            <form className="mincardcontainer" onSubmit={handleSubmit}>
                <h3 className="mincardtitle">Coordonnées</h3>
                <div className="rowforminputs">
                    <FormFieldset value={formData.registrationType} setValue={handleChange} choiceslist={registrationTypes_list} title="Identifiant" type="select" id="registrationType" disabled={mode === "read"}/>
                    <FormFieldset value={formData.registration} setValue={handleChange} id="registration" disabled={mode === "read"}/>
                </div>
                <FormFieldset value={formData.email} setValue={handleChange} type="email" id="email" title="Email" disabled={mode === "read"}/>

                <div className="rowforminputs">
                    <FormFieldset value={formData.phone} setValue={handleChange} id="phone" title="Téléphone" disabled={mode === "read"}/>
                    <FormFieldset value={formData.phonePoste} setValue={handleChange} id="phonePoste" title="Poste" disabled={mode === "read"}/>
                </div>
                <FormFieldset value={formData.mobile} setValue={handleChange} id="mobile" title="Mobile" disabled={mode === "read"}/>
            </form>
            <form className="mincardcontainer" onSubmit={handleSubmit}>
                <h3 className="mincardtitle">Fonction</h3>
                <FormFieldset value={formData.title} setValue={handleChange} id="title" title="Titre" disabled={mode === "read"}/>
                <FormFieldset value={formData.matricule} setValue={handleChange} id="matricule" title="Matricule"disabled={mode === "read"} />
                <FormFieldset value={formData.company} setValue={handleChange} id="company" title="Société" disabled={mode === "read"}/>
                <FormFieldset value={formData.department} setValue={handleChange} id="department" title="Département" disabled={mode === "read"}/>
                <div className="rowforminputs">
                    <FormFieldset value={formData.site} setValue={handleChange} id="site" title="Site" disabled={mode === "read"}/>
                    <FormFieldset value={formData.local} setValue={handleChange} id="local" title="Local" disabled={mode === "read"}/>
                </div>
                </form>
                <form className="mincardcontainer" onSubmit={handleSubmit}>
                    <h3 className="mincardtitle">Etat</h3>
                    <div className="rowforminputs">
                        <FormFieldset disabled={true} value={formData.creationDate} type="text" id="datecreation" title="Date de création" />
                        <FormFieldset disabled={true} value={formData.creationUser} id="usercration" title="Créé par" />
                    </div>
                    <div className="rowforminputs">
                        <FormFieldset disabled={true} value={formData.updateDate} type="text" id="datemodifictaion" title="Dernière de modification" />
                        <FormFieldset disabled={true} value={formData.updateUser} id="usermodification" title="Modifié par" />
                    </div>
                    <FormFieldset disabled={true} value={formData.isActive} setValue={handleChange} type="checkbox" id="actif" title="Actif : " />
                </form>
            </div>
        </div>
    )
}

export default UserForm;