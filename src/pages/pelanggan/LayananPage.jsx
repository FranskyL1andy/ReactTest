// src/pages/pelanggan/LayananPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../api/api.js";

const LayananPage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    apiFetch("/layanan/read")
      .then((res) => setServices(res))
      .catch(() => setServices([]));
  }, []);

  return (
    <Container className="mt-3">
      <h1 className="mb-4">Daftar Layanan</h1>
      <Row>
        {services.map((svc) => (
          <Col md={4} key={svc.id_layanan} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{svc.nama_layanan}</Card.Title>
                <Card.Text>{svc.deskripsi}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-bold">Rp {svc.harga}</div>
                  </div>
                  <Button
                    onClick={() =>
                      navigate("/booking", { state: { serviceId: svc.id_layanan } })
                    }
                  >
                    Booking
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LayananPage;
