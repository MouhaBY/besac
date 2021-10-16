import React, { useState, useEffect, useContext } from 'react';
import './ListUsers.css';
import { getUsersList, deleteUser } from '../../../WS/API';
import { useHistory } from "react-router-dom";
import { userDataContext } from '../../../utils/context';
import DataTable from '../../../components/DataTable';
import { getProfileName } from '../../../utils/profiles';


const headers = [
    {reference: "username", name: "Nom d'utilisateur"}, 
    {reference: "contact",  name: "Nom complet"}, 
    {reference: "profileName",  name: "Profil"}, 
    {reference: "isActive", name: "Actif", type:"bool"}, 
    {reference: "actions",  name: "Actions", type:"actions"}
];

const fetchUsers = (func1, func2) => {
    getUsersList().then(result =>{
        let to_map_result = result.results
        const mapped_result = to_map_result.map((row)=>({...row, profileName: getProfileName(row.profile)}))
        func1(mapped_result);
        func2(mapped_result)
    })
}

function ListUsers(){
    const [usersList, setUsersList] = useState([]);
    const [filteredUsersList, setFilteredUsersList] = useState([]);
    const history = useHistory();
    const { userData } = useContext(userDataContext);
    const viewUser = (data) => history.push('/users/view/'+ data._id);
    const editUser = (data) => history.push('/users/edit/'+ data._id);

    const delete_user = async (data) => {
        console.log(data)
        if (data._id === userData._id){ 
            alert("Cannot delete current user"); 
        }
        else{
            const response = await deleteUser(data._id);
            alert("Utilisateur Id : "+ data._id +" "+ response?.message);
            fetchUsers(setUsersList, setFilteredUsersList);
        }
    }

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
                <a href="/users/add"><input id="addButton" type="button" value="Ajouter"/></a>
            </div>
            <div className="UsersDataTableContainer">
                <DataTable 
                title="Liste des comptes" 
                headers={headers} 
                datas={filteredUsersList} 
                edit={true} 
                editFunction={editUser} 
                deletion={true} 
                deleteFunction={delete_user} 
                view={true}
                viewFunction={viewUser} 
                />
            </div>
        </div>
    )
}

export default ListUsers;