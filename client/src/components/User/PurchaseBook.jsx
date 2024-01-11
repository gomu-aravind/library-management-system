import BookListPage from "../../pages/BookListPage";
function PurchaseBook(props) {
    let content={
        color:"btn btn-success",
        text:"Buy",
        role:"user"
    }
  const genres=['','Comics','Technical']
  return (
    <BookListPage genre={genres} content={content}/>
  );
}

export default PurchaseBook;