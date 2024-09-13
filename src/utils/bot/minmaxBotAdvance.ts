import { BoardState } from "../../atoms/gameAtom";
import { availableCells, checkWin } from "../boardHelper";

interface Move {
  index: number;
  score: number;
  depth: number; // to track how many moves to reach this state
}

export const minmaxBotAdv = (board: BoardState, botPiece: "X" | "O") => {
  const a = minimax(board, botPiece);
  return a.index as number;
}

function minimax(
  newBoard: BoardState,
  player: "X" | "O",
  alpha: number = -Infinity,
  beta: number = Infinity,
  depth: number = 0 // track the depth of recursion
): Move {
  const availSpots = availableCells(newBoard);

  // Base case: check for terminal states (win, lose, or tie)
  if (checkWin(newBoard, "X")) {
    return { score: -10, index: -1, depth }; // Negative score for "X" win
  } else if (checkWin(newBoard, "O")) {
    return { score: 10, index: -1, depth }; // Positive score for "O" win
  } else if (availSpots.length === 0) {
    return { score: 0, index: -1, depth }; // Tie
  }

  const moves: Move[] = [];

  for (let i = 0; i < availSpots.length; i++) {
    const boardCopy = [...newBoard] as BoardState;
    const move: Partial<Move> = {};
    move.index = availSpots[i];

    // Place the piece on the board
    boardCopy[availSpots[i]] = player;

    // Recursively call minimax for the opponent
    if (player === "O") {
      const result = minimax(boardCopy, "X", alpha, beta, depth + 1);
      move.score = result.score;
      move.depth = result.depth; // Track how deep the win occurs
      alpha = Math.max(alpha, result.score); // Update alpha
    } else {
      const result = minimax(boardCopy, "O", alpha, beta, depth + 1);
      move.score = result.score;
      move.depth = result.depth; // Track how deep the win occurs
      beta = Math.min(beta, result.score); // Update beta
    }

    // Undo the move
    boardCopy[availSpots[i]] = "";

    moves.push(move as Move);

    // Alpha-beta pruning
    if (alpha >= beta) {
      break; // Cut off the branch
    }
  }

  let bestMoveIndex = 0;

  if (player === "O") {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      // Prefer moves with a higher score, and among them, prefer shallower wins
      if (
        moves[i].score > bestScore ||
        (moves[i].score === bestScore && moves[i].depth < moves[bestMoveIndex].depth)
      ) {
        bestScore = moves[i].score;
        bestMoveIndex = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      // Prefer moves with a lower score, and among them, prefer shallower losses
      if (
        moves[i].score < bestScore ||
        (moves[i].score === bestScore && moves[i].depth < moves[bestMoveIndex].depth)
      ) {
        bestScore = moves[i].score;
        bestMoveIndex = i;
      }
    }
  }

  return moves[bestMoveIndex];
}
