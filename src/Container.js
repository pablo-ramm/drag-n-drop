import update from 'immutability-helper';
import { useCallback, useState } from 'react';
import { Card } from './Card.js';

const style = {
  width: 400,
};

export const Container = () => {
  const [cards, setCards] = useState([
    { id: 1, text: 'Card one' },
    { id: 2, text: 'Card two' },
    { id: 3, text: 'Card three' },
    { id: 4, text: 'Card four' },
    { id: 5, text: 'Card five' },
    { id: 6, text: 'Card six' },
    { id: 7, text: 'Card seven' },
  ]);
  const [dragCounter, setDragCounter] = useState(0);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    );
    setDragCounter(prevCount => prevCount + 1); // Increment drag counter
  }, []);

  const addCard = useCallback(() => {
    setCards(prevCards => [...prevCards, { id: prevCards.length + 1, text: 'New card' }]);
  }, []);

  const removeCard = useCallback((id) => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));
  }, []);

  const renderCard = useCallback((card, index) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
        removeCard={removeCard}
      />
    );
  }, [moveCard, removeCard]);

  return (
    <>
      <button onClick={addCard}>Add Card</button>
      <div className="Container">{cards.map((card, i) => renderCard(card, i))}</div>
      <div>Drag Operations: {dragCounter}</div>
    </>
  );
};

