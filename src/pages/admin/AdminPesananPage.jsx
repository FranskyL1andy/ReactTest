// src/pages/admin/AdminPesananPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Table, Form } from "react-bootstrap";
import { toast } from "sonner";
import { apiFetch } from "../../api/api.js";
import { formatToAMPM } from "../../utils/time"; // <— BARU

const AdminPesananPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await apiFetch("/pemesanan/read");
      setBookings(data || []);
    } catch (err) {
      toast.error("Gagal ambil daftar pemesanan");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await apiFetch("/pemesanan/update", {
        method: "POST",
        body: JSON.stringify({
          id_pemesanan: id,
          status_pemesanan: status,
        }),
      });
      toast.success("Status diperbarui");
      fetchBookings();
    } catch (err) {
      toast.error(err.body?.message || "Gagal update status");
    }
  };

  const findServiceName = (layanan) => {
    return layanan?.nama_layanan || layanan?.name || "Layanan";
  };

  return (
    <Container className="mt-3">
      <h1 className="mb-3">Kelola Pesanan</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Pelanggan</th>
            <th>Layanan</th>
            <th>Tanggal Pemesanan</th>
            <th>Tanggal Booking</th>
            <th>Jam Booking</th> {/* <— BARU */}
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center">
                Belum ada pesanan
              </td>
            </tr>
          )}
          {bookings.map((b, idx) => (
            <tr key={b.id_pemesanan}>
              <td>{idx + 1}</td>
              <td>{b.pelanggan?.nama}</td>
              <td>{findServiceName(b.layanan)}</td>
              <td>{b.tanggal_pemesanan}</td>
              <td>{b.tanggal_booking}</td>
              <td>{formatToAMPM(b.jam_booking)}</td> {/* <— BARU */}
              <td>
                <Form.Select
                  size="sm"
                  value={b.status_pemesanan || "pending"}
                  onChange={(e) =>
                    updateStatus(b.id_pemesanan, e.target.value)
                  }
                >
                  <option value="pending">Pending / Menunggu</option>
                  <option value="sedang_dilayani">Sedang Dilayani</option>
                  <option value="selesai">Selesai</option>
                  <option value="dibatalkan">Dibatalkan</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPesananPage;
