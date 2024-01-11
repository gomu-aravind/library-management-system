import { Link } from "react-router-dom"

function LoggedInErrorPage(props){
    return <section className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="text-center">
            <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
              <span className="display-1 fw-bold">4</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
</svg>
              <span className="display-1 fw-bold bsb-flip-h">4</span>
            </h2>
            <h3 className="h2 mb-2">Oops! You're lost.</h3>
            <p className="mb-5">The page you are looking for was not found.</p>
            <Link className="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0" to={`/${props.role}`} role="button">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  </section>  
    
}


export default LoggedInErrorPage