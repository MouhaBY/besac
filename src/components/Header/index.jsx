import React, { useState, useContext, useEffect } from 'react';
import './Header.css';
import profilePic from '../../assets/profile.png';
import burgerMenu from '../../assets/menu.png';
import { showBarContext, userDataContext } from '../../utils/context';
import { getProfileName } from '../../utils/profiles';


function Header({ setToken }) {
    const [showDropdown, setShowDropdown] = useState();
    const [dateState, setDateState] = useState(theDateNow());
    const { toggleShowBar } = useContext(showBarContext);
    const { userData } = useContext(userDataContext);
    const myProfile = getProfileName(userData?.profile);

    const disconnect = () => {
        const token = {token: null};
        setToken(token);
    }

    const showMenu = () => {
        setShowDropdown(!showDropdown)
    }

    function theDateNow(){
        var newDate = new Date()
        return(
            newDate.toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour : "2-digit",
                minute : "2-digit",
                timeZoneName : "short"
            })
        )
    }

    useEffect(() => {
        setInterval(() => setDateState(theDateNow()), 30000);
    }, []);

    return(
        <div className="headercontainer">
            <div className="header">
                <div className="burgermenucontainer" onClick={toggleShowBar}>
                    <img id="burgermenuimg" src={burgerMenu} alt="burgerMenu" />
                </div>
                <h1 className="headertitle">Scan Access Control</h1>
                <h1 className="headertime">{dateState}</h1>
                <div className="headeruserdata">
                    <span id="headerusercontact">{userData?.contact }</span>
                    <span id="headeruserprofile">{"(" + myProfile + ")" }</span>
                </div>
                <div className="profilepiccontainer" onClick={showMenu}>
                    <img id="profilepic" src={profilePic} alt="Profile" />
                </div>
            </div>
            {showDropdown ? (
            <div className="dropdowncontainer">
                <div className="DropDownButton" type="button">
                    <a className="DropDownText" href={'/users/view/'+ userData?._id}>Mon compte</a>
                </div>
                <div className="DropDownButton" type="button" onClick={disconnect}>
                    <span className="DropDownText">Se d??connecter</span>
                </div>
            </div>)
            :( null )}
        </div>
    )
}

export default Header;