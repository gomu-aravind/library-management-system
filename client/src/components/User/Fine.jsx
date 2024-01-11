import { useEffect, useState } from "react";
import FineList from "./FineList";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Fine() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [credits, setCredits] = useState(0);
  useEffect(() => {
    async function getFineData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          import.meta.env.VITE_SERVER_URL + "/user/fine",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status === 401) {
          toast.error("Token Expired");
          navigate("/login");
        }
        const finalData = await response.json();
        if (finalData.success) {
          setData(finalData.fineData);
          setTotal(finalData.fineTotal);
          setCredits(finalData.credits);
        }
      } catch (error) {}
      setIsLoading(false);
    }
    getFineData();
  }, []);
  

  const fineHandler = async () => {
    const isConfirm = confirm("Are you returning the fined book ?");
    if (isConfirm) {
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + "/user/fine",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ totalAmount: total }),
          credentials: "include",
        }
      );

      if (response.status === 401) {
        toast.error('Token Expired')
      navigate('/login')
      }
      const resData = await response.json();
      if (resData.success) {
        toast.success(resData.message);
        setData([]);
      } else {
        toast.error(resData.message);
      }
    }
  };

  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!isLoading && data.length === 0 && (
        <div className="container mt-5">
          <div className="text-center">
            <h5>No Fines pending</h5>
          </div>
        </div>
      )}
      {!isLoading && data.length > 0 && (
        <div className="container mt-5">
          <h5 className="text-center mb-4">
            Credit's Left:{" "}
            {credits === 0
              ? `${credits} (Credits will update on start of the month once it used completely)`
              : credits}{" "}
          </h5>
          <table className="table table-danger">
            <thead>
              <tr>
                <th className="col-3">S.No</th>
                <th className="col-3">Book</th>
                <th className="col-3">Fine Amount</th>
                <th className="col-3">FineStartDate</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <FineList
                  key={item.id}
                  index={index + 1}
                  title={item.title}
                  fineAmount={item.fineAmount}
                  fineDate={item.fineDate}
                />
              ))}
            </tbody>
          </table>
          <div className="text-end">
            <h6>Total Amount: {total}</h6>
            <button className="btn btn-danger" onClick={fineHandler}>
              Use Credits
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Fine;
