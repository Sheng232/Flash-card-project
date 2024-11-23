import {Link, Outlet} from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Layout(){
    return(
        <>
            <Navbar />
            <Outlet />
            <footer>
                Developed by Sheng Jian &#169;
            </footer>
        </>
    )
}