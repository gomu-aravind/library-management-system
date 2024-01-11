import { useRef, useState } from "react";
import classes from "../Forms/Form.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddBook() {
  const navigate = useNavigate();
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(false);
  const titleRef = useRef();
  const genreRef = useRef();
  const priceRef = useRef();
  const authorRef = useRef();
  const descriptionRef = useRef();

  async function addBookHandler(event) {
    event.preventDefault();
    const data = {
      title: titleRef.current.value,
      price: priceRef.current.value,
      genre: genreRef.current.value,
      author: authorRef.current.value,
      description: descriptionRef.current.value,
      image: img,
    };
    setLoading(true);
    const response = await fetch(import.meta.env.VITE_SERVER_URL + "/book/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if(response.status===401){
      toast.error('Token Expired')
      navigate('/login')
    }
    const resData = await response.json();
    setLoading(false);
    if (resData.success) {
      toast.success("Book is added");
        setImg([]);
      navigate("/admin");
    }
  }

  function imageUpload(e) {
    const file = e.target.files[0];
    setFileToBase(file);
  }

  function setFileToBase(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(reader.result);
    };
  }
  if (loading) {
    return (
      <div className={`container ${classes["marg-x"]}`}>
        <div className="row align-items-center justify-content-center">
          <div className="col-10 col-sm-7 col-md-6 col-xl-4 text-center">
            <div className="spinner-border text-success" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${classes["marg-x"]}`}>
      <div className="row align-items-center justify-content-center">
        <div className="col-10 col-sm-7 col-md-6 col-xl-4">
          <form noValidate onSubmit={addBookHandler}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter Name"
                name="title"
                ref={titleRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="genre" className="form-label">
                Genre
              </label>
              <input
                type="text"
                className="form-control"
                id="genre"
                placeholder="Enter Genre"
                name="genre"
                ref={genreRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                placeholder="Enter Price"
                name="price"
                ref={priceRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                className="form-control"
                onChange={imageUpload}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                placeholder="Enter author"
                ref={authorRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="Enter Description"
                ref={descriptionRef}
              ></textarea>
            </div>
            <button className="mt-3 btn btn-dark">Add the book</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
