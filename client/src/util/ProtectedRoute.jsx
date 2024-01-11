import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";
import RootPage from "../pages/RootPage";

function ProtectedRoute(props){
    const role=useSelector((state)=>state.auth.role)
    return role===props.role?<RootPage/>:<Navigate to="/login"/>
}

export default ProtectedRoute;