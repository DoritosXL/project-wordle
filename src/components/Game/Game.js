import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { Guess } from './Guess';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants'
import { range } from '../../utils';
import { checkGuess } from '../../game-helpers';

function Game() {
  const [answer, setAnswer] = React.useState(sample(WORDS));
  const [textInput, setTextInput] = React.useState("");
  const [pastGuesses, setPastGuesses] = React.useState([]);
  const [numOfGuessesAllowed, setNumOfGuessesAllowed] = React.useState(NUM_OF_GUESSES_ALLOWED)
  const [hasWon, setHasWon] = React.useState(false);
  const [hasLost, setHasLost] = React.useState(false);
  console.log(answer)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (numOfGuessesAllowed <= 0) return;
    const capitalizedInput = textInput.toUpperCase();
    setTextInput(capitalizedInput);
    console.log(capitalizedInput);
    handlePastGuesses(capitalizedInput);
  }

  const handlePastGuesses = (capitalizedInput) => {
    const tempGuesses = [...pastGuesses];
    tempGuesses.push(capitalizedInput)
    setPastGuesses(tempGuesses);
    setTextInput("");
    setNumOfGuessesAllowed(NUM_OF_GUESSES_ALLOWED - tempGuesses.length);

    const isCorrect = capitalizedInput === answer;
    if (isCorrect) {
      setHasWon(true);
    }
    if (!isCorrect && tempGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setHasLost(true);
    }
  }

  const handleSetTextInput = (event) => {
    const formatText = event.target.value
    formatText.toUpperCase();
    setTextInput(formatText)
  }

  const handleReset = () => {
    const newAnswer = sample(WORDS);
    setAnswer(() => newAnswer)
    setHasWon(false);
    setHasLost(false);
    setPastGuesses([]);
    setNumOfGuessesAllowed(NUM_OF_GUESSES_ALLOWED)
    setTextInput("")

  }

  return <>
    <div className="guess-results">
      Number of guesses allowed: {numOfGuessesAllowed}
      {range(NUM_OF_GUESSES_ALLOWED).map((index) => {
        // const uniqueIndex = crypto.randomUUID();
        return (
          <Guess key={`${index}`} guess={pastGuesses[index]} guessStatus={checkGuess(pastGuesses[index], answer)} />
        )
      })}
    </div>
    <form className="guess-input-wrapper" onSubmit={(e) => handleSubmit(e)}>
      <label label="guess-input">Enter guess:</label>
      <input id="guess-input" disabled={hasWon || hasLost} required pattern='\w{5}' type="text" value={textInput} onChange={(event) => handleSetTextInput(event)} />
    </form>
    {hasWon && (
      <div className="happy banner">
        <p>
          <strong>Congratulations!</strong> Got it in
          <strong> 3 guesses</strong>.
        </p>
        <button onClick={handleReset}>Restart game</button>
      </div>
    )}
    {hasLost && (
      <div className="sad banner">
        <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
        <button onClick={handleReset}>Restart game</button>
      </div>
    )}

  </>;
}

export default Game;
