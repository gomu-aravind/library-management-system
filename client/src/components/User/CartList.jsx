import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import classes from './CartList.module.css'

function CartList(props){
    const dispatch=useDispatch()

    function addHandler(){
        dispatch(cartActions.addItemToCart({
            id:props.id,
            title:props.title,
            price:props.price,
            image:props.image
        }))
    }


    function removeHandler(){
        dispatch(cartActions.removeItemFromCart(props.id))
    }

    function deleteItem(id){
        dispatch(cartActions.deleteItemsInCart(id))
      }


    return <div className="row gy-3 mb-4">
    <div className="col-lg-5">
      <div className="me-lg-5">
        <div className="d-flex">
          <img
            src={props.image}
            className="border rounded me-3"
            style={{ width: "96px", height: "126px" }}
          />
          <div className="">
            <h5 >{props.title}</h5>
          </div>
        </div>
      </div>
    </div>
    <div className={`col-lg-2 col-sm-6 col-6 ${classes["button-group"]}`}>
          <button className={`btn ${classes.btn}`} onClick={removeHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-dash-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
            </svg>
          </button>
          <h6 className={classes.word}>{props.quantity}</h6>
          <button className={`btn ${classes.btn}`} onClick={addHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </button>
    </div>
      <div className="col-lg-2 mt-5">
        <span className="h6"> ₹{props.totalPrice}</span> <br />
        <small className="text-muted text-nowrap">
        ₹{props.price} / per item
        </small>
      </div>
    <div className="col-lg mt-5 col-sm-6 d-flex  justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
      <div className="float-md-end">
        <button
          href="#"
          className="btn btn-light border text-danger icon-hover-danger"
          onClick={()=>deleteItem(props.id)}
        >
          Remove
        </button>
      </div>
    </div>
  </div>
}

export default CartList;