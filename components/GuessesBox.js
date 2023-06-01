import { memo } from "react";
import GuessWord from "./GuessWord";

const GuessesBox = ({ guesses, secretWord, finalModalHandler }) => {
  return (
    <>
      {guesses.map((guess, i) => (
        <GuessWord guesse={guess} secretWord={secretWord} finalModalHandler={finalModalHandler} key={i} />
      ))}
    </>
  )
}

export default memo(GuessesBox);