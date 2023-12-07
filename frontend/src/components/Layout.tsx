import Header from "./Header"
import {Outlet} from "react-router-dom";
// import Footer from "./Footer"

export default function Layout() {
    return (
        <div className={'bg-emerald-500 min-h-screen'}>
                <Header/>
            <main>
                <Outlet/>
            </main>
            {/*<Footer />*/}
        </div>
    )
}
