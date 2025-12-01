// src/pages/pelanggan/PesananPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { toast } from "sonner";
import { apiFetch } from "../../api/api";
import { formatToAMPM } from "../../utils/time";

const PesananPage = () => {
  const [data, setData] = useState([]);

  const load = async () => {
    try {
      const res = await apiFetch("/pemesanan/read");
      setData(res);
    } catch {
      toast.error("Gagal memuat pesanan");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (id) => {
    try {
      await apiFetch(`/pemesanan/delete/${id}`, {
        method: "DELETE",
      });

      toast.success("Pesanan dibatalkan");
      load();
    } catch {
      toast.error("Gagal membatalkan pesanan");
    }
  };

  return (
    <Container className="mt-3">
      <h1>Daftar Pesanan</h1>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Layanan</th>
            <th>Tanggal Booking</th>
            <th>Jam Booking</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                Belum ada pesanan.
              </td>
            </tr>
          ) : (
            data.map((p, idx) => {
              const jam = typeof p.jam_booking === "string" ? p.jam_booking : "00:00";

              return (
                <tr key={p.id_pemesanan}>
                  <td>{idx + 1}</td>
                  <td>{p.layanan?.nama_layanan}</td>
                  <td>{p.tanggal_booking}</td>
                  <td>{formatToAMPM(jam)}</td>
                  <td>{p.status_pemesanan}</td>
                  <td>
                    {p.status_pemesanan === "pending" && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => cancel(p.id_pemesanan)}
                      >
                        Batalkan
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default PesananPage;
