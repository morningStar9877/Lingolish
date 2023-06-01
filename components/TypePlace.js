import { useState } from "react";
import Image from "next/image";
import { robots } from "../data/Robots";
// import IronMan from "../public/images/champion-iron-man-infinity-war.jpg";
import Style from "../styles/TypePlace.module.css";

const TypePlace = ({ robotLevel, userGuessHandler, timer, turn, setTimer, setTurn, setRightPlaceLetters, secretWord }) => {
    const chosenRobot = robots.find(robot => robot.level === robotLevel);
    const [inpValue, setInputValue] = useState("");
    const inputHandler = (value) => {
        setInputValue(value);
        if (value.length == 5) {
            setInputValue("");
            userGuessHandler({
                owner: "user",
                value: value.toUpperCase()
            });
            if (robotLevel === "Hard") {
                let typedValue = value.toUpperCase();
                let currectLetters = typedValue.split("").filter(typedValueLetter => secretWord.includes(typedValueLetter));
                for (let currectLetterIndex in currectLetters) {
                    let orginalIndex = typedValue.indexOf(currectLetters[currectLetterIndex]);
                    let isRightPlaceLetter = secretWord.charAt(orginalIndex) === typedValue.charAt(orginalIndex);
                    if (isRightPlaceLetter) {
                        setRightPlaceLetters(prevState => {
                            return [
                                ...prevState,
                                {
                                    letter: currectLetters[currectLetterIndex],
                                    index: orginalIndex,
                                    owner: "user"
                                }
                            ]
                        })
                    }
                }
            }
            setTimer(100);
            setTurn("robot");
        }
    }
    return (
        <>
            <div className={Style.typePlace}>
                <div className={Style.participants}>
                <Image src="/images/champion-iron-man-infinity-war.jpg" alt="You" width={50} height={50} />
                <div>
                    <progress value={timer} max={100} />ّ
                </div>
                <Image src={chosenRobot.src} alt={chosenRobot.name} width={50} height={50} />
                </div>
                <div className={Style.inputContainer}>
                <input value={inpValue} onChange={(e) => inputHandler(e.target.value)} disabled={turn === "robot"} />
                </div>
            </div>
        </>
    )
}

export default TypePlace;