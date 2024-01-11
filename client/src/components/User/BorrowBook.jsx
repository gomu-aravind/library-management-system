import BookListPage from "../../pages/BookListPage";

function BorrowBook() {
  let content={
    color:"btn btn-info",
    text:"Borrow",
    role:"user"
}
  const genres=['','Comics','Technical']

  return (
    <BookListPage genre={genres} content={content}/>
  );
}

export default BorrowBook;