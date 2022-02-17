import { useState, useEffect } from "react"
import './App.css';
import LetterBox from './LetterBox';
import { hashWordUtil, unHashUtil } from './hashWordUtil';
const apiUrl = 'http://localhost:4000/five-letter'


function App() {
  const [randomWord, setRandomWord] = useState({})
  const [simpleWord, setSimpleWord] = useState('')
  const [loadingDone, setLoadingDone] = useState(false)
  const [currentChoice, setCurrentChoice] = useState([])
  const [showChooseButton, setShowChooseButton] = useState(false)
  const [guessIndex, setGuessIndex] = useState(0)
  const [guessCol, setGuessCol] = useState(0)
  const [allGuesses, setAllGuesses] = useState([[], [], [], [], []])
  const [showLink, setShowLink] = useState(false)
  const [alphabetHasBeenGuessed, setAlphabetHasBeenGuessed] = useState({})
  const [checkedForHash, setCheckedForHash] = useState(false)


  function cleanWord(word) {
    let wordDictionary = {}
    let alphabetDictionary = {}
    for (let i=0; i<5; i++) {
      if (!wordDictionary[word[i]]) {
        wordDictionary[word[i]] = [i]
      } else {
        wordDictionary[word[i]] = [ ...wordDictionary[word[i]], i]
      }
      if (!alphabetHasBeenGuessed[word[i]]) {
        alphabetDictionary[word[i]] = 'not guessed'
      }
    }
    return [wordDictionary, alphabetDictionary]
  }
  useEffect(()=> {
    let url = window.location.href
    let scrambledArr = url.split('?')
    let hashed;
    let realWord;
    if (scrambledArr.length === 2) {
      hashed = scrambledArr[1]
    }
    //use hashed to get word
    if (hashed) {
      realWord = unHashUtil(hashed)
      const [wordDictionary, alphabetDictionary] = cleanWord(realWord)
      setRandomWord(wordDictionary)
      setAlphabetHasBeenGuessed(alphabetDictionary)
      setSimpleWord(realWord)
    }
    setCheckedForHash(true)
  }, [])

  useEffect(()=> {
    if (checkedForHash && !simpleWord) {
    function fetchWord() {
      fetch(apiUrl).then(res => res.json()).then(res => {
        console.log(res)
        const [wordDictionary, alphabetDictionary] = cleanWord(res.word)
        setRandomWord(wordDictionary)
        setAlphabetHasBeenGuessed(alphabetDictionary)
        setSimpleWord(res.word)
      })
    }
    fetchWord()
    }
  }, [checkedForHash])

  useEffect(()=> {
    let hashedWord;
    let rerehashed
    if (simpleWord) {
      console.log('***********************')
      hashedWord = hashWordUtil(simpleWord)
      console.log('hashed, ', hashedWord)
      console.log('***********************')
      rerehashed = unHashUtil(hashedWord)
      console.log('unhashed, ', rerehashed)
    }

  }, [simpleWord])

  useEffect(()=> {
    function setRemainingLetters() {
    }
    if (randomWord) {
      setRemainingLetters()
    }
  }, [randomWord])

  useEffect(()=> {
    let timeOut = setTimeout(()=> {
      setLoadingDone(true)
    }, 2500);
    return ()=> {
      clearTimeout(timeOut)
    }
  }, [])

  useEffect(()=> {
    if (currentChoice.length === 5) {
      setShowChooseButton(true)
    } else {
      setShowChooseButton(false)
    }
  }, [currentChoice, setCurrentChoice])

  function renderTableCells() {
    let tableRows = new Array(5)
    for (let i=0; i< tableRows.length; i++) {
      tableRows[i] = (<ul className='Row' key={`row-${i}`}>
        <LetterBox key='col-1' value={allGuesses[i][0]} className={i === guessIndex && 0 === guessCol ? 'Active Cell' : 'Cell'} realWord={randomWord} choiceMade={guessIndex > i ? true : false } colIndex={0} />
        <LetterBox className={(i === guessIndex && 1 === guessCol ? 'Active Cell' : 'Cell')} key='col-2' value={allGuesses[i][1]} choiceMade={guessIndex > i ? true : false } realWord={randomWord} colIndex={1} />
        <LetterBox className={(i === guessIndex && 2 === guessCol ? 'Active Cell' : 'Cell')} key='col-3' value={allGuesses[i][2]} realWord={randomWord} colIndex={2} choiceMade={guessIndex > i ? true : false } />
        <LetterBox className={(i === guessIndex && 3 === guessCol ? 'Active Cell' : 'Cell')} key='col-4' value={allGuesses[i][3]} realWord={randomWord} colIndex={3} choiceMade={guessIndex > i ? true : false } />
        <LetterBox className={(i === guessIndex && 4 === guessCol ? 'Active Cell' : 'Cell')} key='col-5' value={allGuesses[i][4]} realWord={randomWord} colIndex={4} choiceMade={guessIndex > i ? true : false } />
      </ul>)
    }
    return <div className='Table'>{tableRows}</div>
  }
  function makeAlphabet() {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    return (<ul className="Alphabet">
      {letters.map((letter)=><li onClick={handleChooseLetter} className='Letter' value={letter} key={letter}>{letter}</li>)}
    </ul>)
  }

  function handleChooseLetter (e) {
    setCurrentChoice([...currentChoice, e.target.innerText])
    const allGuessesCopy = [...allGuesses]
    allGuessesCopy[guessIndex][guessCol] = e.target.innerText
    setAllGuesses(allGuessesCopy)
    setGuessCol(guessCol + 1)
  }

function handleChooseWord () {
  console.log('handling the choice')
  let countCorrect = 0
  currentChoice.forEach((letter, index) => {
    if (randomWord[letter] && randomWord[letter].includes(index)) {
      console.log('got it spot on ,', letter, 'at index ', index)
      // if spot on need to update alphabet to green at that letter
      let alphabetCopy = alphabetHasBeenGuessed
      alphabetCopy[letter] = 'green'
      setAlphabetHasBeenGuessed(alphabetCopy)
      countCorrect++
    } else if (randomWord[letter]) {
      // if in dictionary but wrong spot need to update alphabet to yellow at that letter
      console.log('in a letter chosen')
      if (setAlphabetHasBeenGuessed[letter] !== 'green') {
        let alphabetCopy = alphabetHasBeenGuessed
        alphabetCopy[letter] = 'yellow'
        console.log('alphabetCopy', alphabetCopy)
        console.log('setting to yellow')
        setAlphabetHasBeenGuessed(alphabetCopy)
      }
      console.log('yes ', letter, ' is in there but in the wrong spot')
    } else {
      console.log('nope ', letter, 'is not in there')
      // increase index
      setGuessIndex(guessIndex + 1)
    }
  })
  setGuessCol(0)

  if (countCorrect === 5) {
    console.log('correct guess')
    console.log('game over')
    setGuessIndex(guessIndex + 1)
    setShowLink(true)
  } else {
    console.log('not guessed right yet')
    // set this row of choices, move to next row
    if (guessIndex === 4) {
      console.log('game over')
      setShowLink(true)
    }
    setCurrentChoice([])
  }
}


  let cells = renderTableCells()
  let alphabet = makeAlphabet()

  return (
    <div className="App">
        {(!randomWord || !loadingDone) &&
        <header className="App-header">
          <h1>
            Wordl
          </h1>
          <p>Guess the five letter wordl</p>
        </header>
        }
        {(randomWord && loadingDone) && cells && alphabet &&
          <div className='Game'>
            {cells}
            {alphabet}
            {showChooseButton && <button onClick={handleChooseWord}>Submit</button>}
            {showLink && (
              <>
                <a target="_blank" href={`https://www.merriam-webster.com/dictionary/${simpleWord}`}>{simpleWord}</a>
                <a href="#">Reset</a>
              </>
            )}
          </div>
        }
    </div>
  );
}

export default App;
