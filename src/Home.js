import { useState, useEffect } from "react";
import "./App.css";
import LetterBox from "./LetterBox";
import { hashWordUtil, unHashUtil } from "./hashWordUtil";
import ShowMeaning from "./ShowMeaning";
import Share from "./Share";
const apiUrl = process.env.REACT_APP_API_BASE || "http://localhost:4000";

function Home() {
  const [randomWord, setRandomWord] = useState({});
  const [simpleWord, setSimpleWord] = useState("");
  const [loadingDone, setLoadingDone] = useState(false);
  const [currentChoice, setCurrentChoice] = useState([]);
  const [showChooseButton, setShowChooseButton] = useState(false);
  const [guessIndex, setGuessIndex] = useState(0);
  const [guessCol, setGuessCol] = useState(0);
  const [allGuesses, setAllGuesses] = useState([[], [], [], [], []]);
  const [showLink, setShowLink] = useState(false);
  const [alphabetHasBeenGuessed, setAlphabetHasBeenGuessed] = useState({});
  const [checkedForHash, setCheckedForHash] = useState(false);
  const [meaning, setMeaning] = useState("");
  const [isWord, setIsWord] = useState("");
  const [showGuess, setShowGuess] = useState(false);
  const [choiceCopy, setChoiceCopy] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [hashed, setHashed] = useState("");
  const [doReset, setDoReset] = useState(true)

  function reset() {
    setRandomWord({});
    setSimpleWord("");
    setLoadingDone(false);
    setCurrentChoice([]);
    setShowChooseButton(false);
    setGuessIndex(0);
    setGuessCol(0);
    setAllGuesses([[], [], [], [], []]);
    setShowLink(false);
    setAlphabetHasBeenGuessed({});
    setCheckedForHash(false);
    setMeaning("");
    setIsWord("");
    setShowGuess(false);
    setChoiceCopy("");
    setIsDone(false);
    setHashed("");
    setDoReset(true)
  }

  function cleanWord(word) {
    let wordDictionary = {};
    let alphabetDictionary = {};
    for (let i = 0; i < 5; i++) {
      if (!wordDictionary[word[i]]) {
        wordDictionary[word[i]] = [i];
      } else {
        wordDictionary[word[i]] = [...wordDictionary[word[i]], i];
      }
      if (!alphabetHasBeenGuessed[word[i]]) {
        alphabetDictionary[word[i]] = "not guessed";
      }
    }
    return [wordDictionary, alphabetDictionary];
  }
  useEffect(() => {
    if (doReset === true) {
      let url = window.location.href;
      let scrambledArr = url.split("?");
      let hashedWord;
      let realWord;
      if (scrambledArr.length === 2) {
        hashedWord = scrambledArr[1];
      }
      //use hashed to get word
      if (hashedWord) {
        realWord = unHashUtil(hashedWord);
        setHashed(hashedWord);
        const [wordDictionary, alphabetDictionary] = cleanWord(realWord);
        setRandomWord(wordDictionary);
        setAlphabetHasBeenGuessed(alphabetDictionary);
        setSimpleWord(realWord);
      }
      setCheckedForHash(true);
    }
    setDoReset(false)
  }, [reset]);

  useEffect(() => {
    if (guessIndex === 5) {
      setIsDone(true);
    }
  }, [guessIndex]);

  useEffect(() => {
    if (checkedForHash && !simpleWord) {
      function fetchWord() {
        fetch(apiUrl + '/five-letter')
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            const [wordDictionary, alphabetDictionary] = cleanWord(res.word);
            setRandomWord(wordDictionary);
            setAlphabetHasBeenGuessed(alphabetDictionary);
            setSimpleWord(res.word);
            setHashed(hashWordUtil(res.word));
          });
      }
      fetchWord();
    }
  }, [checkedForHash]);

  useEffect(() => {
    let hashedWord;
    let rerehashed;
    if (simpleWord) {
      console.log("***********************");
      hashedWord = hashWordUtil(simpleWord);
      console.log("hashed, ", hashedWord);
      console.log("***********************");
      rerehashed = unHashUtil(hashedWord);
      console.log("unhashed, ", rerehashed);
    }
  }, [simpleWord]);

  useEffect(() => {
    function setRemainingLetters() {}
    if (randomWord) {
      setRemainingLetters();
    }
  }, [randomWord]);

  useEffect(() => {
    if (!loadingDone) {
      let timeOut = setTimeout(() => {
        setLoadingDone(true);
      }, 2500);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [loadingDone]);

  useEffect(() => {
    if (currentChoice.length === 5) {
      setShowChooseButton(true);
    } else {
      setShowChooseButton(false);
    }
  }, [currentChoice, setCurrentChoice]);

  function renderTableCells() {
    let tableRows = new Array(5);
    for (let i = 0; i < tableRows.length; i++) {
      tableRows[i] = (
        <ul className="Row" key={`row-${i}`}>
          <LetterBox
            key="col-1"
            value={allGuesses[i][0]}
            className={
              i === guessIndex && 0 === guessCol ? "Active Cell" : "Cell"
            }
            realWord={randomWord}
            choiceMade={guessIndex > i ? true : false}
            colIndex={0}
          />
          <LetterBox
            className={
              i === guessIndex && 1 === guessCol ? "Active Cell" : "Cell"
            }
            key="col-2"
            value={allGuesses[i][1]}
            choiceMade={guessIndex > i ? true : false}
            realWord={randomWord}
            colIndex={1}
          />
          <LetterBox
            className={
              i === guessIndex && 2 === guessCol ? "Active Cell" : "Cell"
            }
            key="col-3"
            value={allGuesses[i][2]}
            realWord={randomWord}
            colIndex={2}
            choiceMade={guessIndex > i ? true : false}
          />
          <LetterBox
            className={
              i === guessIndex && 3 === guessCol ? "Active Cell" : "Cell"
            }
            key="col-4"
            value={allGuesses[i][3]}
            realWord={randomWord}
            colIndex={3}
            choiceMade={guessIndex > i ? true : false}
          />
          <LetterBox
            className={
              i === guessIndex && 4 === guessCol ? "Active Cell" : "Cell"
            }
            key="col-5"
            value={allGuesses[i][4]}
            realWord={randomWord}
            colIndex={4}
            choiceMade={guessIndex > i ? true : false}
          />
        </ul>
      );
    }
    return <div className="Table">{tableRows}</div>;
  }
  function makeAlphabet() {
    const letters = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    return (
      <ul className="Alphabet">
        {letters.map((letter) => (
          <li
            onClick={handleChooseLetter}
            className="Letter"
            value={letter}
            key={letter}
          >
            {letter}
          </li>
        ))}
      </ul>
    );
  }

  function handleChooseLetter(e) {
    setCurrentChoice([...currentChoice, e.target.innerText]);
    const allGuessesCopy = [...allGuesses];
    allGuessesCopy[guessIndex][guessCol] = e.target.innerText;
    setAllGuesses(allGuessesCopy);
    setGuessCol(guessCol + 1);
  }
  async function checkIsWord(word) {
    let result = await fetch(apiUrl + "/check-is-word", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word: word }),
    });
    result = await result.json();
    return result;
  }

  useEffect(() => {
    let timer;
    if (showGuess) {
      timer = setTimeout(() => {
        setShowGuess(false);
        setCurrentChoice([]);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showGuess]);

  async function handleChooseWord() {
    console.log("handling the choice");
    let countCorrect = 0;
    setChoiceCopy(currentChoice.join(""));
    console.log("checking is word");
    let returnValue = await checkIsWord(currentChoice.join(""));
    console.log(returnValue);
    setMeaning(returnValue.meaning);
    setIsWord(returnValue.isWord);
    setShowGuess(true);
    currentChoice.forEach((letter, index) => {
      if (randomWord[letter] && randomWord[letter].includes(index)) {
        console.log("got it spot on ,", letter, "at index ", index);
        // if spot on need to update alphabet to green at that letter
        let alphabetCopy = alphabetHasBeenGuessed;
        alphabetCopy[letter] = "green";
        setAlphabetHasBeenGuessed(alphabetCopy);
        countCorrect++;
      } else if (randomWord[letter]) {
        // if in dictionary but wrong spot need to update alphabet to yellow at that letter
        console.log("in a letter chosen");
        if (setAlphabetHasBeenGuessed[letter] !== "green") {
          let alphabetCopy = alphabetHasBeenGuessed;
          alphabetCopy[letter] = "yellow";
          console.log("alphabetCopy", alphabetCopy);
          console.log("setting to yellow");
          setAlphabetHasBeenGuessed(alphabetCopy);
        }
        console.log("yes ", letter, " is in there but in the wrong spot");
      } else {
        console.log("nope ", letter, "is not in there");
        // increase index
        setGuessIndex(guessIndex + 1);
      }
    });
    setGuessCol(0);

    if (countCorrect === 5) {
      console.log("correct guess");
      console.log("game over");
      setGuessIndex(guessIndex + 1);
      setShowLink(true);
    } else {
      console.log("not guessed right yet");
      // set this row of choices, move to next row
      if (guessIndex === 4) {
        console.log("game over");
        setShowLink(true);
      }
    }
  }

  let cells = renderTableCells();
  let alphabet = makeAlphabet();

  return (
    <div className="App">
      <ShowMeaning
        word={currentChoice}
        isWord={isWord}
        meaning={meaning}
        showGuess={showGuess}
      />
      {(!randomWord || !loadingDone) && (
        <header className="App-header">
          <h1>Wordl</h1>
          <p>Guess the five letter wordl</p>
        </header>
      )}
      {randomWord && loadingDone && cells && alphabet && (
        <div className="Game">
          {cells}
          {alphabet}
          {showChooseButton && (
            <button onClick={handleChooseWord}>Submit</button>
          )}
          {showLink && (
            <>
              <a
                target="_blank"
                href={`https://www.merriam-webster.com/dictionary/${simpleWord}`}
              >
                {simpleWord}
              </a>
              <button onClick={reset}>Reset</button>
      {isDone ? <Share hash={hashed} /> : null}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Home
