import MainLayout from "../../components/layouts/Main.layout"
import TicTacToeBoard from "../../components/custom/borads/TicTacToeBoard"
import { useRecoilState, useRecoilValue } from "recoil"
import { BoardState, gameAtom, defaultGameState } from "../../atoms/gameAtom"
import { useCallback, useEffect } from "react"
import { checkTie, checkWin } from "../../utils/boardHelper"
import { authModalAtom } from "../../atoms/authModalAtom"
import AuthModal from "../../components/custom/modal/auth/AuthModal"
import { defaultGameModalState, gameModalAtom } from "../../atoms/gameModalAtom"
import GameModal from "../../components/custom/modal/game/GameModal"
import PlayerStatsBar from "../../components/primitives/PlayerStatsBar"

const PlayWithBotPage = () => {
  const authModalState = useRecoilValue(authModalAtom)
  const [gameModalState, setGameModalState] = useRecoilState(gameModalAtom)
  const [gameState, setGameState] = useRecoilState(gameAtom)

  useEffect(() => {
    setGameModalState((prev) => ({...prev, ...defaultGameModalState.CLOSE}))
    setGameState((prev) => ({...prev, ...defaultGameState.OVER_THE_BOARD}))
  }, [])

  const getPieceToPlace = useCallback((player: "ME" | "OFFLINE_PLAYER") => {
    return (player === "ME") ? (gameState.assignedPiece as "X" | "O") : (gameState.assignedPiece === "X" ? "O" : "X");
  }, [gameState.assignedPiece])

  const handlePlacePiece = (index: number) => {
    if(gameState.gameStatus === "IN_PROGRESS") {
      const pieceInClickedPlace = gameState.boardState[index];
      if (pieceInClickedPlace !== "X" && pieceInClickedPlace !== "O") {
        if(gameState.isCurrentlyMyMove) {
          turnClick(index, "ME")
        } else {
          turnClick(index, "OFFLINE_PLAYER")
        }
      } else {
        console.error(`"${pieceInClickedPlace}" => piece is already placed at this position`);
      }
    } else if(gameState.gameStatus === "GAME_WON" || gameState.gameStatus === "GAME_TIE" || gameState.gameStatus === "GAME_LOSE") {
      setGameModalState((prev) => ({...prev, isOpen: true, type: "overTheBoardRematch"}))
    }
  };

  const turnClick = useCallback((index: number, player: "ME" | "OFFLINE_PLAYER") => {
    // Step 1: Update only the board state
    setGameState((prev) => {
      const newBoardState = [...prev.boardState] as BoardState;
      newBoardState[index] = getPieceToPlace(player);

      return {...prev, boardState: newBoardState}
    })

    setGameState((prev) => {
      const win = checkWin(prev.boardState, getPieceToPlace(player));
      if(win) {
        // console.log(`${player} wins!`, win)
        return {...prev, gameStatus: win.player === gameState.assignedPiece ? "GAME_WON" : "GAME_LOSE"}
      } 
      
      const tie = checkTie(prev.boardState);
      if(tie) {
        // console.log('Its a tie!')
        return {...prev, gameStatus: "GAME_TIE"}
      }

      // Step 3: No win or tie, update isCurrentlyMyMove to switch turns
      return {...prev, isCurrentlyMyMove: player === "ME" ? false : true};
    })
  }, [getPieceToPlace, setGameState])

  useEffect(() => {
    if(gameState.gameStatus === "GAME_WON" || gameState.gameStatus === "GAME_TIE" || gameState.gameStatus === "GAME_LOSE") {
      setGameModalState((prev) => ({...prev, isOpen: true, type: "overTheBoardRematch"}))
    }
  }, [gameState.gameStatus])

  return (
    <MainLayout headerName="Over the board">
      <div className="grid h-[var(--main-height)] place-items-center">
        <PlayerStatsBar playerName={"Player 2"} playerPiece={getPieceToPlace("OFFLINE_PLAYER")} timeRemaining="--:--" isMyMove={!gameState.isCurrentlyMyMove} />
        <TicTacToeBoard handlePlacePiece={handlePlacePiece} />
        <PlayerStatsBar playerName={"Player 1"} playerPiece={getPieceToPlace("ME")} timeRemaining="--:--" isMyMove={gameState.isCurrentlyMyMove} />
      </div>
      {gameModalState.isOpen && <GameModal/>}
      {authModalState.isOpen && <AuthModal/>}
    </MainLayout>
  )
}

export default PlayWithBotPage

