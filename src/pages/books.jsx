import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/axios-private";
import Button from '../components/button'
import BookCard from "../components/books/card";
import { useQuery } from "@tanstack/react-query";

const BooksPage = () => {

	const axiosPrivate = useAxiosPrivate()

	const query = useQuery({
		queryKey: ["books"],
		queryFn: async () => await axiosPrivate.get("/books"),
		staleTime: 30000 // 5 minutes
	})

	return (
		<div className="flex flex-col items-center ">

			<Link to="/books/add" className="mt-5">
				<Button >
					Add Book
				</Button>
			</Link>

			{query?.data?.data?.length === 0 &&
				<p>No books available</p>
			}

			{
				query.isLoading ?
					<p>Loading...</p>
					: null
			}
			<div className="flex flex-row flex-wrap mt-5 gap-5">
				{query?.data?.data?.map((book) => (
					<div key={book._id}>
						<BookCard book={book} />
					</div>
				))}
			</div>
		</div>
	);
};

export default BooksPage;
