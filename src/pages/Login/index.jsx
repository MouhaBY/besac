import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import logoWhite from '../../assets/logo-white.svg';
import './Login.css';
import { loginUser } from '../../WS/API';


const TITLE = 'Connexion | SAC';

function Login ({ setToken }){
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errorMSG, setErrorMSG] = useState();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setErrorMSG("");
        if (username && password){
            try{
                const token = await loginUser({ username, password });
                if(token){
                    setToken(token);
                }
                if(token?.error){
                    setErrorMSG(token.error);
                }    
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            if(username){
                setErrorMSG("Mot de passe requis");
            }
            else if(password){
                setErrorMSG("Nom d'utilisateur requis");
            }
            else{
                setErrorMSG("Coordonnées de connexion obligatoires");
            }
        }
    }
    
    return(
            <div className="loginpage">
                <Helmet>
                    <title>{ TITLE }</title>
                </Helmet>
                <div className="loginformcontainer">
                    <img id="loginlogo" src={logoWhite} alt="Logo Scantech" />
                    <h1 id="solutiontitle">Scan Access Control</h1>
                    <form id="loginform" onSubmit={handleSubmit}>
                        <label className="loginlabel" for="username">Nom d'utilisateur</label>
                        <input className="logininput" type="text" name="Nom d'utilisateur" id="username" onChange={e => setUsername(e.target.value)}/>
                        <label className="loginlabel" for="password">Mot de passe</label>
                        <input className="logininput" type="password" name="Mot de passe" id="password" onChange={e => setPassword(e.target.value)}/>
                        <span id="errorMSG">{errorMSG}</span>
                        <input id="loginbutton" type="submit" value="Se connecter"/>
                    </form>
                </div>
            </div>
    )
}

export default Login;