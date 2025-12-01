// src/pages/admin/AdminDashboardPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { apiFetch } from "../../api/api.js";

const AdminDashboardPage = () => {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const lay = await apiFetch("/layanan/read");
        setServices(lay || []);

        const pem = await apiFetch("/pemesanan/read");
        setBookings(pem || []);

        // gunakan pegawai sebagai "stylists"
        const peg = await apiFetch("/pegawai/read");
        setStylists(peg || []);
      } catch (e) {
        // ignore or console
        console.error(e);
      }
    };
    load();
  }, []);

  return (
    <Container>
      <h1 className="mb-4">Admin Dashboard</h1>
      <Row className="g-3">
        <Col md={4}>
          <Card className="p-3">
            <h5>Layanan</h5>
            <div className="display-6">{services.length}</div>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <h5>Pesanan</h5>
            <div className="display-6">{bookings.length}</div>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <h5>Pegawai / Stylists</h5>
            <div className="display-6">{stylists.length}</div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboardPage;
