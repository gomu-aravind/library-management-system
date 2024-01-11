import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactDOM from "react-dom";

function SuccessCart() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true); // State to control modal visibility
  const items = JSON.parse(localStorage.getItem("cart"));
  const totalAmount = JSON.parse(localStorage.getItem("totalAmount"));
  const [data, setData] = useState({
    items: items,
    totalAmount: totalAmount,
  });

  const createOrder = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + "/pay/success-cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );
      if (response.status === 401) {
        toast.error("Token Expired");
        navigate("/login");
      }
      const resData = await response.json();
      

      if (!resData.success) {
        toast.error(resData.message);
      } else {
        localStorage.removeItem("cart");
        localStorage.removeItem("totalQuantity");
        localStorage.removeItem("totalAmount");
      }

      setTimeout(() => {
        setShowModal(false)
        navigate("/user/order");
      }, 2000);
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle errors (e.g., display an error message to the user)
    }
  };

  const handleModalClick = () => {
    createOrder();
  };

  const modalRoot = document.getElementById("overlay-modal"); // Get the modal root element

  return (
    <>
      {showModal &&
        ReactDOM.createPortal(
          <div
            className="modal"
            tabIndex="-1"
            style={{
              display: "block",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              position: "fixed",
              top: "0",
              bottom: "0",
              left: "0",
              right: "0",
            }}
          >
            <div className="modal-dialog mt-5">
              <div className="modal-content bg-succes">
                <div className="card bg-success  align-items-center">
                  <div className="card-body">
                    <h5 className="card-title text-light text-center">
                      Payment Successful
                    </h5>
                    <p className="text-light mt-2 mb-0">Don't close the window</p>
                  </div>
                  <div className="card-body">
                    <button
                      className="btn btn-light"
                      onClick={handleModalClick}
                    >
                      Proceed to Orders List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          modalRoot
        )}
    </>
  );
}

export default SuccessCart;
