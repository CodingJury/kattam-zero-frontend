import { BoardState } from "../../atoms/gameAtom";
import { availableCells, checkWin } from "../boardHelper";

interface Move {
  index: number; 
  score: number;
}

export const minmaxBot = (board: BoardState, botPiece: "X" | "O") => {
  const a = minimax(board, botPiece);
  return a.index as number;
}

function minimax(newBoard: BoardState, player: "X" | "O") {
	let availSpots = availableCells(newBoard);

	if (checkWin(newBoard, "X")) {
		return {score: -10, index: -1};
	} else if (checkWin(newBoard, "O")) {
		return {score: 10, index: -1};
	} else if (availSpots.length === 0) {
		return {score: 0, index: -1};
	}

	const moves: Move[] = [];
	for (let i = 0; i < availSpots.length; i++) {
		const move: Partial<Move> = {};
    const boardCopy = [...newBoard] as BoardState
		move.index = availSpots[i];
		boardCopy[availSpots[i]] = player;

		if (player == "O") {
			const result = minimax(boardCopy, "X");
			move.score = result.score;
		} else {
			const result = minimax(boardCopy, "O");
			move.score = result.score;
		}

		boardCopy[availSpots[i]] = "";

		moves.push(move as Move);
	}

	let bestMoveIndex = 0;
	if(player === "O") {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMoveIndex = i;
			}
		}
	} else {
		let bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMoveIndex = i;
			}
		}
	}

	return moves[bestMoveIndex];
}