import { useEffect, useState } from "react";
import contactImg from "../../assets/person.png";
import { toast } from "react-toastify";
function Subscription() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPlan, setIsPlan] = useState(false);
  const [name, setName] = useState("");

  let formattedDate, updateDate;

  if (data.expireyDate) {
    formattedDate = new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    }).format(new Date(data.expireyDate));
  }
  if (data.discountUpdate) {
    updateDate = new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    }).format(new Date(data.discountUpdate));
  }

  useEffect(() => {
    async function getPlan() {
      setIsLoading(true);
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + "/user/plan",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if(response.status===401){
        toast.error('Token Expired')
      navigate('/login')
      }
      const resData = await response.json();
      
      setName(resData.name);
      if (resData.success) {
        setData(resData.subscription);
        setIsPlan(true);
      }
      setIsLoading(false);
    }
    getPlan();
  }, []);

  const proceedToSubscribe = async (item) => {
    const planData = { plan: item };
    const response = await fetch(
      import.meta.env.VITE_SERVER_URL + "/pay/subscribe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(planData),
        credentials: "include",
      }
    );
    if(response.status===401){
      toast.error('Token Expired')
      navigate('/login')
    }
    if (response.status === 500) return;

    const data = await response.json();

    toast.info("Redirect to payment Gateway...!");
    window.location.href = data.url;
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container pb-5 mt-5">
      <h4 className="text-center mb-3">Hi,{name}</h4>
      {isPlan && (
        <div className="row justify-content-center">
          <div className="card" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={contactImg}
                  className="img-fluid rounded-start"
                  style={{ objectFit: "contain" ,marginTop:"20px"}}
                  alt="Person Photo"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Plan: {data.plan}</h5>
                  <p className="card-text mb-0">
                    Plan-Validity: {formattedDate}
                  </p>
                  <p className="card-text mb-0">
                    Credits: {data.credits} 
                  </p>
                  <p className="card-text mb-0">
                    Coupons Available: {data.coupon.length}
                  </p>
                  {data.coupon.length > 0 &&
                    data.coupon.map((item, index) => (
                      <small className="badge text-bg-info me-2" key={index}>
                        {item}
                      </small>
                    ))}
                  <p className="card-text mb-0">Discount-Update: {updateDate}</p>
                </div>
              </div>
            </div>
          </div>
                  <h6 className="text-center">(Credits renew when they hit 0-50 during discount updates)</h6>
        </div>
      )}
      {!isPlan && (
        <>
          <div className="row">
            <div className="col-md-12 text-center">
              <h3 editable="inline" className="display-4 mb-3">
                <b>Choose your Plan</b>
              </h3>
            </div>
          </div>
          <div className="row g-4 mt-3 g-xxl-5">
            <div className="col-lg-4">
              <div className="lc-block card  p-4 py-xl-6 shadow border-0">
                <div className="card-body d-flex flex-column">
                  <div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p className="opacity-50 mb-0 ls-3">Lite Reader</p>
                      </div>
                    </div>
                    <div className="lc-block mb-4">
                      <h3
                        editable="inline"
                        className="fw-bolder d-inline rfs-30 ls-n2"
                      >
                        ₹2000
                      </h3>
                      <span className="opacity-50" editable="inline">
                        / year
                      </span>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p>Initial Deposit:₹500&nbsp;</p>
                      </div>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p>Credits:₹200</p>
                      </div>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p>Access to Business Books are denied</p>
                      </div>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p>Borrowing Period: 1month</p>
                      </div>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p>Discount Coupon:1/month</p>
                      </div>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p className="text-decoration-line-through">
                          Free Delivery
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="lc-block d-grid">
                    <button
                      className="btn btn-primary btn-lg"
                      role="button"
                      onClick={() => proceedToSubscribe("lite")}
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 ">
              <div className="lc-block card  p-4 py-xl-6 shadow border-0 bg-dark text-light">
                <div className="card-body d-flex flex-column">
                  <div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p className="opacity-50 mb-0 ls-3">Moderate Reader</p>
                      </div>
                    </div>
                    <div className="lc-block mb-4">
                      <h3
                        editable="inline"
                        className="fw-bolder d-inline rfs-30 ls-n2"
                      >
                        ₹3000
                      </h3>
                      <span className="opacity-50" editable="inline">
                        / year
                      </span>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p>Initial Deposit:₹500&nbsp;</p>
                      </div>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p>Credits:₹300</p>
                      </div>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p>Unlimited access</p>
                      </div>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p>Borrowing Period: 2months</p>
                      </div>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p>Discount Coupon: 2/month</p>
                      </div>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p className="text-decoration-line-through">
                          Free Delivery
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="lc-block d-grid">
                    <button
                      className="btn btn-primary btn-lg"
                      role="button"
                      onClick={() => proceedToSubscribe("moderate")}
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="lc-block card h-100 p-4 py-xl-6 shadow border-0">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p className="opacity-50 mb-0 ls-3">Bookworm</p>
                      </div>
                    </div>
                    <div className="lc-block mb-4">
                      <h3
                        editable="inline"
                        className="fw-bolder d-inline rfs-30 ls-n2"
                      >
                        ₹5000
                      </h3>
                      <span className="opacity-50" editable="inline">
                        / year
                      </span>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p>Initial Deposit:₹500&nbsp;</p>
                      </div>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p>Credits:₹500</p>
                      </div>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p>Unlimited access</p>
                      </div>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p>Borrowing Period: 3months</p>
                      </div>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p>Discount Coupn: 3/month</p>
                      </div>
                    </div>
                    <div className="lc-block mb-2">
                      <div editable="rich">
                        <p>Free Delivery</p>
                      </div>
                    </div>
                  </div>
                  <div className="lc-block d-grid">
                    <button
                      className="btn btn-primary btn-lg"
                      role="button"
                      onClick={() => proceedToSubscribe("bookworm")}
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Subscription;
