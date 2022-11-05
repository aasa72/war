const newDeckButton = document.getElementById("new-deck-button")
const drawButton = document.getElementById("draw-button")
const cardSection = document.getElementById("card-section")
const winnerMessage = document.getElementById("winner-message")
const remainingCardsMessage = document.getElementById("remaining-cards-message")
const computerScoreText = document.getElementById("computer-score-text")
const myScoreText = document.getElementById("my-score-text")

let deckId 
let computerScore = 0
let myScore = 0

newDeckButton.addEventListener("click", function() {
 fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/")
  .then(res => res.json())
  .then(data => {
    remainingCardsMessage.innerText = `Cards left: ${data.remaining}`
    deckId = data.deck_id
    console.log(deckId)
  })
})

drawButton.addEventListener("click", function() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
  .then(res => res.json())
  .then(data => {
    remainingCardsMessage.innerText = `Cards left: ${data.remaining}`

    cardSection.children[0].innerHTML = `
    <img src=${data.cards[0].image} class="card">`

    cardSection.children[1].innerHTML = `
    <img src=${data.cards[1].image} class="card">`

    const winnerText = determineCardWinner(data.cards[0], data.cards[1])

    winnerMessage.innerText = winnerText

     if(data.remaining === 0) {
      drawButton.disabled = true
        if(computerScore > myScore) {
          winnerMessage.innerText = `The computer won the game`
        }else if(computerScore < myScore) {
          winnerMessage.innerText = `You won the game!`
        }else {
          winnerMessage.innerText = `The game is a tie!`
        }
     }
   

  })
})

function determineCardWinner(card1, card2) {
  const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
  "10", "JACK", "QUEEN", "KING", "ACE"]
  const card1ValueIndex = valueOptions.indexOf(card1.value)
  const card2ValueIndex = valueOptions.indexOf(card2.value)
  

  if (card1ValueIndex > card2ValueIndex) {
    computerScore++
    computerScoreText.innerText = `Computer score: ${computerScore}`
    return `Computer wins!`
} else if (card1ValueIndex < card2ValueIndex) {
  myScore++
  myScoreText.innerText = `My score: ${myScore}`
    return `You win!`
} else {
    return `It's a tie!`
}
}

