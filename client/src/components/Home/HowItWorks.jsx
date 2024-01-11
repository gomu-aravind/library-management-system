import loginImg from '../../assets/login.jpg'
import exploreImg from '../../assets/explore.jpg'
import pricingImg from '../../assets/pricing.jpg'
import buyImg from '../../assets/buyorborrow.jpg'
import classes from './HowItWorks.module.css'

function HowItWorks() {
  return (
    <section id="how" className={`py-3 py-md-5 ${classes.how}`}>
        <h6 className={`text-center ${classes['how-head']}`}>HOW IT WORKS</h6>
      <div className="container" id={classes.heading}>
        <div className="row mb-4 align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="lc-block text-center">
              <img
                className="img-fluid "
                src={loginImg}
                width="400"
                height="400"
                loading="lazy"
              />
            </div>
            </div>
            <div className="col-lg-6 p-lg-6">
              <div className="lc-block mb-5">
                <div editable="rich">
                  <h2 className="display-6 fw-bold">Get Started</h2>

                  <p className="lead">
                    <br />
                    Login to the readersnest to start your journey
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4 align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0 order-lg-1">
              <div className="lc-block text-center">
                <img
                  className="img-fluid"
                  src={exploreImg}
                  width="400"
                  height="400"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-lg-6 p-lg-6">
              <div className="lc-block mb-5">
                <div editable="rich">
                  <h2 className="display-6 fw-bold">Explore your way</h2>

                  <p className="lead">
                    <br />
                    Go through the list of books which suits your style
                  </p>
                </div>
              </div>
            </div>
          </div>
        <div className="row mb-4 align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="lc-block text-center">
              <img
                className="img-fluid "
                src={pricingImg}
                width="400"
                height="400"
                loading="lazy"
              />
            </div>
            </div>
            <div className="col-lg-6 p-lg-6">
              <div className="lc-block mb-5">
                <div editable="rich">
                  <h2 className="display-6 fw-bold">Subscription</h2>

                  <p className="lead">
                    <br />
                    Subscribe to get your favourite books at discounted price
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4 align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0 order-lg-1">
              <div className="lc-block text-center">
                <img
                  className="img-fluid"
                  src={buyImg}
                  width="400"
                  height="400"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-lg-6 p-lg-6">
              <div className="lc-block mb-5">
                <div editable="rich">
                  <h2 className="display-6 fw-bold">Buy or Borrow</h2>

                  <p className="lead">
                    <br />
                    Either buy or borrow the books on your need
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}

export default HowItWorks;
