import React, {useState, useEffect, useContext} from 'react'; 
 
const NewComp = ({ word, isWord, meaning, showGuess })=> { 
  let meaningShortened
  if (!showGuess) return null
  if (meaning.length > 20) {
    meaningShortened = meaning.slice(0, 32)
    meaningShortened += '...'
  } else {
    meaningShortened = meaning
  }
  return ( 
     <div className='ShowMeaning'> 
       <h2>
       {word} is a {isWord ? 'great guess' : 'a a uhh. not a word'}.
       </h2>
       <p>
       {isWord ? meaningShortened : 'guess better next time'}
       </p>
    </div>  ) 
} 
export default NewComp;
