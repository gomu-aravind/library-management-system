import { Outlet } from "react-router-dom";
import Header from "../components/Home/Header";

function RootPage(){
    return <>
    <Header/>
    <Outlet/>
    </>
}

export default RootPage;