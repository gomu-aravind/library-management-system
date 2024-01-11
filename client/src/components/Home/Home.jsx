import libraryImg from "../../assets/library.jpg";
import classes from "./Home.module.css";
import { Link } from "react-scroll";
function Home() {
  return (
    <section id="home">
      <div className="container-fluid px-4 py-5 my-5 text-center">
        <div className={`row ${classes.row}`}>
          <div className="col">
            <div className={`lc-block mb-4 ${classes.top}`}>
              <div editable="rich">
                <h3 className={`display-4 fw-bold ${classes["mn-color"]}`}>
                  Words Open Worlds.{" "}
                  <span className="text-primary">
                    {" "}
                    Discover, Explore, Imagine
                  </span>
                </h3>
              </div>
            </div>
            <div className="lc-block col-lg-6 mx-auto mb-5">
              <div editable="rich">
                <p className="lead">
                Explore worlds, discover joy, and let Reader's Nest bring stories alive!
                </p>
              </div>
            </div>

            <div className="lc-block d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
              {" "}
              <Link
                to="pricing"
                spy={true}
                smooth={true}
                offset={-30}
                duration={500}
                className="btn btn-primary btn-lg px-4 gap-3"
                role="button"
              >
                Get it now
              </Link>
              <Link
                to="how"
                spy={true}
                smooth={true}
                offset={-30}
                duration={500}
                className="btn btn-outline-secondary btn-lg px-4"
                role="button"
              >
                Learn more
              </Link>
            </div>
          </div>
          <div className="col">
            <div
              className={`lc-block d-grid gap-2 d-sm-flex justify-content-sm-center ${classes["img-top"]}`}
            >
              <img
                className="img-fluid"
                src={libraryImg}
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
