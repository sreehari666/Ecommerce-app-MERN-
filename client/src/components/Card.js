import './stylesheets/card.css';

export const Card=(props)=>{
    return(
        <div className = "card-wrapper">
        <div className="card">
            <div className ="card__body">
                <img className="card__image" src={props.img} />
                <h2 className="card__title">{props.title}</h2>
                <p className="card__description">{props.description}</p>
            </div>
            <button className="card__btn" onClick={props.onClick}>{props.btnText}</button>

        </div>
        </div>
    )
}