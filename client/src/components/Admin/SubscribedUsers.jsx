import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SubscriptionList from "./SubscriptionList";

function SubscribedUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getUser() {
      setIsLoading(true);
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + "/auth/subscribed-user",
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
        <table className="table table-primary">
          <thead>
            <tr>
              <th className="col">S.No</th>
              <th className="col">Name</th>
              <th className="col">Subscription Plan</th>
              <th className="col">Valid Till</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <SubscriptionList
                key={user._id}
                index={index + 1}
                name={user.name}
                plan={user.subscription.plan}
                expireyDate={user.subscription.expireyDate}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <>{content}</>;
}

export default SubscribedUsers;
