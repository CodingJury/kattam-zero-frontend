import { Link, useNavigate } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { authModalAtom } from "../../atoms/authModalAtom"
import { userAtom, defaultUserState } from "../../atoms/userAtom"
import DropdownMenu from "./DropdownMenu"
import { DASHBOARD } from "../../core/constants/routes.constant"

type Props = {
  name: string
}

const Navbar = ({name}: Props) => {
  const navigate = useNavigate();
  const setAuthModalState = useSetRecoilState(authModalAtom);
  const userState = useRecoilValue(userAtom)
  const setUserState = useSetRecoilState(userAtom);

  const handleClick = () => {
    setAuthModalState((prev) => ({...prev, isOpen: true, type: "login"}))
  }

  const handleLogout = () => {
    console.log("SIMULATING LOGGING OUT")

    setUserState((prev) => ({...prev, ...defaultUserState.GUEST}))
    navigate(DASHBOARD)

    console.log('SUCCESSFULLY LOGOUT')
  }

  return (
    <div className="bg-blue-500">
      <div className="container">
        <div className="flex justify-between items-center h-[var(--header-height)]">
          <Link to={DASHBOARD} className="text-2xl cursor-pointer">{name}</Link>
          <div>
            {userState.isLoggedIn ? (
              <DropdownMenu heading={userState.name} items={[
                {label: "Dashboard", href: DASHBOARD}, 
                {label: "Logout", onClick: handleLogout}
              ]}/>
            ) : (
              <button onClick={handleClick}>Login</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar