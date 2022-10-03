import React, { useEffect, useState } from "react";
import "./PairsGame.css";
import cardBack from "./card.png";
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
    setIsShowing(false);
    setIsMatched(false);
  }, [level]);

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
      <div className={`flip__card ${isShowing && "flip__card__inner"} `}>
        <div className="flip__card__front">
          <img src={cardBack} />
        </div>
        <div className="flip__card__back">
          <img
            // className={isShowing ? "card__img showing" : "card__img"}
            className="card__img"
            src={card.image}
            alt={card.id.toString()}
          />
        </div>
      </div>
    </div>
  );
}

export default CardItem;
