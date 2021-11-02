import './Card.css'
function Card ({ children }){
    return(
        <div className="cardcomponent">
            {children}
        </div>
    )
}

export default Card;