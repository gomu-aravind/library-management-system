import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import classes from './Card.module.css'
import {useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

function Card(props) {
  const dispatch=useDispatch()
    const userHandler=async (text)=>{
      const data={
        bookId:props.id
      }
        if(text==='Borrow'){
            const resData=await fetch(import.meta.env.VITE_SERVER_URL+'/user/borrow',{
              method:'POST',
              body:JSON.stringify(data),
              headers:{
                  'Content-Type':'application/json',
              },
              credentials:"include"
            })
            const result=await resData.json()

            if (result.success) {
              toast.success(result.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
              });
            } else {
              toast.error(result.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
              });
            }
        }
        if(text==='Buy'){
          const buyData={
            id:props.id,
            image:props.image,
            price:props.price,
            title:props.title
          }
          dispatch(cartActions.addItemToCart({
            id:buyData.id,
            image:buyData.image,
            price:buyData.price,
            title:buyData.title
          }))        
          toast.success('Book is added to the cart')
          
        }
    }

    const deleteHandler=async()=>{
      const response=await fetch(import.meta.env.VITE_SERVER_URL+`/book/delete/${props.id}`,{
        method:'DELETE',
        credentials:"include"
      })
      const resData=await response.json()
      if(resData.success){
        toast.success(resData.message)
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    }
  return (
    <div className="card" style={{ width: "20rem" }}>
      <img src={props.image} className={`card-img-top ${classes.imgHeight}`} alt={props.title} />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <Link
          className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
          to={`book-details/${props.id}`}
        >
          Click to see Details
        </Link>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Cost: ₹{props.price}</li>
        <li className="list-group-item">Author: {props.author}</li>
      </ul>
      <div className="card-body">
        {props.content.role==='user' &&<button className={props.content.color} onClick={()=>userHandler(props.content.text)}>{props.content.text}</button>}
        {props.content.role==='admin'&& <>
        <button type="button" className={props.content.color} onClick={deleteHandler}>{props.content.textDelete}</button>
        <Link to={`edit/${props.id}`} type="button" className={props.content.color}>{props.content.textEdit}</Link>
        </>}
      </div>
    </div>
  );
}

export default Card;
