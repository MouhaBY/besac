import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable';
import { profiles_list } from '../../utils/profiles';

const headers = [
    {reference: "_id", name: "Id"}, 
    {reference: "name",  name: "Profil"}, 
    {reference: "isActive",  name: "Actif", type:"bool"}, 
];

const fetchUsers = (func1, func2) => {
        func1(profiles_list);
        func2(profiles_list)
}

function ListProfiles(){
    const [usersList, setUsersList] = useState([]);
    const [filteredUsersList, setFilteredUsersList] = useState([]);

    const filter = (e) => {
        let filterBy = e.target.value;
        if (filterBy === ""){
            setFilteredUsersList(usersList);
        }
        else{
            let filtered_users_list = usersList.filter(user => (user.isActive === (e.target.value === "active")))
            setFilteredUsersList(filtered_users_list)
        }
    }

    useEffect(() => {
        fetchUsers(setUsersList, setFilteredUsersList);
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
                datas={filteredUsersList} 
                />
            </div>
        </div>
    )
}

export default ListProfiles;