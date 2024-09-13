import { lazy } from "react";
import { RoutesInterface } from "./interface";
import { DASHBOARD, OVER_THE_BOARD, PLAY_WITH_BOT } from "../constants/routes.constant";

const DashboardPage = lazy(() => import("../../pages/dashboard/dashboard.page"))
const PlayWithBotPage = lazy(() => import("../../pages/playWithBot/playWithBot.page"))
const OverTheBoardPage = lazy(() => import("../../pages/overTheBoard/overTheBoard.page"))

export const PUBLIC_ROUTES: RoutesInterface[] = [
  { path: DASHBOARD, element: <DashboardPage/> },
  { path: PLAY_WITH_BOT, element: <PlayWithBotPage/> },
  { path: OVER_THE_BOARD, element: <OverTheBoardPage/> }
]