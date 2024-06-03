import ReactDom from "react-dom/client";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import { BookProvider } from "./context/book";
import { AuthProvider } from "./context/auth";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const parentElement = document.getElementById("root");
const parentDom = ReactDom.createRoot(parentElement);

const queryClient = new QueryClient({
  staleTime: 30000, // 5 minutes
})

parentDom.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <BookProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BookProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
