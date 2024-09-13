import { atom } from "recoil"

export type GameModalType = 'botRematch' | 'overTheBoardRematch'
type GameModalState = {
  isOpen: boolean
  type: GameModalType
}

export const defaultGameModalState:Record<"CLOSE", GameModalState> = {
  CLOSE: {
    isOpen: false,
    type: "botRematch"
  }
}

export const gameModalAtom = atom<GameModalState>({
  key: 'gameModalState',
  default: defaultGameModalState.CLOSE
})