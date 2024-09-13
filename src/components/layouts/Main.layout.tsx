import Navbar from "../primitives/Navbar"
import Footer from "../primitives/Footer"

type Props = {
  headerName: string
  children: React.ReactNode
}

const MainLayout = ({headerName, children}: Props) => {
  return (
    <>
      <Navbar name={headerName}/>
      <div className="min-h-[var(--main-height)]">
        <div className="container">
          {children}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default MainLayout