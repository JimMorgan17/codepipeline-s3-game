<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Matching Image Game</title>
    <style>
        /* Add your styles here */
    </style>
</head>
<body>
    <div id="game-board"></div>
    <button id="start-game">Start Game</button>
    <div id="timer">Time left: <span id="time-remaining">60</span> seconds</div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const grid = document.querySelector('#game-board');
            const startButton = document.getElementById('start-game');
            const timerDisplay = document.getElementById('time-remaining');
            let cardsChosen = [];
            let cardsChosenId = [];
            let cardsWon = [];
            let timer;
            let timeLeft = 60; // Set the timer for 60 seconds

            const cardArray = [
                { name: 'card1', img: 'images/Cat1.png' },
                { name: 'card1', img: 'images/Cat1.png' },
                { name: 'card2', img: 'images/Cat2.png' },
                { name: 'card2', img: 'images/Cat2.png' },
                { name: 'card3', img: 'images/Cat3.png' },
                { name: 'card3', img: 'images/Cat3.png' },
                { name: 'card4', img: 'images/Cat4.png' },
                { name: 'card4', img: 'images/Cat4.png' },
                { name: 'card5', img: 'images/Cat5.png' },
                { name: 'card5', img: 'images/Cat5.png' },
                // ...add more pairs as needed
            ];

            function shuffle(array) {
                array.sort(() => 0.5 - Math.random());
            }

            function createBoard() {
                shuffle(cardArray);
                grid.innerHTML = '';
                cardsWon = [];
                timeLeft = 60; // Reset timer
                timerDisplay.textContent = timeLeft; // Update timer display
                startTimer(); // Start the timer

                for (let i = 0; i < cardArray.length; i++) {
                    const card = document.createElement('img');
                    card.setAttribute('src', 'images/Cat.png');
                    card.setAttribute('data-id', i);
                    card.addEventListener('click', flipCard);
                    grid.appendChild(card);
                }
            }

            function flipCard() {
                let cardId = this.getAttribute('data-id');
                if (!cardsChosenId.includes(cardId)) {
                    cardsChosen.push(cardArray[cardId].name);
                    cardsChosenId.push(cardId);
                    this.setAttribute('src', cardArray[cardId].img);
                    if (cardsChosen.length === 2) {
                        setTimeout(checkForMatch, 500);
                    }
                }
            }

            function checkForMatch() {
                const cards = document.querySelectorAll('#game-board img');
                const firstCardId = cardsChosenId[0];
                const secondCardId = cardsChosenId[1];

                if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
                    cards[firstCardId].style.visibility = 'hidden';
                    cards[secondCardId].style.visibility = 'hidden';
                    cards[firstCardId].removeEventListener('click', flipCard);
                    cards[secondCardId].removeEventListener('click', flipCard);
                    cardsWon.push(cardsChosen);
                } else {
                    cards[firstCardId].setAttribute('src', 'images/Cat.png');
                    cards[secondCardId].setAttribute('src', 'images/Cat.png');
                }

                cardsChosen = [];
                cardsChosenId = [];

                if (cardsWon.length === cardArray.length / 2) {
                    clearInterval(timer); // Stop the timer
                    alert('Congratulations! You found them all!');
                }
            }

            function startTimer() {
                timer = setInterval(() => {
                    timeLeft--;
                    timerDisplay.textContent = timeLeft; // Update timer display
                    if (timeLeft <= 0
        }
    }

    startButton.addEventListener('click', createBoard);
});
