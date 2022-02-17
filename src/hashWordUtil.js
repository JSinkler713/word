const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']


export function hashWordUtil(word) {
  let indices = []
  for (let i=0; i< word.length; i++) {
    indices.push(letters.indexOf(word[i]))
  }
  console.log(word)
  console.log(indices)
  const hashedIndices = indices.map((letterIndex, i) => {
   return (letterIndex + 5) % (letters.length - 1)
  })
  const hashedLettersAndNumbers = []
  const hashedLetters = hashedIndices.map((hashedLetterIndex, i) => letters[hashedLetterIndex])

  hashedIndices.forEach((index, i) => {
    hashedLettersAndNumbers.push(index % 10)
    hashedLettersAndNumbers.push(hashedLetters[i])
  })
  return hashedLettersAndNumbers.join('')
}

export function unHashUtil(hashedWord) {
  let indices = []
  for (let i=0; i< hashedWord.length; i++) {
    if (i % 2 !== 0) {
      indices.push(letters.indexOf(hashedWord[i]))
    }
  }
  console.log(hashedWord)
  console.log(indices)
  const unHashedIndices = indices.map((letterIndex, i) => {
   return (letterIndex - 5 + 25) % (letters.length - 1)
  })
  const unHashedLetters = unHashedIndices.map((hashedLetterIndex, i) => letters[hashedLetterIndex])
  return unHashedLetters.join('')
}
