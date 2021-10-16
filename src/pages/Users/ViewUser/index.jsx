import UserForm from '../UserForm';

function ViewUser(){    
    return(
        <div className="addusercontainer">
            <h2 className="maintitle">Utilisateurs / Comptes / Consulter</h2>
            <UserForm mode="read"/>
        </div>
    )
}

export default ViewUser;