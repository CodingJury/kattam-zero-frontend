import { useRecoilState } from "recoil"
import { authModalAtom, defaultAuthModalState } from "../../../../atoms/authModalAtom"
import { useEffect, useRef } from "react";
import LoginContent from "./contents/login.content";
import RegisterContent from "./contents/register.content";
import ForgotPasswordContent from "./contents/forgotPassword.content";


const AuthModal = () => {
  const [authModalState, setAuthModalState] = useRecoilState(authModalAtom)
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  useEffect(() => {
    if(authModalState.isOpen) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [authModalState.isOpen])

  const handleClose = () => {
    setAuthModalState((prev) => ({...prev, ...defaultAuthModalState.CLOSE}))
  }

  return (
    <dialog className="rounded-lg p-3 w-96" ref={dialogRef} onClose={handleClose}>
      <div className="flex justify-between">
        <div className="text-xl font-bold pb-2">
          {authModalState.type == "login" && "Login"}
          {authModalState.type == "register" && "Create new account"}
          {authModalState.type == "forgotPassword" && "Forgot Password"}
        </div>
        <button className="bg-white border px-3 hover:invert" onClick={handleClose}>X</button>
      </div>
      {authModalState.type == "login" && <LoginContent/>}
      {authModalState.type == "register" && <RegisterContent/>}
      {authModalState.type == "forgotPassword" && <ForgotPasswordContent/>}
    </dialog>
  )
}

export default AuthModal