import React, { useState, useEffect, useContext } from "react";

const CopyGameStats = ({ allGuesses, simpleWord }) => {
  function makeSquares(allGuesses, simpleWord) {
    let totalSentence = "";
    for (let i = 0; i < allGuesses.length; i++) {
      let row = allGuesses[i];
      if (row.length > 0) {
        let sentence = "";
        row.forEach((guess, i) => {
          if (simpleWord.indexOf(guess) === i) {
            sentence += "🟩";
          } else if (simpleWord.indexOf(guess) !== -1) {
            // it's in the word
            sentence += "🟨";
          } else {
            sentence += "⬜️";
          }
        });
        totalSentence += sentence + "\n";
      }
    }
    return totalSentence;
  }

  let values = makeSquares(allGuesses, simpleWord);
  console.log("***********************");
  console.log("copy game stats");
  console.log(values);
  const handleCopy = () => {
    navigator.clipboard.writeText(`${values}`);
  };

  return (
    <div>
      <button onClick={handleCopy}>Share Stats!</button>
    </div>
  );
};
export default CopyGameStats;
