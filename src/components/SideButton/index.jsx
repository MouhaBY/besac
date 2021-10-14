import "./SideButton.css";
import rightArrow from "../../assets/right-arrow.png";


function SideButton({name, logo, hasChildren=false, opened}){
    return(
        <div className="sidebuttoncontainer">
            <img src={logo} alt='symbole' className="sidebuttonlogo" />
            <h2 className="sidebuttontext">{name}</h2>
            {hasChildren && <img src={rightArrow} alt='fleche' id={opened ? "arrow" : "rotate-arrow"} />}
        </div>
    )
}

export default SideButton;