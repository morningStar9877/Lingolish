import Image from "next/image";
import classes from "../styles/StartPaper.module.css";
import { robots } from "../data/Robots";

const StartPaper = ({ playHandler, setRobotLevel, robotLevel }) => {
    return (
        <div>
            <p>Find the secret word first to win</p>
            <span>Game Difficulty</span>
            <div className={classes.difficultyBox}>
                {
                    robots.map(robot => (
                        <div key={robot.id}>
                        <Image src={robot.src} alt={robot.name} onClick={() => setRobotLevel(robot.level)} />
                        <small style={robot.level === robotLevel ? {color: "green", fontWeight: "bold"} : null}>{robot.level}</small>
                        </div>
                    ))
                  }
            </div>
            <button className={classes.playBtn} onClick={() => playHandler(false)}>Play</button>
        </div>
    )
}

export default StartPaper;