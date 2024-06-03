import { useContext } from "react";
import { BookContext } from "../context/book";

export default function useBook() {
	return useContext(BookContext)
}