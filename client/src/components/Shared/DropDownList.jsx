import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function DropDownList({categories}){
  const role=useSelector(state=>state.auth.role)
    return <li>
    {categories===''?<Link className="dropdown-item" to={`/${role}`}>
      All
    </Link>:<Link className="dropdown-item" to={`?genre=${categories}`}>
      {categories}
    </Link>}
  </li>
  
}

export default DropDownList;