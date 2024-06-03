import React, { useEffect, useState } from "react";
import { useParams, } from "react-router-dom";
import useAxiosPrivate from "../hooks/axios-private";
import moment from 'moment'
import { useQuery } from "@tanstack/react-query";

const BookPage = () => {
  const params = useParams();

  const axiosPrivate = useAxiosPrivate()

  const { data: book, isLoading } = useQuery({
    queryKey: ["book", params.bookId],
    queryFn: async () => {
      try {
        const response = await axiosPrivate.get(`/books/${params.bookId}`);

        console.log(response.data)
        return response.data
      } catch (error) {
        console.log("error", error)
        return error
      }
    }
  })


  if(isLoading){
    return <p>Loading...</p>
  }

  return (
    <div className="mt-10 flex flex-row items-center justify-center gap-5 ">
      <img src={import.meta.env.VITE_API_URL + '/' + book.image} alt="book_image" height={500} width={500} />
      <div className="space-y-5">
        <h2 className="text-gray-500 text-xl"><span className="font-semibold text-black"> {book.title}</span></h2>
        <div>
          <h2 className="text-gray-500">Description:</h2>
          <p> {book.description}</p>
        </div>
        <h2 className="text-gray-500 ">Price: <span className="font-semibold text-red-800  text-xl"> Rs.{book.price}</span></h2>
        <h2 className="text-gray-500">Author: <span className="font-semibold text-black"> {book.author}</span></h2>
        <h2 className="text-gray-500">Publisher: <span className="font-semibold text-black"> {book.publisher}</span></h2>
        <h2 className="text-gray-500">Release Date:<span className="font-semibold text-black">  {moment(book.publicationDate).format('MMMM Do YYYY')}</span></h2>
      </div>
    </div>
  );
};

export default BookPage;
