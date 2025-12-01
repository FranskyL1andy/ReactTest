// src/pages/admin/AdminLayananPage.jsx
import { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { toast } from "sonner";
import { apiFetch } from "../../api/api.js";

const AdminLayananPage = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    nama_layanan: "",
    harga: "",
    deskripsi: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await apiFetch("/layanan/read");
      setServices(data || []);
    } catch (err) {
      toast.error("Gagal ambil layanan");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setEditing(null);
    setForm({ nama_layanan: "", harga: "", deskripsi: "" });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditing(item.id_layanan || item.id);
    setForm({
      nama_layanan: item.nama_layanan || item.name,
      harga: item.harga || item.price,
      deskripsi: item.deskripsi || item.description,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      // backend expects delete with id maybe body or param - your routes used delete('/layanan/delete') -> controller expects id_layanan in request
      await apiFetch("/layanan/delete", {
        method: "DELETE",
        body: JSON.stringify({ id_layanan: id }),
      });
      toast.success("Layanan berhasil dihapus");
      fetchServices();
    } catch (err) {
      toast.error(err.body?.message || "Gagal hapus layanan");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nama_layanan || !form.harga) {
      toast.error("Nama & harga wajib diisi");
      return;
    }

    try {
      if (editing) {
        // update (controller in your backend uses Route::post('/layanan/update'...))
        await apiFetch("/layanan/update", {
          method: "POST",
          body: JSON.stringify({
            id_layanan: editing,
            nama_layanan: form.nama_layanan,
            deskripsi: form.deskripsi,
            harga: form.harga,
          }),
        });
        toast.success("Layanan berhasil diperbarui");
      } else {
        await apiFetch("/layanan/create", {
          method: "POST",
          body: JSON.stringify({
            nama_layanan: form.nama_layanan,
            deskripsi: form.deskripsi,
            harga: form.harga,
          }),
        });
        toast.success("Layanan berhasil ditambahkan");
      }

      setShowModal(false);
      fetchServices();
    } catch (err) {
      toast.error(err.body?.message || "Gagal menyimpan layanan");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Kelola Layanan</h2>

      <Button className="my-3" onClick={handleAdd}>
        Tambah Layanan
      </Button>

      <Table bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Layanan</th>
            <th>Harga</th>
            <th>Deskripsi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {services.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                Belum ada layanan
              </td>
            </tr>
          ) : (
            services.map((s, i) => (
              <tr key={s.id_layanan || s.id}>
                <td>{i + 1}</td>
                <td>{s.nama_layanan || s.name}</td>
                <td>Rp {Number(s.harga || s.price).toLocaleString("id-ID")}</td>
                <td>{s.deskripsi || s.description}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(s)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(s.id_layanan || s.id)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? "Edit Layanan" : "Tambah Layanan"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nama Layanan</Form.Label>
              <Form.Control
                type="text"
                name="nama_layanan"
                value={form.nama_layanan}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type="number"
                name="harga"
                value={form.harga}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                type="text"
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" className="w-100">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminLayananPage;
