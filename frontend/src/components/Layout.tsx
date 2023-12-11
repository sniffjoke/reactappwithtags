import Header from "./Header"
import {Outlet} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from "react-toastify";
// import Footer from "./Footer"

export default function Layout() {
    return (
        <div className={'bg-emerald-500 min-h-screen'}>
            <ToastContainer />
                <Header/>
            <main>
                <Outlet/>
            </main>
            {/*<Footer />*/}
        </div>
    )
}
