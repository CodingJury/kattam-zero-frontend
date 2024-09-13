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
import { minmaxBotAdv } from "../../utils/bot/minmaxBotAdvance"
import PlayerStatsBar from "../../components/primitives/PlayerStatsBar"

const PlayWithBotPage = () => {
  const authModalState = useRecoilValue(authModalAtom)
  const [gameModalState, setGameModalState] = useRecoilState(gameModalAtom)
  const [gameState, setGameState] = useRecoilState(gameAtom)

  useEffect(() => {
    setGameModalState((prev) => ({...prev, ...defaultGameModalState.CLOSE}))
    setGameState((prev) => ({...prev, ...defaultGameState.BOT}))
  }, [])

  const getPieceToPlace = useCallback((player: "ME" | "BOT") => {
    return (player === "ME") ? (gameState.assignedPiece as "X" | "O") : (gameState.assignedPiece === "X" ? "O" : "X");
  }, [gameState.assignedPiece])

  const handlePlacePiece = (index: number) => {
    if(gameState.gameStatus === "IN_PROGRESS") {
      const pieceInClickedPlace = gameState.boardState[index];
      if (pieceInClickedPlace !== "X" && pieceInClickedPlace !== "O") {
        if(gameState.isCurrentlyMyMove) {
          turnClick(index, "ME")
        } else {
          console.warn("NOT YOUR MOVE");
          //Optional: Handle logic for pre-move of feedback to user
        }
      } else {
        console.error(`"${pieceInClickedPlace}" => piece is already placed at this position`);
      }
    } else if(gameState.gameStatus === "GAME_WON" || gameState.gameStatus === "GAME_TIE" || gameState.gameStatus === "GAME_LOSE") {
      setGameModalState((prev) => ({...prev, isOpen: true, type: "botRematch"}))
    }
  };

  const turnClick = useCallback((index: number, player: "ME" | "BOT") => {
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
    if(gameState.opponentType === "BOT" && !gameState.isCurrentlyMyMove && gameState.gameStatus === "IN_PROGRESS") {
      const botMove = setTimeout(()=>{
        // const botPlayingMoveAtIndex = dumbBot(gameState.boardState);
        // const botPlayingMoveAtIndex = minmaxBot(gameState.boardState, getPieceToPlace("BOT"));
        const botPlayingMoveAtIndex = minmaxBotAdv(gameState.boardState, getPieceToPlace("BOT"));
        turnClick(botPlayingMoveAtIndex, "BOT")
      }, 1000)

      return () => clearTimeout(botMove) //Cleanup
    }
  }, [gameState.opponentType, gameState.isCurrentlyMyMove, gameState.gameStatus, gameState.boardState, getPieceToPlace, turnClick])

  useEffect(() => {
    if(gameState.gameStatus === "GAME_WON" || gameState.gameStatus === "GAME_TIE" || gameState.gameStatus === "GAME_LOSE") {
      setGameModalState((prev) => ({...prev, isOpen: true, type: "botRematch"}))
    }
  }, [gameState.gameStatus])

  return (
    <MainLayout headerName="Play with bot">
      <div className="grid h-[var(--main-height)] place-items-center">
        <PlayerStatsBar playerName={"BOT"} playerPiece={getPieceToPlace("BOT")} timeRemaining="--:--" isMyMove={!gameState.isCurrentlyMyMove} />
        <TicTacToeBoard handlePlacePiece={handlePlacePiece} />
        <PlayerStatsBar playerName={"You"} playerPiece={getPieceToPlace("ME")} timeRemaining="--:--" isMyMove={gameState.isCurrentlyMyMove} />
      </div>
      {gameModalState.isOpen && <GameModal/>}
      {authModalState.isOpen && <AuthModal/>}
    </MainLayout>
  )
}

export default PlayWithBotPage

