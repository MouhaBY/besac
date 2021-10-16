import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable';
import { bare_profiles_list } from '../../utils/profiles';

const headers = [
    {reference: "_id", name: "Id"}, 
    {reference: "name",  name: "Profil"}, 
    {reference: "isActive",  name: "Actif", type:"bool"}, 
];

const fetchProfiles = (func1, func2) => {
        func1(bare_profiles_list);
        func2(bare_profiles_list)
}

function ListProfiles(){
    const [profilesList, setProfilesList] = useState([]);
    const [filteredProfilesList, setFilteredProfilesList] = useState([]);

    const filter = (e) => {
        let filterBy = e.target.value;
        if (filterBy === ""){
            setFilteredProfilesList(profilesList);
        }
        else{
            let filtered_profiles_list = profilesList.filter(profile => (profile.isActive === (e.target.value === "active")))
            setFilteredProfilesList(filtered_profiles_list)
        }
    }

    useEffect(() => {
        fetchProfiles(setProfilesList, setFilteredProfilesList);
    },[])

    return(
        <div className="UsersContainer">
            <h2 className="maintitle">Utilisateurs / Comptes des utilisateurs</h2>
            <div className="UsersButtonsContainer">
                <select id="userTypesSelector" onChange={filter}>
                    <option value="">Etat</option>
                    <option value="active">Actifs</option>
                    <option value="deleted">Supprimés</option>
                </select>
            </div>
            <div className="UsersDataTableContainer">
                <DataTable 
                title="Liste des comptes" 
                headers={headers} 
                datas={filteredProfilesList} 
                />
            </div>
        </div>
    )
}

export default ListProfiles;