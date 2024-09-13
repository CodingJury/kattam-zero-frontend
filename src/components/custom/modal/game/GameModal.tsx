import { useRecoilState, useRecoilValue } from "recoil"
import { gameModalAtom, defaultGameModalState } from "../../../../atoms/gameModalAtom"
import { useEffect, useRef } from "react";
import BotRematchContent from "./contents/botRematch.content";
import { gameAtom } from "../../../../atoms/gameAtom";

const GameModal = () => {
  const [gameModalState, setGameModalState] = useRecoilState(gameModalAtom)
  const gameState = useRecoilValue(gameAtom)
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  useEffect(() => {
    if(gameModalState.isOpen) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [gameModalState.isOpen])

  const handleClose = () => {
    setGameModalState((prev) => ({...prev, ...defaultGameModalState.CLOSE}))
  }

  return (
    <dialog className="rounded-lg p-3 w-96" ref={dialogRef} onClose={handleClose}>
      <div className="flex justify-between pb-2">
        <div className="text-xl font-bold pb-2">
          {(gameModalState.type == "botRematch" && gameState.gameStatus==="GAME_WON") && "You won the game"}
          {(gameModalState.type == "botRematch" && gameState.gameStatus==="GAME_TIE") && "Game is tie"}
          {(gameModalState.type == "botRematch" && gameState.gameStatus==="GAME_LOSE") && "You lost the game"}
          {(gameModalState.type == "overTheBoardRematch" && gameState.gameStatus==="GAME_WON") && "Player 1 won the game"}
          {(gameModalState.type == "overTheBoardRematch" && gameState.gameStatus==="GAME_TIE") && "Game is tie"}
          {(gameModalState.type == "overTheBoardRematch" && gameState.gameStatus==="GAME_LOSE") && "Player 2 won the game"}
        </div>
        <button className="bg-white border px-3 hover:invert" onClick={handleClose}>X</button>
      </div>
      {(gameModalState.type === "botRematch" || gameModalState.type === "overTheBoardRematch") && <BotRematchContent/>}
    </dialog>
  )
}

export default GameModal