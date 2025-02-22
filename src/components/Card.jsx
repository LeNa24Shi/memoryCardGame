import "./Card.css";

export default function Card({card, handleChoice, flipped, isFlipped}){

    function handleClick(){
      if(!isFlipped){
        handleChoice(card);
      }
    }
    return (
        <div className="card" key={card.id}>
          <div className={flipped ? "flipped" : ""}>
            <img className="front-side" src={card.src} alt="front-side"/>
            <img 
            className="back-side" 
            src="/images/memorycardcover.png" 
            onClick={handleClick}
            alt="back-side"/>
          </div>
        </div>
    )
}