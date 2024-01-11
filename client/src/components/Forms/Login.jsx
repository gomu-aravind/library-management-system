import { useRef, useState } from "react";
import classes from './Form.module.css'
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ValidateLogin } from "../../util/ValidateForm";
import { useDispatch} from "react-redux";
import { authActions } from "../../store/auth-slice";
import { toast } from "react-toastify";

function Login() {
  const dispatch=useDispatch()

    const emailRef=useRef()
    const passwordRef=useRef()
    const userTypeRef=useRef()

    const [errors, setErrors] = useState({});
    const [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()

    const loginHandler=async (e)=>{
        e.preventDefault();
        const role=userTypeRef.current.checked?'admin':'user'
        const data = {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        };
        const {valid,newErrors}=ValidateLogin(data)

        if (valid) {
          const userData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            role:role
          };
          setIsLoading(true)
          const resData = await fetch(
            import.meta.env.VITE_SERVER_URL + "/user/login",
            {
              method: "POST",
              body: JSON.stringify(userData),
              headers: {
                "Content-Type": "application/json",
              },
              credentials:"include" 
            }
          );
          const finalData = await resData.json();
          localStorage.setItem('name',JSON.stringify(finalData.name))
          setIsLoading(false)
          if(finalData.success){
            dispatch(authActions.login({
              role:finalData.role,
              roleToken:finalData.roleToken
            }))
            setErrors({})
            toast.success('Logged In Successfully')
            navigate(`/${finalData.role}`)
          }else{
            setErrors({error:finalData.error})
          }
        }else{
          setErrors(newErrors)
        }

    }
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword(prevState=>!prevState);
    };

    if(isLoading){
      return <div className="text-center mt-5">
        <div className="spinner-grow text-success" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
      </div>
    }
    
  return (
    <div className={`container ${classes['marg-tp']}`}>
      <div className="row align-items-center justify-content-center">
        <div className="col-10 col-sm-7 col-md-6 col-xl-4">
          <form noValidate onSubmit={loginHandler}>
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
                type={showPassword ? 'text' : 'password'}
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
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={!showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              </div>
              {errors.password !== "" && (
                  <p className="text-danger fw-medium">{errors.password}</p>
                )}
            </div>
            <div className="form-check form-switch">
              <label className="form-check-label" htmlFor="userType">
                Are you an Admin?
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                id="userType"
                name="userType"
                ref={userTypeRef}
              />
            </div>
            <button className="mt-3 btn btn-dark">Login</button>
          </form>
          {errors.error  && (
                  <p className="text-danger fw-medium">{errors.error}</p>
                )}
          <div className={classes.fl} >
            <p className="mt-2 text-center">Don't have an account<Link to="/register" className="link-primary mx-2">Signup</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
