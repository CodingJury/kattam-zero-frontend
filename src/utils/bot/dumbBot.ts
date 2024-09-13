import { BoardState } from "../../atoms/gameAtom";
import { availableCells } from "../boardHelper";

export const dumbBot = (board: BoardState) => {
  const cells = availableCells(board)
  return cells[0] //Taking the first spot in the remainint spot
}