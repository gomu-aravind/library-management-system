import Card from "./Card";

function BookCard({ content, books ,role}) {
  return (
    <>
      {books.map((book) => (
        <Card
          key={book.id}
          id={book.id}
          title={book.title}
          image={book.image}
          content={content}
          price={book.price}
          author={book.author}
        />
      ))}
    </>
  );
}

export default BookCard;
