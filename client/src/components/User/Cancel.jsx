import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cancel() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/user");
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);
  return (
    <div className="container mt-5">
      <div className="row align-items-center justify-content-center">
        <div
          className="card alert alert-danger text-center"
          role="alert"
          style={{ width: "30rem" }}
        >
          <h4>Something went wrong</h4>
          <p>Redirecting to HomePage...</p>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
