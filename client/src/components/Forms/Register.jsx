import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ValidateRegister from "../../util/ValidateForm";
import { toast } from "react-toastify";

function Register() {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({});
  const navigate=useNavigate()

  const registerHandler = async (event) => {
    event.preventDefault();
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };
    const { newErrors, valid } = ValidateRegister(data);

    if (valid) {
      const userData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const resData = await fetch(
        import.meta.env.VITE_SERVER_URL + "/user/register",
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const finalData = await resData.json();
      if(finalData.success){
        setErrors({})
        toast.success('Registered Successfully')
        navigate('/login')
      }else{
        setErrors({error:finalData.message})
        toast.error(finalData.message)
      }
    }else{
      setErrors(newErrors)
    }
  };
  const togglePasswordVisibility = (key) => {
    setShowPassword((prevState) => {
      return {
        ...prevState,
        [key]: !prevState[key],
      };
    });
  };
  return (
    <div className={`container ${classes["marg-tp"]}`}>
      <div className="row align-items-center justify-content-center">
        <div className="col-10 col-sm-7 col-md-6 col-xl-4">
          <form noValidate onSubmit={registerHandler}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Name"
                name="name"
                ref={nameRef}
              />
              {errors.name !== "" && (
                  <p className="text-danger fw-medium">{errors.name}</p>
                )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                name="email"
                ref={emailRef}
              />
              {errors.email !== "" && (
                  <p className="text-danger fw-medium">{errors.email}</p>
                )}
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword.password ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  name="password"
                  ref={passwordRef}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => togglePasswordVisibility("password")}
                  >
                    <FontAwesomeIcon
                      icon={!showPassword.password ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
              </div>
                  {errors.password !== "" && (
                  <p className="text-danger fw-medium">{errors.password}</p>
                )}
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Enter Password"
                  name="confirmPassword"
                  ref={confirmPasswordRef}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  >
                    <FontAwesomeIcon
                      icon={!showPassword.confirmPassword ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
              </div>
                  {errors.confirmPassword !== "" && (
                  <p className="text-danger fw-medium">{errors.confirmPassword}</p>
                )}
            </div>
            <button className="mt-3 btn btn-dark">SignUp</button>
          </form>
          {errors.error  && (
                  <p className="text-danger fw-medium">{"Email Already exists"}</p>
                )}
          <div className={classes.fl}>
            <p className="mt-2 text-center">
              Already have an account?
              <Link to="/login" className="link-primary mx-2">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
