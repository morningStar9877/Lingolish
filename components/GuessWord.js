import { useEffect } from "react";
import { useRouter } from "next/router";

const GuessWord = ({ guesse, secretWord, finalModalHandler }) => {
    const router = useRouter();
    let guesseLetters = guesse.value.split("");
    let wrongPlaceLetters = guesseLetters.filter(guesseLetter => secretWord.includes(guesseLetter));
    useEffect(() => {
        if (guesse.value === secretWord) {
            setTimeout(() => {
                finalModalHandler(true);
                setTimeout(() => {
                    router.reload();
                }, 1000)
            }, 500);
        }
    }, [guesse]);
    return (
        <div style={{marginBottom: "10px"}}>
            {guesseLetters.map((guesseLetter, i) => (
                <div key={i} className={guesse.owner === "user" ? wrongPlaceLetters.includes(guesseLetter) ? secretWord.indexOf(guesseLetter) == i ? "correctPlaceLetter letterBox" : "wrongPlaceLetter letterBox" : "wrongLetter letterBox" : "robotLetter letterBox"}>{guesseLetter}</div>
            ))
            }
        </div>
    )
}

export default GuessWord;