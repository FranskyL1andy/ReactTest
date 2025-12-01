// src/components/TopNavbar.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

const TopNavbar = ({ routes }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const role = localStorage.getItem("role"); // "admin" | "pelanggan" | null
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary shadow">
      <Container>
        <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <div className="d-flex align-items-center">
            <div style={{ width: 46, height: 46, background: "#f3c5d1", borderRadius: 8 }} />
            <div className="ms-2">
              <div className="mb-0 fw-bold">Aurora Salon</div>
              <div className="small text-muted">Beauty & Care</div>
            </div>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center">
            {routes?.map((route, idx) => (
              <Nav.Link key={idx} onClick={() => navigate(route.path)} className="me-2">
                <Button variant={location.pathname === route.path ? "primary" : "light"}>
                  {route.name}
                </Button>
              </Nav.Link>
            ))}

            {role ? (
              <>
                <Nav.Link className="me-2">
                  <span className="me-2">Hai, {user?.username || (role === "admin" ? "Admin" : "Pelanggan")}</span>
                </Nav.Link>
                <Nav.Link>
                  <Button variant="danger" onClick={handleLogout}>Logout</Button>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => navigate("/login")} className="me-2">
                  <Button variant="outline-primary">Login</Button>
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/register")}>
                  <Button variant="primary">Daftar</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
