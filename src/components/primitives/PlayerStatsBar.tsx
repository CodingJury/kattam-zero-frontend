import { cn } from "../../utils/functions/functions.cn";

type Props = {
  playerName: string, 
  playerPiece: "X" | "O", 
  timeRemaining: string, 
  isMyMove: boolean
}

const PlayerStatsBar = ({playerName, playerPiece, timeRemaining, isMyMove}: Props) => {
  return (
    <div className={cn(
      "w-full h-full flex justify-between items-center p-4 border-2 border-dashed",
      isMyMove && "bg-green-300"
    )}>
      <div className="text-2xl font-bold">
        Player: {playerName}
      </div>
      <div className="text-2xl font-bold">
        {playerPiece}
      </div>
      <div className="text-2xl">
        {timeRemaining}
      </div>
    </div>
  )
}

export default PlayerStatsBar;