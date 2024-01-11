import { useSelector } from "react-redux"
import ErrorPage from "../components/Shared/ErrorPage"
import LoggedInErrorPage from "../components/Shared/LoggedInErrorPage"

function MainErrorPage(){
    const role=useSelector(state=>state.auth.role)
    return <>
    {role==='' && <ErrorPage/>}
    { role==='user' && <LoggedInErrorPage role={role}/>}
    { role==='admin' && <LoggedInErrorPage role={role}/>}
    </>
}


export default MainErrorPage