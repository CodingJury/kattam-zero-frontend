import { atom } from "recoil"

type UserState = {
  socket: string
} & ({
  isLoggedIn: false,
  type: "GUEST"
} | {
  isLoggedIn: true,
  isEmailVerified: boolean,
  type: "USER"
  name: string
})

export const defaultUserState:Record<"USER" | "GUEST", UserState> = {
  USER: {
    socket: "",
    isLoggedIn: true,
    isEmailVerified: false,
    type: "USER",
    name: "Akash Patel"
  },
  GUEST: {
    socket: "",
    isLoggedIn: false,
    type: "GUEST"
  }
}

export const userAtom = atom<UserState>({
  key: 'userState',
  default: defaultUserState.GUEST
})
