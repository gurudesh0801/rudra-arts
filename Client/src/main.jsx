import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import { CartProvider } from "./Contexts/Contexts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Maintenance from "./Components/Maintenance/Maintenance.jsx";

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

const root = createRoot(document.getElementById("root"));

// Maintenance mode is enabled. To restore the website, comment out the next
// line and uncomment the normal website render block below.
root.render(<Maintenance />);

// root.render(
//   <StrictMode>
//     <BrowserRouter>
//       <CartProvider>
//         <LayoutWrapper />
//       </CartProvider>
//     </BrowserRouter>
//   </StrictMode>
// );
