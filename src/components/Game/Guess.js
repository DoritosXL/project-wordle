import { range } from '../../utils';

export const Guess = ({ guess, guessStatus }) => {
  const letter = guess ? guess.split("") : []
  return (
    <p className="guess">
      {range(5).map((index) => {
        // const status = guessStatus[index]
        const status = guessStatus ? guessStatus[index].status : "";
        return (
          <span key={index} className={`cell ${status}`}>{letter[index]}</span>
        )
      })}
    </p>
  )
}