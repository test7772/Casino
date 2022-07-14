var dealerSum = 0;
var playerSum = 0;

var dealerAceCount = 0;
var playerAceCount = 0;

var hidden;
var deck;
var canHit = true; //Make sure I have less than 21

window.onload = function () {
  buildDeck(); //In the future, build multiple decks
  shuffleDeck();
  startGame();
};

function buildDeck() {
  let numDecks = 3; //There will be a way to re-shuffle decks after x cards are used
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let types = ["C", "D", "H", "S"];
  deck = [];
  for (let i = 0; i < numDecks; i++) {
    for (let j = 0; j < types.length; j++) {
      for (let k = 0; k < values.length; k++) {
        deck.push(values[k] + "-" + types[j]); //Builds deck in order.eg 2-C, 3-D, J-D, etc.
      }
    }
  }
}
function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}
function startGame() {
  //Queue player for bet
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);
  //Deal second card to dealer
  //Deal player cards
  //Player Plays
  dealCards();

  //   while (dealerSum < 17) {
  //     //Dealer plays
  //     let cardImg = document.createElement("img");
  //     let card = deck.pop();
  //     cardImg.src = "./Cards/" + card + ".png";
  //     dealerSum += getValue(card);
  //     dealerAceCount += checkAce(card);
  //     document.getElementById("dealer-cards").append(cardImg);
  //   }
}
function getValue(card) {
  let data = card.split("-");
  let value = data[0];
  if (isNaN(value)) {
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}
function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}
function dealCards() {
  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./Cards/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("player-cards").append(cardImg);
  }
  for (let i = 0; i < 1; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./Cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);
  }
  console.log(playerSum);
  console.log(dealerSum);
}
