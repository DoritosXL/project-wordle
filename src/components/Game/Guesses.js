export const Guesses = ({ pastGuesses }) => {
	return (
		<div className="guess-results">
			{pastGuesses.map((guess, index) => (
				<p className="guess" key={index}>
					{guess}
				</p>
			))}
		</div>
	);
};
