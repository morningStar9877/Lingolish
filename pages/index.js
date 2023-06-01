import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import StartPaper from "../components/StartPaper";
import TypePlace from "../components/TypePlace";
import GuessesBox from "../components/GuessesBox";
import { getWords } from "../data/Words";
import styles from "../styles/Home.module.css";
import FinalPaper from "../components/FinalPaper";

export default function Home() {
  const words = getWords();
  const [initialModal, setInitialModal] = useState(true);
  const [finalModal, setFinalModal] = useState(false);
  const [secretWord, setSecretWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [robotLevel, setRobotLevel] = useState("Easy");
  const [guesses, setGuesses] = useState([]);
  const [roboFilteredList, setRoboFilteredList] = useState([]);
  const [rightPlaceLetters, setRightPlaceLetters] = useState([]);
  const [turn, setTurn] = useState("user");
  const [timer, setTimer] = useState(100);
  let timerProgress = 0;
  const initialModalHandler = (status) => {
    setInitialModal(status);
  }
  const finalModalHandler = (status) => {
    setFinalModal(status);
  }
  const userGuessHandler = (guess) => {
    setGuesses(prevGuesses => {
      return [
        ...prevGuesses,
        guess
      ]
    });
  }
  const roboOperation = () => {
    let robotGuess;
    let previousGuesses = guesses.filter(guess => guess.owner === "robo");
    if (previousGuesses.length === 0) {
      robotGuess = words[Math.floor(Math.random() * words.length)];
      setRoboFilteredList(words);
    } else {
      let lastPreviousGuess = previousGuesses[previousGuesses.length - 1].value;
      let lastPreviousGuessLetters = lastPreviousGuess.split("");
      let filteredList = roboFilteredList;
      let currectLetters = lastPreviousGuessLetters.filter(lastPreviousGuessLetter => secretWord.includes(lastPreviousGuessLetter));
      for (let currectLetter of currectLetters) {
        filteredList = filteredList.filter(filteredItem => filteredItem.split("").includes(currectLetter));
      }
      setRoboFilteredList(filteredList);
      robotGuess = roboFilteredList[Math.floor(Math.random() * roboFilteredList.length)];
    }
    setGuesses(prevGuesses => {
      return [
        ...prevGuesses,
        { value: robotGuess, owner: "robo" }
      ]
    });
    setTurn("user");
    setTimer(100);
  }
  const visionOperation = () => {
    let robotGuess;
    let previousGuesses = guesses.filter(guess => guess.owner === "vision");
    if (previousGuesses.length === 0) {
      robotGuess = words[Math.floor(Math.random() * words.length)];
      setRoboFilteredList(words);
    } else {
      let lastPreviousGuess = previousGuesses[previousGuesses.length - 1].value;
      let lastPreviousGuessLetters = lastPreviousGuess.split("");
      let filteredList = roboFilteredList;
      let currectLetters = lastPreviousGuessLetters.filter(lastPreviousGuessLetter => secretWord.includes(lastPreviousGuessLetter));
      console.log(filteredList, lastPreviousGuess);
      for (let currectLetter of currectLetters) {
        filteredList = filteredList.filter(filteredItem => filteredItem.split("").includes(currectLetter));
      }
      console.log(filteredList, rightPlaceLetters, currectLetters, lastPreviousGuess.split(""));
      let rPlaceLetters = rightPlaceLetters;
      for (let currectLetterIndex in currectLetters) {
        let orginalIndex = lastPreviousGuess.indexOf(currectLetters[currectLetterIndex]);
        let isRightPlaceLetter = secretWord.charAt(orginalIndex) === lastPreviousGuess.charAt(orginalIndex);
        console.log(orginalIndex, isRightPlaceLetter);
        if (isRightPlaceLetter) {
          rPlaceLetters.push({
            letter: currectLetters[currectLetterIndex],
            index: orginalIndex
          })
          setRightPlaceLetters(prevState => {
            return [
              ...prevState,
              {
                letter: currectLetters[currectLetterIndex],
                index: orginalIndex,
                owner: "robot"
              }
            ]
          })
        }
      }
      console.log(rightPlaceLetters, rPlaceLetters);
      for (let rightPlaceLetter of rightPlaceLetters) {

        let updatedFilteredList = filteredList.filter(filteredItem => {
          return filteredItem.charAt(rightPlaceLetter.index) == rightPlaceLetter.letter
        });
        filteredList = updatedFilteredList.filter(updatedFilteredItem => updatedFilteredItem !== previousGuesses[previousGuesses.length - 1].value);
      }
      console.log(filteredList, roboFilteredList);
      setRoboFilteredList(filteredList);
      robotGuess = roboFilteredList[Math.floor(Math.random() * roboFilteredList.length)];
    }
    setGuesses(prevGuesses => {
      return [
        ...prevGuesses,
        { value: robotGuess, owner: "vision" }
      ]
    });
    setTurn("user");
    setTimer(100);
  }
  useEffect(() => {
    if (!initialModal) {
      timerProgress = setInterval(() => {
        setTimer(prevTimer => prevTimer - 10);
        console.log('inter');
      }, 1000);
    }
    return () => clearInterval(timerProgress);
  }, [initialModal]);
  useEffect(() => {
    if (timer < 0) {
      setTimer(100);
      if (turn === "user") {
        setTurn("robot");
      } else {
        setTurn("user");
      }
    }
  }, [timer]);
  useEffect(() => {
    if (turn === "robot") {
      switch (robotLevel) {
        case "Easy":
          setTimeout(() => {
            roboOperation();
          }, 4000)
          break;
        case "Normal":
          setTimeout(() => {
            visionOperation();
          }, 3000)
          break;
        case "Hard":
          setTimeout(() => {
            visionOperation();
          }, 2000)
          break;
        default:
          break;
      }
    }
  }, [turn]);
  console.log(secretWord);
  return (
    <div className={styles.container}>
      <div className={styles.guessesBox}>
        <GuessesBox guesses={guesses} secretWord={secretWord} finalModalHandler={finalModalHandler} />
      </div>
      <div>
        <TypePlace robotLevel={robotLevel} secretWord={secretWord} setRightPlaceLetters={setRightPlaceLetters} timer={timer} setTurn={setTurn} setTimer={setTimer} turn={turn} userGuessHandler={userGuessHandler} />
      </div>
      {initialModal && <Modal title="MULTIPLAYER"><StartPaper robotLevel={robotLevel} setRobotLevel={setRobotLevel} playHandler={initialModalHandler} /></Modal>}
      {finalModal && <Modal title={turn === "robot" ? "You Win :)" : "Game Over!"}><FinalPaper turn={turn} guesses={guesses} /></Modal>}
    </div>
  )
}
