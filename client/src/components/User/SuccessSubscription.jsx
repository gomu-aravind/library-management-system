import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";

function SuccessSubscription() {
  const navigate = useNavigate();

  const createSubscription = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + "/pay/success-subscribe",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 401) {
        toast.error("Token Expired");
        navigate("/login");
      }
      const resData = await response.json();
      
      if (resData.success) {
        navigate("/user/purchase");
      } else {
        toast.error(resData.message);
      }
      navigate("/user/purchase");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  useEffect(() => {
    createSubscription();
  }, [navigate]);

  const modalRoot = document.getElementById("overlay-modal");

  return (
    <>
      {ReactDOM.createPortal(
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
                </div>
                <div className="card-body">
                  <p className="text-light text-center">
                    Redirecting to Subscribe Page...
                  </p>
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

export default SuccessSubscription;
