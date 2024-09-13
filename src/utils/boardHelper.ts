import { BoardState } from "../atoms/gameAtom";

const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

export function availableCells(board: BoardState) {
  return board.reduce((acc: number[], curr, ind) => (curr === "") ? acc.concat(ind) : acc, [])
}

export function checkTie(board: BoardState) {
  if (availableCells(board).length == 0) {
		return true;
	}
	return false;
}

export function checkWin(board: BoardState, piece: "X" | "O") {
  let plays = board.reduce((acc: number[], curr, ind) => (curr === piece) ? acc.concat(ind) : acc, [])
  
  let gameWon = null;
  for (let [_, winCombo] of winCombos.entries()) {
		if (winCombo.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {winningCombination: winCombo, player: piece};
			break;
		}
	}
  return gameWon;
}