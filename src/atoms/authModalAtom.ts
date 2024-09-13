import { atom } from "recoil"

export type AuthModalType = 'login' | 'register' | 'forgotPassword'
type AuthModalState = {
  isOpen: boolean
  type: AuthModalType
}

export const defaultAuthModalState:Record<"CLOSE", AuthModalState> = {
  CLOSE: {
    isOpen: false,
    type: "login"
  }
}

export const authModalAtom = atom<AuthModalState>({
  key: 'authModalState',
  default: defaultAuthModalState.CLOSE
})