import React, { useEffect, useState } from "react";
import "./PairsGame.css";

type CardItemProps = {
  card: Card;
  cardEventHandler: (setShowing: any, card: Card) => void;
  selectedCardsNum: number;
  foundPairs: Card[];
  level: number;
};

function CardItem({ card, cardEventHandler, selectedCardsNum, foundPairs, level }: CardItemProps) {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [isMatched, setIsMatched] = useState<boolean>(false);

  useEffect(() => {
    if (!isMatched) {
      if (selectedCardsNum === 0) {
        setIsShowing(false);
      }
    }
  }, [selectedCardsNum]);

  useEffect(() => {
    foundPairs.map((foundCard) => {
      if (foundCard.id === card.id) {
        setIsMatched(true);
      }
    });
    // console.log(foundPairs);
  }, [foundPairs]);

  useEffect(() => {
    if (foundPairs.length === 0) {
      setIsMatched(false);
      setIsShowing(false);
    }
  }, [foundPairs]);

  const cardClickHandler = () => {
    if (!isMatched && !isShowing) {
      cardEventHandler(setIsShowing, card);
    }
  };
  return (
    <div
      onClick={() => cardClickHandler()}
      className={`card ${isShowing && "showing"} ${level > 1 && "level" + level}`}
    >
      <img
        // className={isShowing ? "card__img showing" : "card__img"}
        className={`card__img ${isShowing && "showing"} `}
        src={card.image}
        alt={card.id.toString()}
      />
    </div>
  );
}

export default CardItem;
