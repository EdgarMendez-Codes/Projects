
let winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];


    let restartButton = document.getElementById("restart");
    restartButton.onclick = reloadPage;

    const reloadPage = () => {
        window.location.reload();
    }



const grid = () => Array.from(document.getElementsByClassName("q"));
const numberId = (qEL) => Number.parseInt(qEL.id.replace('q', ' '));
const emptyBox = () => grid().filter(_qEL => _qEL.innerText === '');
const boxSame = (array) => array.every(_qEL => _qEL.innerText === array[0].innerText && _qEL.innerText !== '');


const userTurn = (index, letter) => grid()[index].innerText = letter;
const opponentChoice = () => numberId(emptyBox()[Math.floor(Math.random()* emptyBox().length)]);


const finishGame = (winningSequence) => {
    winningSequence.forEach(_qEL => _qEL.classList.add('winner'));
    disableListeners();
}
const checkWin = () => {
    let victory = false;

    winningCombos.forEach(_c => {
        const _grid = grid();
        const sequenece = [_grid[_c[0]], _grid[_c[1]], _grid[_c[2]]];
        if(boxSame(sequenece)) {
            victory = true;
            finishGame(sequenece);
        }
    })

    return victory;
}

const computerTurn = () => {
    disableListeners();
    setTimeout(() => {
        userTurn(opponentChoice(), 'o');
        if(!checkWin())
        enableListeners();
    }, 1000);

}

const clickFunction = ($event) => {
    userTurn(numberId($event.target), 'x')
    if(!checkWin())
    computerTurn();
}

const enableListeners = () => grid().forEach(_qEl => _qEl.addEventListener('click', clickFunction));
const disableListeners = () => grid().forEach(_qEl => _qEl.removeEventListener('click', clickFunction));

enableListeners();