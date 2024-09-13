import { useRecoilState, useRecoilValue } from "recoil"
import MainLayout from "../../components/layouts/Main.layout"
import { authModalAtom } from "../../atoms/authModalAtom"
import AuthModal from "../../components/custom/modal/auth/AuthModal"
import { useNavigate } from "react-router-dom"
import { userAtom } from "../../atoms/userAtom"
import { ALL_GAMES, OVER_THE_BOARD, PLAY_WITH_BOT, PROFILE } from "../../core/constants/routes.constant"

const DashboardPage = () => {
  const navigate = useNavigate()
  const [authModalState, setAuthModalState] = useRecoilState(authModalAtom)
  const userState = useRecoilValue(userAtom)
  
  return (
    <MainLayout headerName="Dashboard">
      <div className="flex gap-8">
        <button onClick={()=>{userState.isLoggedIn ? navigate(PROFILE) : setAuthModalState((prev) => ({...prev, isOpen: true, type: "login"}))}}>Profile</button>
        <button onClick={()=>{userState.isLoggedIn ? navigate(ALL_GAMES) : setAuthModalState((prev) => ({...prev, isOpen: true, type: "login"}))}}>All Games</button>
        <button onClick={()=>{ navigate(PLAY_WITH_BOT)}}>Play With Bot</button>
        <button onClick={()=>{ navigate(OVER_THE_BOARD)}}>Over The Board</button>
      </div>
      {authModalState.isOpen && <AuthModal/>}
    </MainLayout>
  )
}

export default DashboardPage