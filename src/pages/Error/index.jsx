import './Error.css';

function Error(){
    return(
        <div className="ErrorContainer">
            <p>
                <span className="test">404 Not found</span>
                <br />
                <span className="test">Cette page n'existe pas veuillez consulter l'adminsitrateur</span>
            </p>
        </div>
    )
}

export default Error;