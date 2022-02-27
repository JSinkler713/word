import React, { useState, useEffect, useContext } from "react";
const deployedURL = process.env.REACT_APP_DEPLOYED_URL || "http://localhost:3000";

const CopyGameStats = ({ allGuesses, simpleWord, hash }) => {
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
    try {
      if (navigator.canShare({
          url: `${deployedURL}/?${hash}`,
          text: `\n${values}`,
          title: 'Stats:'
        })) {
        console.log('in the navigator share block')
        navigator.share({
          url: `${deployedURL}/?${hash}`,
          text: `\n${values}`,
          title: 'Stats:'
        }) 
      } 
    } catch(e) {
      console.log('in the navigator clipboard block')
      // give a pop-up that says copied to clipboard
      navigator.clipboard.writeText(`Stats:\n${values}\n${deployedURL}/?${hash}`)
    }
  };

  return (
    <div>
      <button onClick={handleCopy}>Share w/ Stats!</button>
    </div>
  );
};
export default CopyGameStats;
