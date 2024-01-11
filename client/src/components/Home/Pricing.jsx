import classes from "./Pricing.module.css";
import { Link } from "react-router-dom";

function Pricing() {
  return (
    <section id="pricing" className={`py-3 py-md-5 ${classes.pricing}`}>
      <h6 editable="inline" className={classes.price}>OUR PRICING PLAN</h6>
      <div className="container pb-5 mb-3">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 editable="inline" className="display-2 mb-3">
              <b>Find the Right Tier</b>
            </h2>
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
                      <p>
                        Initial Deposit:₹500&nbsp;
                      </p>
                    </div>
                  </div>
                  <div className="lc-block mb-2">
                    <div editable="rich">
                      <p>
                        Credits:₹200
                      </p>
                    </div>
                  </div>
                  <div className="lc-block mb-2">
                    <div editable="rich">
                      <p>
                        Access to Business Books are denied
                      </p>
                    </div>
                  </div>
                  <div className="lc-block mb-2">
                    <div editable="rich">
                      <p>
                      Borrowing Period: 1month
                      </p>
                    </div>
                  </div>
                  <div className="lc-block mb-2">
                    <div editable="rich">
                      <p>
                      Discount Coupon:1/month
                      </p>
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
                  <Link className="btn btn-primary btn-lg" to="/login" role="button">
                    Subscribe
                  </Link>
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
                      <p>
                        Initial Deposit:₹500&nbsp;
                      </p>
                    </div>
                  </div>
                  <div className="lc-block mb-2">
                    <div editable="rich">
                      <p>
                        Credits:₹300
                      </p>
                    </div>
                  </div>
                  <div className="lc-block mb-2">
                    <div editable="rich">
                      <p>
                        Unlimited access 
                      </p>
                    </div>
                  </div>
                  <div className="lc-block mb-2">
                    <div editable="rich">
                      <p>
                      Borrowing Period: 2months
                      </p>
                    </div>
                  </div>
                  <div className="lc-block mb-2">
                    <div editable="rich">
                      <p>
                      Discount Coupon: 2/month
                      </p>
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
                  <Link className="btn btn-primary btn-lg" to="/login" role="button">
                    Subscribe
                  </Link>
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
                      <p>
                        Initial Deposit:₹500&nbsp;
                      </p>
                    </div>
                  </div>
                  <div className="lc-block mb-2">
                    <div editable="rich">
                      <p>
                        Credits:₹500
                      </p>
                    </div>
                  </div>
                  <div className="lc-block mb-2">
                    <div editable="rich">
                      <p>
                        Unlimited access 
                      </p>
                    </div>
                  </div>
                  <div className="lc-block mb-2">
                    <div editable="rich">
                      <p>
                        Borrowing Period: 3months
                      </p>
                    </div>
                  </div>
                  <div className="lc-block mb-2">
                    <div editable="rich">
                      <p>
                        Discount Coupn: 3/month
                      </p>
                    </div>
                  </div>
                  <div className="lc-block mb-2">
                    <div editable="rich">
                      <p >
                        Free Delivery
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lc-block d-grid">
                  <Link className="btn btn-primary btn-lg"  to="/login" role="button">
                    Subscribe
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
