import { createContext, useState,useEffect } from "react";

export const BookContext = createContext();

// wrapper or provider

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(["Sherlock", "Hercules"]);
 
  const updateBookList = () => {
    setBooks((prev) => [...prev, "Lord of The Rings"]);
  };

   useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    await fetch(
      "https://my-json-server.typicode.com/dmitrijt9/book-api-mock/books"
    )
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };
 
  const storeValue = {
    books,
    setBooks,
    updateBookList,
  };

  return (
    <BookContext.Provider value={storeValue}>{children}</BookContext.Provider>
  );
};
