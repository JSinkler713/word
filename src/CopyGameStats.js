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
    let canShare = navigator.canShare({
        url: `${deployedURL}/?${hash}`,
        text: `\n${values}`,
        title: 'Stats:'
      })
    if (!canShare) {
      console.log('in the navigator clipboard block')
      navigator.clipboard.writeText(`${deployedURL}/?${hash} \n${values}`)
    } else {
      console.log('in the navigator share block')
      navigator.share({
        url: `${deployedURL}/?${hash}`,
        text: `\n${values}`,
        title: 'Stats:'
      }) 
    }
  };

  return (
    <div>
      <button onClick={handleCopy}>Share w/ Stats!</button>
    </div>
  );
};
export default CopyGameStats;
