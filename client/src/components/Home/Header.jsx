import { useLocation, NavLink, Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logoImg from "../../assets/readersnest-logo-1.png";
import adminLogoImg from "../../assets/admin.png";
import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { cartActions } from "../../store/cart-slice";
import { toast } from "react-toastify";

function Header() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const name=JSON.parse(localStorage.getItem("name"))
  const navigate = useNavigate();
  const location = useLocation();
  const logoutHandler = async () => {
    try {
      const resData = await fetch(
        import.meta.env.VITE_SERVER_URL + "/user/logout",
        {
          method: "POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({logout:true}),
          credentials: "include",
        }
      );
      const data = await resData.json();
      if (data.success) {
        dispatch(cartActions.clearCart());
        dispatch(authActions.logout());
        toast.success("Logged Out Successfully");
        navigate("/");
      }
    } catch (error) {
    }
  };
  let content = (
    <nav className="navbar navbar-expand-lg py-3 navbar-light">
      <div className="container">
        <NavLink className="navbar-brand" href="/user">
          <img
            src={logoImg}
            width="200"
            className="align-middle me-1 img-fluid"
            alt="My Website"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#myNavbar3"
          aria-controls="myNavbar3"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="lc-block collapse navbar-collapse" id="myNavbar3">
          <div className="lc-block ms-auto d-grid gap-2 d-lg-block">
            <Link className="btn link-primary" to="/" role="button">
              &larr;Back to Home Page
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
  if (role === "admin" || location.pathname.split("/")[1] === "admin") {
    content = (
      <nav className="navbar navbar-expand-lg py-3 navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/admin">
            <img
              src={adminLogoImg}
              width="200"
              className="align-middle me-1 img-fluid"
              alt="My Website"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-link" aria-current="page" to="/admin" end>
                Books
              </NavLink>
              <NavLink className="nav-link" to="pending-fines" end>
                Pending Fines
              </NavLink>
              <NavLink className="nav-link" to="subscribed-users" end>
                Subscribed Users
              </NavLink>
              <NavLink className="nav-link" to="add-book" end>
                Add a Book
              </NavLink>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-info"
            onClick={logoutHandler}
          >
            Log Out
          </button>
        </div>
      </nav>
    );
  }
  if (role === "user" || location.pathname.split("/")[1] === "user") {
    content = (
      <nav className="navbar navbar-expand-lg py-3 navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" href="/user">
            <img
              src={logoImg}
              width="200"
              className="align-middle me-1 img-fluid"
              alt="My Website"
            />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#myNavbar4"
            aria-controls="myNavbar4"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="lc-block collapse navbar-collapse" id="myNavbar4">
            <div lc-helper="shortcode" className="live-shortcode me-auto">
              <ul id="menu-menu-1" className="navbar-nav">
                <li className="menu-item menu-item-type-custom menu-item-object-custom nav-item fw-medium">
                  <NavLink
                    to="/user"
                    className={({ isActive }) =>
                      isActive
                        ? `nav-link ${classes.highlight}`
                        : `nav-link ${classes.txt}`
                    }
                    end
                  >
                    Purchase a Book
                  </NavLink>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-home nav-item fw-medium">
                  <NavLink
                    to="/user/borrow"
                    className={({ isActive }) =>
                      isActive
                        ? `nav-link ${classes.highlight}`
                        : `nav-link ${classes.txt}`
                    }
                    end
                  >
                    Borrow a book
                  </NavLink>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-home nav-item fw-medium">
                  <NavLink
                    to="cart"
                    className={({ isActive }) =>
                      isActive
                        ? `nav-link ${classes.highlight}`
                        : `nav-link ${classes.txt}`
                    }
                    end
                  >
                    Cart
                  </NavLink>
                </li>
              </ul>
            </div>

            <div lc-helper="shortcode" className="live-shortcode ms-auto">
              <ul id="menu-secondary" className="navbar-nav">
                <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children dropdown nav-item nav-item-33131">
                  <Link
                    to="user"
                    className={`nav-link  dropdown-toggle ${classes.txt}`}
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {name || "Categories"}
                  </Link>
                  <ul className="dropdown-menu  depth_0">
                    <li className="menu-item menu-item-type-taxonomy menu-item-object-category nav-item fw-medium ">
                      <NavLink
                        to="purchase"
                        className={`dropdown-item ${classes.txt}`}
                        end
                      >
                        Subscription
                      </NavLink>
                    </li>
                    <li className="menu-item menu-item-type-taxonomy menu-item-object-category nav-item fw-medium">
                      <NavLink
                        to="fine"
                        className={`dropdown-item ${classes.txt}`}
                      >
                        Fine
                      </NavLink>
                    </li>
                    <li className="menu-item menu-item-type-taxonomy menu-item-object-category nav-item fw-medium">
                      <NavLink
                        to="order"
                        className={`dropdown-item ${classes.txt}`}
                      >
                        Orders
                      </NavLink>
                    </li>
                    <li className="menu-item menu-item-type-taxonomy menu-item-object-category nav-item fw-medium">
                      <NavLink
                        to="return"
                        className={`dropdown-item ${classes.txt}`}
                      >
                        Return a book
                      </NavLink>
                    </li>
                    <li className="menu-item menu-item-type-taxonomy menu-item-object-category nav-item fw-medium">
                      <button
                        type="button"
                        className={`m-2 btn btn-danger`}
                        onClick={logoutHandler}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  if (location.pathname === "/") {
    content = (
      <nav className="navbar navbar-expand-lg py-3 navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img
              src={logoImg}
              width="200"
              className="align-middle me-1 img-fluid"
              alt="My Website"
            />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#myNavbar3"
            aria-controls="myNavbar3"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="lc-block collapse navbar-collapse" id="myNavbar3">
            <div lc-helper="shortcode" className="live-shortcode ms-auto">
              <ul id="menu-menu-1" className="navbar-nav">
                <li className="menu-item menu-item-type-custom menu-item-object-custom nav-item fw-medium">
                  <ScrollLink
                    to="how"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className={`nav-link ${classes.txt}`}
                  >
                    How it works
                  </ScrollLink>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom nav-item fw-medium">
                  <ScrollLink
                    to="aboutUs"
                    spy={true}
                    smooth={true}
                    offset={-30}
                    duration={500}
                    className={`nav-link ${classes.txt}`}
                  >
                    About us
                  </ScrollLink>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom nav-item fw-medium">
                  <ScrollLink
                    to="pricing"
                    spy={true}
                    smooth={true}
                    offset={-20}
                    duration={500}
                    className={`nav-link ${classes.txt}`}
                  >
                    Pricing
                  </ScrollLink>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom nav-item fw-medium">
                  <ScrollLink
                    to="testimonials"
                    spy={true}
                    smooth={true}
                    offset={-70} 
                    duration={500}
                    className={`nav-link ${classes.txt}`}
                  >
                    Testimonials
                  </ScrollLink>
                </li>
              </ul>
            </div>
            <div className="lc-block ms-auto d-grid gap-2 d-lg-block">
              <Link className="btn link-secondary" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary" to="/register" role="button">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  return <header id={classes.header}>{content}</header>;
}

export default Header;
