import { RoutesInterface } from "../routes/interface";
import { PRIVATE_ROUTES } from "../routes/private.route";
import { PUBLIC_ROUTES } from "../routes/public.route";

 export function getRoutesBasedOnAuthentication(isLoggedIn: boolean): RoutesInterface[] {
  if(isLoggedIn) {
    return PRIVATE_ROUTES
  } else {
    return PUBLIC_ROUTES
  }
 }