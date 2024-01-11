import { useEffect, useState } from "react";
import OrderList from "./OrderList";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Order() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getOrder() {
      setIsLoading(true);
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + "/user/order",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.status === 401) {
        toast.error("Token expired");
        navigate("/login");
      }
      const resData = await response.json();
      if (resData.success) {
        setData(resData.orders);
      } else {
        toast.error(resData.message);
      }
      setIsLoading(false);
    }
    getOrder();
  }, []);
  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container mt-5">
      <div className="row g-1 justify-content-evenly">
        {data.length===0 && <h5 className="text-center">No orders found</h5>}
        {data.length>0 && data.map((item) => (
          <OrderList
            key={item._id.toString()}
            orders={item.orders.items}
            totalAmount={item.orders.totalAmount}
            id={item._id.toString()}
          />
        ))}
      </div>
    </div>
  );
}

export default Order;
