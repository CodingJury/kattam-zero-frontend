import { useRecoilValue } from "recoil";
import { gameAtom } from "../../../atoms/gameAtom";
import "./TicTacToeBoard.style.css"
import { cn } from "../../../utils/functions/functions.cn";

type Params = {
  handlePlacePiece: (index: number) => void
}

const TicTacToeBoard = ({handlePlacePiece}: Params) => {
  const gameState = useRecoilValue(gameAtom)

  return (
    <table border={2} color="black">
      <tbody>
        {[0, 3, 6].map((rowStartIndex) => (
          <tr key={rowStartIndex}>
            {gameState.boardState.slice(rowStartIndex, rowStartIndex + 3).map((cell, cellIndex) => (
              <td
                key={rowStartIndex + cellIndex}
                onClick={() => handlePlacePiece(rowStartIndex + cellIndex)}
                className={cn(
                  { "cursor-pointer": cell !== "X" && cell !== "O" },
                  { "cursor-not-allowed": cell === "X" || cell === "O" || gameState.gameStatus !== "IN_PROGRESS" }
                )}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TicTacToeBoard;
