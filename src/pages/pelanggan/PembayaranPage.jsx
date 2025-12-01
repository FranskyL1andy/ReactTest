import React, { useEffect, useState } from "react";
import { Container, Form, FloatingLabel, Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiFetch } from "../../api/api.js";

const PembayaranPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // bookingId dikirim dari halaman sebelumnya
  const bookingId = location.state?.bookingId || null;

  const [booking, setBooking] = useState(null);
  const [form, setForm] = useState({
    metode_pembayaran: "",
  });

  // Ambil detail pesanan dari API
  useEffect(() => {
    const loadBooking = async () => {
      if (!bookingId) return;

      try {
        const data = await apiFetch(`/pemesanan/read`);
        const selected = data.find((b) => b.id_pemesanan === bookingId);

        if (!selected) {
          toast.error("Pesanan tidak ditemukan.");
          return;
        }

        setBooking(selected);
      } catch {
        toast.error("Gagal memuat data pesanan");
      }
    };

    loadBooking();
  }, [bookingId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.metode_pembayaran) {
      return toast.error("Pilih metode pembayaran.");
    }

    try {
      const response = await apiFetch("/pembayaran/bayar", {
        method: "POST",
        body: JSON.stringify({
          id_pemesanan: bookingId,
          metode_pembayaran: form.metode_pembayaran,
        }),
      });

      toast.success("Pembayaran berhasil!");
      navigate("/pesanan");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Pembayaran gagal.");
    }
  };

  if (!booking) {
    return (
      <Container className="mt-3">
        <h3>Memuat data pesanan...</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-3">
      <h2>Pembayaran</h2>

      <Card className="p-3 mb-3">
        <h5>Detail Pesanan</h5>
        <div>Layanan: <strong>{booking.layanan?.nama_layanan}</strong></div>
        <div>Tanggal Booking: {booking.tanggal_booking}</div>
        <div>Jam Booking: {booking.jam_booking}</div>
        <div>Status: {booking.status_pemesanan}</div>
        <div className="mt-2">
          <strong>Total Bayar: Rp {booking.layanan?.harga}</strong>
        </div>
      </Card>

      <Form onSubmit={handleSubmit}>
        <FloatingLabel label="Metode Pembayaran" className="mb-3">
          <Form.Select
            name="metode_pembayaran"
            value={form.metode_pembayaran}
            onChange={handleChange}
          >
            <option value="">-- Pilih Metode --</option>
            <option value="Cash">Cash</option>
            <option value="Transfer">Transfer</option>
            <option value="E-Wallet">E-Wallet</option>
          </Form.Select>
        </FloatingLabel>

        <Button type="submit" className="mt-2">
          Bayar Sekarang
        </Button>
      </Form>
    </Container>
  );
};

export default PembayaranPage;
