import './AddUser.css';
import UserForm from '../UserForm';

function AddUser(){    
    return(
        <div className="addusercontainer">
            <h2 className="maintitle">Utilisateurs / Comptes / Ajout</h2>
            <UserForm mode="update"/>
        </div>
    )
}

export default AddUser;