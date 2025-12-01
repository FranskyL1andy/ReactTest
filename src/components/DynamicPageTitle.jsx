// src/components/DynamicPageTitle.jsx
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const DynamicPageTitle = () => {
  const location = useLocation();

  const switchPageTitle = (path) => {
    if (path.startsWith("/admin")) return "Admin Panel";
    switch (path) {
      case "/":
        return "Home";
      case "/login":
        return "Login";
      case "/register":
        return "Register";
      case "/layanan":
        return "Layanan";
      case "/booking":
        return "Booking";
      case "/pesanan":
        return "Pesanan";
      default:
        return "Aurora Salon";
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{switchPageTitle(location.pathname)} | Aurora Salon</title>
        <meta name="description" content="Aurora Salon — layanan kecantikan & perawatan profesional" />
      </Helmet>
    </HelmetProvider>
  );
};

export default DynamicPageTitle;
