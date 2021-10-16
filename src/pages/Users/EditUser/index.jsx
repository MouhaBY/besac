import UserForm from '../UserForm';

function EditUser(){    
    return(
        <div className="addusercontainer">
            <h2 className="maintitle">Utilisateurs / Comptes / Consulter</h2>
            <UserForm mode="update"/>
        </div>
    )
}

export default EditUser;