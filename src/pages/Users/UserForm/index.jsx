import React, { useState, useReducer, useContext, useEffect } from 'react';
import './UserForm.css';
import { signupUser, editUser, getUser } from '../../../WS/API';
import { useHistory, useParams } from "react-router-dom";
import FormFieldset from '../../../components/FormFieldset';
import { userDataContext } from '../../../utils/context';
import { profiles_list } from '../../../utils/profiles';


const registrationTypes_list = [{_id:"cin", name:"CIN"}, {_id:"passport", name:"Passeport"}];

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function UserForm({ mode }){
    const [submitting, setSubmitting] = useState(false);
    const { userData } = useContext(userDataContext);
    const [formData, setFormData] = useReducer(formReducer, {});
    const [errorMsg, setErrorMsg] = useState("");
    const history = useHistory();
    const { id } = useParams();

    const navigateToUsers = () => history.push('/users');

    /* get user initial values */
    useEffect(() => {
        getUserData(id);
    }, [id])

    /* Setting initial values for user form */
    useEffect(() => {
        if (mode === "create") {
            setFormData({ name: "creationUser", value: userData, });
            setFormData({ name: "isActive", value: true, });
        }
        if (mode === "update") {
            setFormData({ name: "updateUser", value: userData, });
        }
    },[userData, mode])

    /* setting initial date values */
    useEffect(() => {
        if (mode === "create") {
            let now = new Date()
            let dateNow = now.getDate()+"/"+parseInt(now.getMonth()+1)+"/"+now.getFullYear()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+":"+now.getUTCMilliseconds()
            setFormData({ name: "creationDate", value: dateNow, });
        }
        if (mode === "update") {
            let now = new Date()
            let dateNow = now.getDate()+"/"+parseInt(now.getMonth()+1)+"/"+now.getFullYear()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+":"+now.getUTCMilliseconds()
            setFormData({ name: "updateDate", value: dateNow, });
        }
    },[mode])

    const getUserData = (userId) => {
        getUser(userId).then(user =>{
            Object.entries(user).map(([ref, val]) => (
                setFormData({ name: ref, value: val, })
            ))
            setFormData({ name: "password", value: "", });
            setFormData({ name: "matchPassword", value: "", });
        })
    }

    const handleChange = event => {
        const isCheckbox = event.target.type === 'checkbox';
        setFormData({
            name: event.target.name,
            value: isCheckbox ? event.target.checked : event.target.value,
        });
    }

    const handleValidation = () => {
        if((mode=== "create") && formData.contact && formData.username && formData.password && formData.profile){
            if (formData.password === formData.matchPassword ) return true
            else{
                setErrorMsg("Mot de passe non comforme");
                return false
            }
        }
        if((mode=== "update") && formData.contact && formData.username && formData.profile){
            if (formData.password){
                if (formData.password === formData.matchPassword) return true
                else{
                    setErrorMsg("Mot de passe non comforme");
                    return false
                }
            }
            else{
                return true       
            } 
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

    const handleEditSubmit = async (evt) => {
        evt.preventDefault();
        if (handleValidation()){
            setSubmitting(true);
            let resp = await editUser(formData._id, formData );
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
                {mode === "create" && <input id="saveButton" type="submit" value="Enregistrer" onClick={handleSubmit}/>}
                {mode === "update" && <input id="formeditButton" type="submit" value="Modifier" onClick={handleEditSubmit}/>}
                <input id="backButton" type="button" value="Retour" onClick={navigateToUsers}/>
            </div>
            <div className="cardscontainer">
            <form className="mincardcontainer">
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
            <form className="mincardcontainer">
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
            <form className="mincardcontainer">
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
                <form className="mincardcontainer">
                    <h3 className="mincardtitle">Etat</h3>
                    <div className="rowforminputs">
                        <FormFieldset disabled={true} value={formData.creationDate || ''} setValue={handleChange} type="text" id="datecreation" title="Date de création" />
                        <FormFieldset disabled={true} value={formData.creationUser?.contact || ''} setValue={handleChange} id="usercration" title="Créé par" />
                    </div>
                    <div className="rowforminputs">
                        <FormFieldset disabled={true} value={formData.updateDate || ''}setValue={handleChange} type="text" id="updateDate" title="Dernière de modification" />
                        <FormFieldset disabled={true} value={formData.updateUser?.contact || ''} setValue={handleChange} id="updateUser" title="Modifié par" />
                    </div>
                    <FormFieldset disabled={!(mode==="update")} value={formData.isActive} setValue={handleChange} type="checkbox" id="actif" title="Actif : " />
                </form>
            </div>
        </div>
    )
}

export default UserForm;