import { Route, Routes } from "react-router-dom";
import "./app.css";
import Header from "./components/header/header";
import AboutPage from "./pages/about";
import BooksPage from "./pages/books";
import HomePage from "./pages/home";
import ServicesPage from "./pages/services";
import BookPage from "./pages/book";
import AddBookPage from "./pages/add-book";

import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { Toaster } from 'react-hot-toast'
import DashboardPage from "./pages/dashboard";
import UpdateBookPage from "./pages/update-book";

export default function Page() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/add" element={<AddBookPage />} />

        <Route path="/books/update/:bookId" element={<UpdateBookPage />} />

        <Route path="/books/:bookId" element={<BookPage />} />
        <Route path="/books/:bookId/:id" element={<BookPage />} />
      </Routes>
    </>
  );
}
