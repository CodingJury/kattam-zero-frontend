import { atom } from "recoil"

export type PieceState = "X" | "O" | ""
export type BoardState = [PieceState, PieceState, PieceState, PieceState, PieceState, PieceState, PieceState, PieceState, PieceState]
type OpponentState = "NONE" | "BOT" | "OFFLINE_PLAYER" | "ONLINE_PLAYER"

type GameState = {
  gameStatus: "NOT_STARTED" | "IN_PROGRESS" | "GAME_WON" | "GAME_LOSE" | "GAME_TIE"
  assignedPiece: PieceState
  boardState: BoardState
  opponentType: OpponentState
  isCurrentlyMyMove: boolean
  isGameRated: boolean
}

const createRandomBoolean = () => Math.random() > 0.5;
export const createGameState = (type: "IDLE" | "BOT" | "OVER_THE_BOARD"): GameState => {
  const randomBoolean = createRandomBoolean();
  switch (type) {
    case "BOT":
      return {
        gameStatus: "IN_PROGRESS",
        assignedPiece: randomBoolean ? "X" : "O",
        boardState: ["", "", "", "", "", "", "", "", ""],
        isCurrentlyMyMove: randomBoolean,
        opponentType: "BOT",
        isGameRated: false,
      };
    case "OVER_THE_BOARD":
      return {
        gameStatus: "IN_PROGRESS",
        assignedPiece: randomBoolean ? "X" : "O",
        boardState: ["", "", "", "", "", "", "", "", ""],
        isCurrentlyMyMove: randomBoolean,
        opponentType: "OFFLINE_PLAYER",
        isGameRated: false,
      };
    case "IDLE":
      return {
        gameStatus: "NOT_STARTED",
        assignedPiece: "",
        boardState: ["", "", "", "", "", "", "", "", ""],
        isCurrentlyMyMove: true,
        opponentType: "NONE",
        isGameRated: false,
      };
  }
};

export const defaultGameState = {
  IDLE: createGameState("IDLE"),
  BOT: createGameState("BOT"),
  OVER_THE_BOARD: createGameState("OVER_THE_BOARD"),
};

export const gameAtom = atom<GameState>({
  key: 'gameState',
  default: defaultGameState.IDLE
})