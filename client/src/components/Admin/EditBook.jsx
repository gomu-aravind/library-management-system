import { useEffect, useState } from "react";
import classes from "../Forms/Form.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  genre: "",
  price: "",
  author: "",
  description: "",
};

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    genre: "",
    price: "",
    author: "",
    description: "",
  });

  useEffect(() => {
    async function getBooks() {
      setIsLoading(true);
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + `/book/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 401) {
        toast.error("Token Expired");
        navigate("/login");
      }
      const resData = await response.json();
      if (resData.success) {
        setInputs((prevState) => ({
          ...prevState,
          title: resData.books.title,
          genre: resData.books.genre,
          price: resData.books.price,
          author: resData.books.author,
          description: resData.books.description,
        }));
      } else {
        toast.error(resData.message);
      }
      setIsLoading(false);
    }
    getBooks();
  }, []);

  const editBookHandler = async (event) => {
    event.preventDefault();
    if (
      errors.title === "" &&
      errors.author === "" &&
      errors.description === "" &&
      errors.genre === "" &&
      errors.price === ""
    ) {
      const bookData = {
        title: inputs.title,
        genre: inputs.genre,
        price: inputs.price,
        author: inputs.author,
        description: inputs.description,
      };
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + `/book/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
          credentials: "include",
        }
      );
      if (response.status === 401) {
        toast.error("Token Expired");
        navigate("/login");
      }
      const resData = await response.json();
      if (resData.success) {
        setInputs(initialState);
        toast.success("Book updated successfully");
        navigate("/admin");
      }
    } else {
      toast.error("Fields should not be empty");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    // You can perform validation here
    if (value.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
  };

  return (
    <>
      {isLoading && (
        <div className="container mt-5 text-center">
          <div className="spinner-grow text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className={`container ${classes["marg-x"]}`}>
          <div className="row align-items-center justify-content-center">
            <div className="col-10 col-sm-7 col-md-6 col-xl-4">
              <form onSubmit={editBookHandler} noValidate>
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
                    value={inputs.title}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {errors.title && (
                    <span className="text-danger">{errors.title}</span>
                  )}
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
                    value={inputs.genre}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {errors.genre && (
                    <span className="text-danger">{errors.genre}</span>
                  )}
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
                    value={inputs.price}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {errors.price && (
                    <span className="text-danger">{errors.price}</span>
                  )}
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
                    value={inputs.author}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {errors.author && (
                    <span className="text-danger">{errors.author}</span>
                  )}
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
                    value={inputs.description}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  ></textarea>
                  {errors.description && (
                    <span className="text-danger">{errors.description}</span>
                  )}
                </div>
                <button className="mt-3 btn btn-dark">Edit the book</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditBook;
