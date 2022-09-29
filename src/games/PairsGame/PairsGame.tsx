import React, { useEffect, useState } from "react";
import "./PairsGame.css";
import { CARDS } from "./constants";
import CardItem from "./CardItem";

function PairsGame() {
  const [level, setLevel] = useState<number>(1);
  const [levelCards, setLevelCards] = useState<Card[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [foundPairs, setFoundPairs] = useState<Card[]>([]);
  const [numOfCards, setNumOfCards] = useState<number>(0);
  useEffect(() => {
    if (level === 1) {
      setLevelCards(CARDS.slice(0, 4));
      setNumOfCards(8);
    } else if (level === 2) {
      setLevelCards(CARDS.slice(0, 5));
      setNumOfCards(10);
    } else if (level === 3) {
      setLevelCards(CARDS.slice(0, 6));
      setNumOfCards(12);
    } else if (level === 4) {
      setLevelCards(CARDS.slice(0, 7));
      setNumOfCards(14);
    } else if (level > 4) {
      alert("You won all!");
      setLevel(1);
    }
  }, [level]);

  useEffect(() => {
    if (foundPairs.length > 0 && foundPairs.length === numOfCards) {
      alert("You won level!");
      setFoundPairs([]);
      setLevel(level + 1);
    }
  }, [foundPairs, numOfCards]);

  useEffect(() => {
    if (foundPairs.length === 0) {
      const newArr = [...levelCards, ...levelCards];
      const shuffledCards = newArr.sort(() => Math.random() - 0.5);
      setCards(shuffledCards);
    }
  }, [foundPairs, levelCards]);

  const [selectedCardsNum, setSelectedCardsNum] = useState<number>(0);
  const [selectedFirstCard, setSelectedFirstCard] = useState<Card>();
  const [selectedSecondCard, setSelectedSecondCard] = useState<Card>();
  const [isMatchedCards, setIsMatchedCards] = useState<boolean>(false);

  const getSelectedCardsMatched = () => {
    if (selectedFirstCard && selectedSecondCard) {
      if (selectedFirstCard.id === selectedSecondCard.id) {
        setIsMatchedCards(true);
        setFoundPairs((prev) => [
          ...prev,
          selectedFirstCard,
          selectedSecondCard,
        ]);
      }
    }
  };

  const cardEventHandler = (setShowing: any, card: Card) => {
    setIsMatchedCards(false);
    if (selectedCardsNum < 2) {
      setShowing(true);
      setSelectedCardsNum(selectedCardsNum + 1);
      if (!selectedFirstCard) {
        setSelectedFirstCard(card);
      } else {
        setSelectedSecondCard(card);
      }
    } else {
      setSelectedCardsNum(0);
      setSelectedFirstCard(undefined);
      setSelectedSecondCard(undefined);
    }
  };

  useEffect(() => {
    getSelectedCardsMatched();
  }, [selectedSecondCard]);

  return (
    <div className="PairsGamePage">
      <div className="win__game">
        <div className="win__modal">
          <h4>You win</h4>
          <div className="win__button">Next level</div>
        </div>
      </div>
      <h1 className="game__title">
        <a className="company__link" href="http://droplet.uz">
          Droplet
        </a>{" "}
        Pairs Game v2
      </h1>
      <p>
        Click any card to begin{" "}
        <span style={{ fontWeight: 900 }}>Level: {level}</span>{" "}
      </p>
      {/* <div>Timer 00:00</div> */}

      <div className="game__board">
        {cards &&
          cards.map((card: any, i: number) => (
            <CardItem
              key={i}
              card={card}
              selectedCardsNum={selectedCardsNum}
              cardEventHandler={cardEventHandler}
              foundPairs={foundPairs}
              level={level}
            />
          ))}
      </div>
    </div>
  );
}

export default PairsGame;
