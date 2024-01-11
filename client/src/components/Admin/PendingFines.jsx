import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PendingList from "./PendingList";

function PendingFines() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getUser() {
      setIsLoading(true);
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + "/auth/pending-fines",
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
        setData(resData.users);
      } else {
        toast.error(resData.message);
      }
      setIsLoading(false);
    }
    getUser();
  }, []);
  let content;
  if (isLoading) {
    content = (
      <div className="container mt-5 text-center">
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (data.length > 0) {
    content = (
      <div className="container mt-5">
        <table className="table table-warning">
          <thead>
            <tr className="table-dark">
              <th className="col">S.No</th>
              <th className="col">Name</th>
              <th className="col">No of Books fined</th>
              <th className="col">Total Fine</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <PendingList
                key={item._id}
                index={index + 1}
                name={item.name}
                quantity={item.fine.items.length}
                totalAmount={item.fine.totalAmount}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <>{content}</>;
}

export default PendingFines;
