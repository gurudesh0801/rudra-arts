import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import { CartProvider } from "./Contexts/Contexts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const LayoutWrapper = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/admin");

  return (
    <>
      {!isDashboard && <Navbar />}
      <App />
      {!isDashboard && <Footer />}
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <LayoutWrapper />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
