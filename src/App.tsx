import { Suspense } from "react";
import FullScreenLoader from "./components/primitives/FullScreenLoader";
import { RecoilRoot } from "recoil";
import RoutesProvider from "./core/provider/routes.provider";

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<FullScreenLoader open={true} />}>
        {/* <RouterProvider router={router}/> */}
        <RoutesProvider/>
      </Suspense>
    </RecoilRoot>
  )
}

export default App 
