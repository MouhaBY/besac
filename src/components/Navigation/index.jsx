import React, { useState, useContext } from 'react';
import './Navigation.css';
import logo from '../../assets/STSlogo.PNG';
import dashboard from '../../assets/dashboard.png';
import data from '../../assets/data.png';
import control from '../../assets/control.png';
import users from '../../assets/users.png';
import warning from '../../assets/warning.png';
import SideButton from '../SideButton';
import SubSideButton from '../SubSideButton';
import { showBarContext } from '../../utils/context';


function Navigation(){
    const [showExploitation, setShowExploitation] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [showDatas, setShowDatas] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [showConfiguration, setShowConfiguration] = useState(false);
    const { showBar } = useContext(showBarContext);

    return(
        showBar && 
        <nav className="navigationcontainer">
            <a id="mainlogocontainer" href="/">
                <img href="/" id="mainlogo" src={logo} alt="Logo Solution" />
            </a>
            <div onClick={()=>setShowDashboard(!showDashboard)}>
                <SideButton name="Tableau de bord" logo={dashboard} hasChildren={true} opened={showDashboard}/>
            </div>
            {
                showDashboard && 
                    <div>
                        <div>
                            <SubSideButton name= "Événements" url="/dashboard" /> 
                        </div>
                        <div>
                            <SubSideButton name= "Journal d'activités" url="/dashboard" /> 
                        </div>
                    </div>
            }
            <div onClick={()=>setShowExploitation(!showExploitation)}>
                <SideButton name="Exploitation" logo={warning} hasChildren={true} opened={showExploitation}/>
            </div>
            {
                showExploitation &&
                    <div>
                        <SubSideButton name= "Présences" url="/exploitations" /> 
                        <SubSideButton name= "Absences" url="/exploitations" /> 
                        <SubSideButton name= "Anomalies" url="/exploitations" /> 
                    </div>
            }
            <div onClick={()=>setShowDatas(!showDatas)}>
                <SideButton name="Données" logo={data} hasChildren={true} opened={showDatas}/>
            </div>
            {   
                showDatas &&
                    <div>
                        <SubSideButton name= "Feuilles de temps" url="/datas" /> 
                        <SubSideButton name= "Employés" url="/datas" /> 
                        <SubSideButton name= "Congés" url="/datas" /> 
                    </div>
            }
            <div onClick={()=>setShowUsers(!showUsers)}>
                <SideButton name="Utilisateurs" logo={users} hasChildren={true} opened={showUsers}/>
            </div>
            {   
                showUsers &&
                    <div>
                        <SubSideButton name= "Comptes" url="/users" /> 
                        <SubSideButton name= "Profils" url="profiles" /> 
                    </div>
            }
            <div onClick={()=>setShowConfiguration(!showConfiguration)}>
                <SideButton name="Réglages" logo={control} hasChildren={true} opened={showConfiguration}/>
            </div>
            {   
                showConfiguration &&
                    <div>
                        <SubSideButton name= "Configuration générale" url="/configurations" /> 
                        <SubSideButton name= "Portes & Accès" url="/configurations" /> 
                    </div>
            }
        </nav>
    )
}

export default Navigation;
