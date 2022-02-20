import React, {useState, useEffect, useContext} from 'react'; 
 
const AlphabetLetter = ({letter, tableOfLetters, handleChooseLetter})=> { 
  function determineColor(letterValue, table) {
    switch (table[letterValue]) {
      case 'green':
        return 'Green';
      case 'yellow':
        console.log('im in the yellow case');
        return 'Yellow';
      default:
        return '';
    }
  }

  return ( 
          <li
            className={'Letter ' + determineColor(letter, tableOfLetters)}
            onClick={handleChooseLetter}
            value={letter}
            key={letter}
          >
            {letter}
          </li>
  )
} 
export default AlphabetLetter;
