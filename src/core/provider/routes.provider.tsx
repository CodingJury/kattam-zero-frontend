import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { getRoutesBasedOnAuthentication } from "../helpers/routes.helper";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../atoms/userAtom";

const RoutesProvider = () => {
  const userState = useRecoilValue(userAtom)
  const routeActive = useMemo(() => getRoutesBasedOnAuthentication(userState.isLoggedIn), [userState.isLoggedIn]);
  // console.log({ routeActive });

  const router = createBrowserRouter(routeActive)

  return (
    <RouterProvider router={router}/>
  )
}

export default RoutesProvider