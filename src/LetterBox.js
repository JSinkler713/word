import React, {useState, useEffect, useContext} from 'react'; 
 
const LetterBox = ({value, className, realWord, colIndex, choiceMade})=> {
  const [otherClasses, setOtherClasses] = useState('')

  function isCorrect() {
    if (realWord[value] && realWord[value].includes(colIndex)) {
      console.log('got it spot on ,', value, 'at colIndex ', colIndex)
      setOtherClasses('Green')
    } else if (realWord[value]) {
      console.log('yes ', value, ' is in there but in the wrong spot')
      setOtherClasses('Yellow')
    } else {
      console.log('nope ', value, 'is not in there')
    }
  }
  useEffect(()=> {
    if ( choiceMade ) {
      isCorrect()
    }
  }, [choiceMade])

  return ( 
    <li className={otherClasses ? otherClasses + 
        ' Cell' : className + ' Cell'}>{value}</li>
  )
} 
export default LetterBox;
