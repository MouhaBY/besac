import { Helmet } from 'react-helmet';
import './Hello.css';

const TITLE = "Hello | Solution";

function Hello(){
    return(
        <div className="HelloContainer">
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            <h2 className="test">Hello Mouha</h2>
        </div>
    )
}

export default Hello;