import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ReturnList(props) {
    const navigate=useNavigate()
  const date = new Date(props.returnDate);
  const returnDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  async function returnHandler(){
    const response=await fetch(import.meta.env.VITE_SERVER_URL+`/user/return/${props.id}`,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json'
        }
        ,
        credentials:"include"
    })
    const resData=await response.json()
    if(resData.success){
        toast.success(resData.message)
        navigate('/user')
    }else{
        toast.error(resData.message)
        navigate('/user/fine')
    }
  }
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.title}</td>
      <td>{props.author}</td>
      <td>{returnDate}</td>
      <td>
        <button className="btn btn-success" onClick={returnHandler}>Return</button>
      </td>
    </tr>
  );
}

export default ReturnList;
