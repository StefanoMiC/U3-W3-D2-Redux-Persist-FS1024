import { useSelector } from "react-redux";
import Book from "./Book";

const BookList = () => {
  const books = useSelector((state) => state.books.content);

  return (
    <div className="mb-3">
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
