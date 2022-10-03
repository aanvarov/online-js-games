import React, { useEffect, useState } from "react";
import "./PairsGame.css";
import { CARDS } from "./constants";
import CardItem from "./CardItem";
import CountDownTimer from "./CountDownTimer";
const mp3 = require("./soundClick.mp3");

function PairsGame() {
  const [level, setLevel] = useState<number>(0);
  const [levelCards, setLevelCards] = useState<Card[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [foundPairs, setFoundPairs] = useState<Card[]>([]);
  const [numOfCards, setNumOfCards] = useState<number>(0);
  const [selectedCardsNum, setSelectedCardsNum] = useState<number>(0);
  const [selectedFirstCard, setSelectedFirstCard] = useState<Card>();
  const [selectedSecondCard, setSelectedSecondCard] = useState<Card>();
  const [hoursMinSecs, setHoursMinSecs] = useState<any>({ minutes: 0, seconds: 30 });
  const [isTimerOn, setIsTimerOn] = useState<boolean>(false);
  useEffect(() => {
    if (level === 0) {
      setLevel(1);
    }
    if (level === 1) {
      setLevelCards(CARDS.slice(0, 4));
      setNumOfCards(8);
      setHoursMinSecs({ minutes: 0, seconds: 30 });
    } else if (level === 2) {
      setLevelCards(CARDS.slice(0, 5));
      setNumOfCards(10);
      setHoursMinSecs({ minutes: 1, seconds: 0 });
      setIsTimerOn(false);
    } else if (level === 3) {
      setLevelCards(CARDS.slice(0, 6));
      setNumOfCards(12);
      setHoursMinSecs({ minutes: 1, seconds: 30 });
      setIsTimerOn(false);
    } else if (level === 4) {
      setLevelCards(CARDS.slice(0, 7));
      setNumOfCards(14);
      setHoursMinSecs({ minutes: 2, seconds: 0 });
      setIsTimerOn(false);
    } else if (level > 4) {
      alert("You won all!");
      setLevel(1);
    }
  }, [level]);

  useEffect(() => {
    if (foundPairs.length > 0 && foundPairs.length === numOfCards) {
      setTimeout(() => {
        alert("You won level!");
        setFoundPairs([]);
        setLevel(level + 1);
      }, 300);
    }
  }, [foundPairs, numOfCards, level]);

  useEffect(() => {
    if (foundPairs.length === 0) {
      const newArr = [...levelCards, ...levelCards];
      const shuffledCards = newArr.sort(() => Math.random() - 0.5);
      setCards(shuffledCards);
    }
  }, [foundPairs, levelCards]);

  const cardEventHandler = (setShowing: any, card: Card) => {
    if (selectedCardsNum < 2) {
      setShowing(true);
      setSelectedCardsNum(selectedCardsNum + 1);
      if (!selectedFirstCard) {
        setSelectedFirstCard(card);
        setIsTimerOn(true);
      } else {
        setSelectedSecondCard(card);
      }
    } else {
      setTimeout(() => {
        setSelectedCardsNum(0);
        setSelectedFirstCard(undefined);
        setSelectedSecondCard(undefined);
      }, 600);
    }
    if (!selectedFirstCard || !selectedSecondCard) {
      var audio = new Audio(mp3);
      audio.play();
    }
  };
  useEffect(() => {
    if (hoursMinSecs.minutes === 0 && hoursMinSecs.seconds === 0) {
      alert("You lost!");
      setLevel(0);
      setFoundPairs([]);
      setHoursMinSecs({ minutes: 0, seconds: 30 });
      setIsTimerOn(false);
    }
  }, [hoursMinSecs]);

  useEffect(() => {
    const getSelectedCardsMatched = () => {
      if (selectedFirstCard && selectedSecondCard) {
        if (selectedFirstCard.id === selectedSecondCard.id) {
          setFoundPairs((prev) => [...prev, selectedFirstCard, selectedSecondCard]);
          setTimeout(() => {
            setSelectedCardsNum(0);
            setSelectedFirstCard(undefined);
            setSelectedSecondCard(undefined);
          }, 10);
        } else {
          setTimeout(() => {
            setSelectedCardsNum(0);
            setSelectedFirstCard(undefined);
            setSelectedSecondCard(undefined);
          }, 600);
        }
      }
    };
    getSelectedCardsMatched();
  }, [selectedSecondCard, selectedFirstCard]);

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
        Pairs Game
      </h1>
      <p>
        Click any card to begin. <span style={{ fontWeight: 700 }}>Level: {level}</span>
      </p>
      <CountDownTimer
        setHoursMinSecs={setHoursMinSecs}
        isTimerOn={isTimerOn}
        hoursMinSecs={hoursMinSecs}
      />
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
