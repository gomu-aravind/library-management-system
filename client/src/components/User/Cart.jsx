import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import CartList from "./CartList";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


function Cart() {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 const [isFetched,setIsFetched]=useState(false)
 const [freeDelivery,setFreeDelivery]=useState(false)
 const [discount,setDiscount]=useState(0)

 const dispatch = useDispatch();
 const items = useSelector((state) => state.cart.items);
 const totalQuantity = useSelector((state) => state.cart.totalQuantity);
 const totalAmount = useSelector((state) => state.cart.totalAmount);
 const data = {
   items: JSON.parse(localStorage.getItem("cart")),
   totalAmount: JSON.parse(localStorage.getItem("totalAmount")),
   totalQuantity: JSON.parse(localStorage.getItem("totalQuantity")),
 };

 if (items.length === 0 || totalQuantity === 0 || totalAmount === 0) {
   if (data?.items !== null) {
     if (
       data.length !== 0 &&
       data.totalQuantity !== 0 &&
       data.totalAmount !== 0
     ) {
       dispatch(cartActions.initializeCart(data));
     }
   }
 }

 useEffect(() => {
    async function getCoupons() {
      setIsLoading(true);
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + "/user/coupons",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if(response.status===401){
        toast.error('Token Expired')
      navigate('/login')
      }
      const couponData = await response.json();
      if (couponData.success) {
        setCoupons(couponData.coupons);
      } 
      if(couponData.plan!==null){
        if(couponData.plan==='BOOKWORM'){
          setFreeDelivery(true)
        }
      }
      setIsLoading(false);
      setIsFetched(true)
    }
    if(totalQuantity>0&&!isFetched){
      getCoupons();
    }
  }, [totalQuantity,isFetched]);
  
  const useCouponHandler=async (coupon)=>{
    const isConfirm=confirm('Are you sure you want to use this coupon?Once used it cannot be claimed')
    if(isConfirm){
        const response=await fetch(import.meta.env.VITE_SERVER_URL + "/user/use-coupons",{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({appliedCoupon:coupon}),
          credentials:"include"
        })
        if(response.status===401){
          toast.error('Token Expired')
      navigate('/login')
        }
        const resData=await response.json()
        if(resData.success){
          toast.success(resData.message)
          const updatedTotal=totalAmount-(totalAmount*resData.discount).toFixed(2)
          setDiscount(resData.discount)
          dispatch(cartActions.setTotalAmount({updatedTotal:updatedTotal}))
          const updatedCoupon=coupons.filter(item=>item!==coupon)
          setCoupons(updatedCoupon)
        }else{
          toast.error(resData.message)
        }
    }
  }
  const checkoutHandler=async ()=>{
    const checkoutData={
      items:items,
    }
    const response=await fetch(import.meta.env.VITE_SERVER_URL+'/pay/cart',{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(checkoutData),
      credentials:"include"
    })
    if(response.status===401){
      toast.error('Token Expired')
      navigate('/login')
    }
    if(response.status === 500) return;

    const data=await response.json()

    toast.info("Redirect to payment Gateway...!")
    window.location.href = data.url;
  }

  let content;
  if (items.length > 0) {
    content = (
      <div className="card border shadow-0">
        <div className="m-4">
          <h4 className="card-title mb-4">
            Your shopping cart :{totalQuantity}
          </h4>
          {items.map((item) => (
            <CartList
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              quantity={item.quantity}
              totalAmount={totalAmount}
              totalPrice={item.totalPrice}
            />
          ))}
        </div>
        <div className="col">
          <div className="card mb-3 border shadow-0">
            <div className="card-body">
              <h6>Have a coupon</h6>
              {coupons.length===0 && isFetched && <h5>No Coupons Avilable</h5>}
              {isLoading && (
                <div className="spinner-grow text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              {coupons.length > 0 &&
                coupons.map((coupon, index) => (
                  <button className="btn badge bg-primary me-2" key={index} onClick={()=>useCouponHandler(coupon)}>
                    <span className="">{coupon}</span>
                  </button>
                ))}
              {/* <button className="btn badge bg-primary me-2">
                <span className="">Primary</span>
              </button>
              <button className="btn badge bg-primary me-2">
                <span className="">Primary</span>
              </button>
              <button className="btn badge bg-primary me-2">
                <span className="">Primary</span>
              </button> */}
            </div>
          </div>
          <div className="card shadow-0 border">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <p className="mb-2">Total price:</p>
                <p className="mb-2"> ₹{totalAmount}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="mb-2">Delivery: </p>
                {freeDelivery?<p className="mb-2 text-success">₹0</p>:<p className="mb-2 text-success">₹50</p>}
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <p className="mb-2">Total price:</p>
                <p className="mb-2 fw-bold"> ₹{freeDelivery?totalAmount+0:totalAmount+50}</p>
              </div>

              <div className="mt-3">
                <button
                  onClick={checkoutHandler}
                  className="btn btn-success w-100 shadow-0 mb-2"
                >
                  Proceed to checkout
                </button>
                <Link to="/user" className="btn btn-light w-100 border mt-2">
                  Back to shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <section className="my-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            {items.length == 0 && (
              <>
                <h2 className="text-center">Your Shopping Cart is Empty.</h2>
                <p className="text-center">Please purchase some products</p>
              </>
            )}
            {items.length > 0 && content}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
