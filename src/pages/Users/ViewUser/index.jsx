import UserForm from '../UserForm';
import { read } from '../../../utils/constants';


function ViewUser(){    
    return(
        <div className="addusercontainer">
            <h2 className="maintitle">Utilisateurs / Comptes / Consulter</h2>
            <UserForm mode={read}/>
        </div>
    )
}

export default ViewUser;