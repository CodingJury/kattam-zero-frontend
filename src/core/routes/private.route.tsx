import { lazy } from "react";
import { ALL_GAMES, PROFILE } from "../constants/routes.constant";
import { RoutesInterface } from "./interface";
import { PUBLIC_ROUTES } from "./public.route";

const ProfilePage = lazy(() => import("../../pages/profile/profile.page"))
const AllGamesPage = lazy(() => import("../../pages/allGames/allGames.page"))

export const PRIVATE_ROUTES: RoutesInterface[] = [
  ...PUBLIC_ROUTES,
  { path: PROFILE, element: <ProfilePage/> },
  { path: ALL_GAMES, element: <AllGamesPage/> }
]