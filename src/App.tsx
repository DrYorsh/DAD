import React, { useState } from "react";
import { ICardList } from "../models";

function App() {
  const [cardList, setCardList] = useState<any>([
    { id: 1, order: 3, title: "Карточка номер 3" },
    { id: 2, order: 1, title: "Карточка номер 1" },
    { id: 3, order: 2, title: "Карточка номер 2" },
    { id: 4, order: 4, title: "Карточка номер 4" },
  ]);

  const [currentCard, setCurrentCard] = useState<ICardList>()

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>, card: ICardList) {
    console.log('drag', card);
    setCurrentCard(card)
  }

  function dragEndHandler(e: any) {
    e.target.style.background = 'white';
  }

  function dragOverHandler(e: any) {
    e.preventDefault();
    e.target.style.background = 'lightblue';
  }

  function dropHandler (e:any, card: any, currentCard: any) {
    e.preventDefault();
    setCardList(cardList.map((c: ICardList) => {
      if (c.id === card.id) {
        return {...c, oreder: currentCard.order}
      }
      if (c.id === currentCard.id) {
        return {...c, oreder: card.order}
      }
      return c
    }))
    e.target.style.background = 'white';
  }
  
  function sortCard(a: any, b: any) {
    if(a.order > b.order) {
      return 1
    } else {return -1}
  }

  return (
    <div className="App">
      {cardList.sort(sortCard).map((card: ICardList) => 
        <div 
          key={card.id} 
          className="card"
          draggable={true}
          onDragStart={(e) => dragStartHandler(e, card)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, card, currentCard)}
        >
          {card.title}
        </div>
      )}
    </div>
  )
}

export default App;
