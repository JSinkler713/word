import React, {useState, useEffect, useContext} from 'react'; 
 
const NewComp = ({ word, isWord, meaning, showGuess })=> { 
  let meaningShortened
  if (!showGuess) return null
  if (meaning.length > 20) {
    let meaningArr = meaning.split('.')
    meaningShortened = meaningArr[0]+meaningArr[1]
   // meaningShortened = meaning.slice(0, 32)
    if (meaningShortened.length > 100) {
      meaningShortened = meaning.slice(0, 100)
    }
    meaningShortened += '...'
  } else {
    meaningShortened = meaning
  }
  return ( 
     <div className='ShowMeaning'> 
       <h2>
       {word} is {isWord ? 'a great guess' : 'not a word.'}.
       </h2>
       <p>
       {isWord ? meaningShortened : 'guess better next time 😮'}
       </p>
    </div>  ) 
} 
export default NewComp;
