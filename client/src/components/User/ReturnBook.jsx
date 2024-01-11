import { useEffect, useState } from "react";
import ReturnList from "./ReturnList";
import { toast } from "react-toastify";

function ReturnBook() {
  const [book, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getBorrowedBooks() {
      setIsLoading(true);
      try {
        const response = await fetch(
          import.meta.env.VITE_SERVER_URL + "/user/borrowed-book",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.statusCode === 401) {
          toast.error("Token Expired");
          navigate("/login");
        }
        const finalData = await response.json();
        
        if (finalData.success) {
          setBooks(finalData.data);
        }
      } catch (error) {}
      setIsLoading(false);
    }
    getBorrowedBooks();
  }, []);
  
  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!isLoading && book.length === 0 && (
        <div className="container mt-5">
          <div className="text-center">
            <h5>No Books borrowed</h5>
          </div>
        </div>
      )}
      {!isLoading && book.length > 0 && (
        <div className="container mt-5">
          <table className="table table-success">
            <thead>
              <tr>
                <th className="col">S.No</th>
                <th className="col">Title</th>
                <th className="col">Author</th>
                <th className="col">Return Date</th>
                <th className="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {book.map((item, index) => (
                <ReturnList
                  key={item.id}
                  index={index + 1}
                  id={item.id}
                  title={item.title}
                  returnDate={item.returnDate}
                  author={item.author}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default ReturnBook;
