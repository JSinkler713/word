import React, {useState, useEffect, useContext} from 'react'; 
 
const AlphabetLetter = ({letter, tableOfLetters, handleChooseLetter, allowChoice})=> { 
  function determineColor(letterValue, table, allowChoice) {
    switch (table[letterValue]) {
      case 'green':
        if (allowChoice) {
        return 'Green';
        } else {
          return 'Green Disabled';
        }
      case 'yellow':
        if (allowChoice) {
          return 'Yellow';
        } else {
          return 'Yellow Disabled';
        }
      default:
        if (allowChoice) {
          return '';
        } else {
          return 'Disabled'
        }
    }
  }

  return ( 
          <li
            className={'Letter ' + determineColor(letter, tableOfLetters, allowChoice)}
            onClick={handleChooseLetter}
            value={letter}
            key={letter}
          >
            {letter}
          </li>
  )
} 
export default AlphabetLetter;
