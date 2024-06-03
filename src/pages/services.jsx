import React from "react";
import useBook from "../hooks/book";

const ServicesPage = () => {
  const { updateBookList } = useBook();
  return (
    <div>
      <h2>ServicesPage</h2>
      <button onClick={() => updateBookList()}>Update book List</button>
    </div>
  );
};

export default ServicesPage;
