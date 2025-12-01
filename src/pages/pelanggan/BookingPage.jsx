import React, { useEffect, useState } from "react";
import { Container, Form, FloatingLabel, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { apiFetch } from "../../api/api.js";

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const preServiceId = location.state?.serviceId || "";

  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    id_layanan: preServiceId,
    tanggal_booking: "",
    jam_booking: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const id_pelanggan = user?.id_pelanggan;

  useEffect(() => {
    apiFetch("/layanan/read").then((data) => setServices(data || []));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.id_layanan) return toast.error("Pilih layanan dahulu!");
    if (!form.tanggal_booking) return toast.error("Tanggal booking wajib diisi!");
    if (!form.jam_booking) return toast.error("Jam booking wajib diisi!");

    // Format jam -> int (misal 05:45 jadi 545)
    const jamInt = parseInt(form.jam_booking.replace(":", ""));

    try {
      await apiFetch("/pemesanan/create", {
        method: "POST",
        body: JSON.stringify({
          id_pelanggan,
          id_layanan: form.id_layanan,
          tanggal_pemesanan: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
          tanggal_booking: form.tanggal_booking,
          jam_booking: jamInt,
          status_pemesanan: "pending",
        }),
      });

      toast.success("Booking berhasil dibuat!");
      navigate("/pesanan");
    } catch (err) {
      console.error("BOOKING ERROR:", err);
      toast.error(err.body?.message || "Gagal melakukan booking");
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={8}>
          <h2>Form Booking</h2>
          <Form onSubmit={handleSubmit}>

            <FloatingLabel label="Pilih Layanan" className="mb-3">
              <Form.Select
                name="id_layanan"
                value={form.id_layanan}
                onChange={handleChange}
              >
                <option value="">-- Pilih layanan --</option>
                {services.map((s) => (
                  <option key={s.id_layanan} value={s.id_layanan}>
                    {s.nama_layanan} — Rp {s.harga}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel label="Tanggal Booking" className="mb-3">
              <Form.Control
                type="date"
                name="tanggal_booking"
                value={form.tanggal_booking}
                onChange={handleChange}
              />
            </FloatingLabel>

            <FloatingLabel label="Jam Booking" className="mb-3">
              <Form.Control
                type="time"
                name="jam_booking"
                value={form.jam_booking}
                onChange={handleChange}
              />
            </FloatingLabel>

            <Button type="submit" variant="primary" className="mt-2">
              Booking Sekarang
            </Button>
          </Form>
        </Col>

        <Col md={4}>
          <Card className="p-3">
            <h5>Ringkasan</h5>
            <p className="small text-muted">
              Pastikan memilih layanan, tanggal, dan jam yang tersedia.
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingPage;
