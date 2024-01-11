import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


function BookDetails() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success,setSuccess]=useState(false)
  

  useEffect(() => {
    async function getBook() {
      setIsLoading(true);
      try {
        const resData = await fetch(
          import.meta.env.VITE_SERVER_URL + `/book/${id}`
        );
        const book = await resData.json();
        if(book.statusCode===401){
          
        }
        if (book.success) {
          setData(book.books);
          setSuccess(true)
        } else {
          throw new Error(book.error);
        }
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
      setIsLoading(false);
    }
    getBook();
  }, []);


  let mainContent;
  if (isLoading) {
    mainContent = (
      <div className="text-center mt-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    mainContent = <h4 className="text-center">Something went wrong...</h4>;
  }
  return (
    <>
      {!success && mainContent}
      {success && (<>
        <h2 className="text-center mt-4">Book Detail</h2>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="card p-0 mb-3" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={data.image.url}
                    className="img-fluid rounded-start"
                    alt={data.title}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text fw-400">{data.author}</p>
                    <p className="card-text">
                      <small className="text-body-primary">
                        {data.description}
                      </small>
                    </p>
                    <p className="card-text">
                      <small className="text-body-primary">
                        Price: {data.price}
                      </small>
                    </p>
                    <p className="card-text">
                      <small className="text-body-primary">
                        Genre: {data.genre}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center mt-3"><Link to={-1}>Back to Previous Page</Link></p>
      </>)}
    </>
  );
}

export default BookDetails;
