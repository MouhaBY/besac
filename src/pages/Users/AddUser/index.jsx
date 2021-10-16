import './AddUser.css';
import UserForm from '../UserForm';
import { create } from '../../../utils/constants';


function AddUser(){    
    return(
        <div className="addusercontainer">
            <h2 className="maintitle">Utilisateurs / Comptes / Ajout</h2>
            <UserForm mode={create}/>
        </div>
    )
}

export default AddUser;