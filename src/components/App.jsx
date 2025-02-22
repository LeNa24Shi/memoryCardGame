import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

const cardImages = [
  {"src" : "/images/memorycard1.png", "key" : 1, matched : false},
  {"src" : "/images/memorycard2.png", "key" : 2, matched : false},
  {"src" : "/images/memorycard3.png", "key" : 3, matched : false},
  {"src" : "/images/memorycard4.png", "key" : 4, matched : false},
  {"src" : "/images/memorycard5.png", "key" : 5, matched : false},
  {"src" : "/images/memorycard6.png", "key" : 6, matched : false},
  {"src" : "/images/memorycard7.png", "key" : 7, matched : false},
  {"src" : "/images/memorycard8.png", "key" : 8, matched : false},
  {"src" : "/images/memorycard9.png", "key" : 9, matched : false},
  {"src" : "/images/memorycard10.png", "key" : 10, matched : false},
  {"src" : "/images/memorycard11.png", "key" : 11, matched : false},
  {"src" : "/images/memorycard12.png", "key" : 12, matched : false}
];

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // SHUFFLE CARDS
  const shuffleCards = () =>{
    const shuffledCards = [...cardImages, ...cardImages]
    .sort ( () => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}));

    setCards(shuffledCards);
    setTurns(0);
  }  

  useEffect(() => {
    shuffleCards();
  }, []);

  // HANDLE CARD CHOICE
  const handleChoice = (card) => {
    cardOne ? setCardTwo(card) : setCardOne(card);
    //console.log(cardOne, cardTwo);
  }

  // COMPARE CARDS
  useEffect(()=> {
    if (cardOne && cardTwo){
      setIsFlipped(true);
      // console.log("the card is filpped");
      if (cardOne.key === cardTwo.key){
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.key === cardOne.key){
              return {...card, matched: true};
            }else {
              return card;
            }
          })
        })
        resetTurns();
      }else{
        setTimeout(() => resetTurns(), 800);
      }
    }
  },[cardOne, cardTwo])
  //console.log(cards, turns);

  function resetTurns(){
    setCardOne(null);
    setCardTwo(null);
    setTurns(prevTurns => prevTurns +1);
    setIsFlipped(false);
  }
  return (
    <div>

      <h1>Memory Card</h1>
      <button onClick={shuffleCards}>New game</button>

      <div className="card-grid">
        {cards.map(card => (
          <Card 
          card={card} 
          handleChoice={handleChoice} 
          key={card.id}
          flipped={card === cardOne || card == cardTwo || card.matched}
          isFipped={isFlipped}
          />
        ))}
        <p>Turns : {turns}</p>
      </div>
    </div>
  );
}

export default App;
