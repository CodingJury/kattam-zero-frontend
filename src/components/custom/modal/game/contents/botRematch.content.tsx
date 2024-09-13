import { useRecoilState, useSetRecoilState } from "recoil";
import { defaultGameModalState, gameModalAtom } from "../../../../../atoms/gameModalAtom";
import Button from "../../../../primitives/Button";
import { gameAtom, createGameState } from "../../../../../atoms/gameAtom";

const BotRematchContent = () => {
  const [gameState, setGameState] = useRecoilState(gameAtom)
  const setGameModalState = useSetRecoilState(gameModalAtom);
 
  const handleRematch = () => {
    setGameModalState((prev) => ({...prev, ...defaultGameModalState.CLOSE}))

    if(gameState.opponentType === "BOT") {
      // USING createGameState FUNCTION BECAUSE WE WANT TO RANDOMIZE THE STATE
      // not getting the same result from "defaultGameState.BOT"
      setGameState(createGameState("BOT")) 
    } else if(gameState.opponentType === "OFFLINE_PLAYER") {
      //USING createGameState FUNCTION BECAUSE WE WANT TO RANDOMIZE THE STATE
      // not getting the same result from "defaultGameState.OVER_THE_BOARD"
      setGameState(createGameState("OVER_THE_BOARD"))
    }
  }

  return (
    <div className="flex gap-1">
      <Button type="button" onClick={handleRematch}>Rematch</Button>
    </div>
  )
}

export default BotRematchContent