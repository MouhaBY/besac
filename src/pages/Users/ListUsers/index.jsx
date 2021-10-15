import React, { useState, useEffect, useContext } from 'react';
import './ListUsers.css';
import { getUsersList, deleteUser } from '../../../WS/API';
import { useHistory } from "react-router-dom";
import { userDataContext } from '../../../utils/context';
import DataTable from '../../../components/DataTable';


const headers = [
    {reference:"_id", name:'Id'}, 
    {reference : "username", name: "Nom d'utilisateur"}, 
    {reference:"contact", name:"Nom complet"}, 
    {reference:"isAdmin", name:"Est Admin", type:"bool"}, 
    {reference:"actions", name:"Actions", type:"actions"}
];

const fetchUsers = (func1, func2) => {
    getUsersList().then(result =>{
        func1(result.results);
        func2(result.results)
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
            let filtered_users_list = usersList.filter(user => (user.isAdmin === (e.target.value === "admin")))
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
                    <option value="">Type de profil</option>
                    <option value="user">Utilisateur</option>
                    <option value="admin">Administrateur</option>
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