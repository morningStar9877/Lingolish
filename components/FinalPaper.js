import Happy from "../public/images/undraw_Happy_news_re_tsbd.png";
import Sad from "../public/images/undraw_feeling_blue_4b7q.png";
import Image from "next/image";
import classes from "../styles/FinalPaper.module.css";

const FinalPaper = ({ turn, guesses }) => {
    return (
        <div className={classes.finalPaper}>
            {turn === "robot" ?
                <Image src={Happy} alt="Happy" width={100} height={100} /> :
                <Image src={Sad} alt="Sad" width={100} height={100} />
            }
            <div className={classes.resultBox}>
                The secret word was: {guesses[guesses.length - 1].value}
            </div>
        </div>
    )
}

export default FinalPaper;