// src/pages/pelanggan/RegisterPage.jsx
import React, { useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiFetch } from "../../api/api.js";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    no_hp: "",
    alamat: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await apiFetch("/pelanggan/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      toast.success("Registrasi berhasil!");
      navigate("/login");
    } catch (err) {
      toast.error(err.body?.message || "Gagal daftar");
    }
  };

  return (
    <div className="register-bg">
      <div className="register-card">
        <h2 className="text-center mb-4 register-title">Daftar Pelanggan</h2>

        <Form onSubmit={handleRegister}>
          <FloatingLabel label="Nama" className="mb-3">
            <Form.Control name="nama" value={form.nama} onChange={handleChange} />
          </FloatingLabel>

          <FloatingLabel label="Email" className="mb-3">
            <Form.Control name="email" value={form.email} onChange={handleChange} />
          </FloatingLabel>

          <FloatingLabel label="Nomor HP" className="mb-3">
            <Form.Control name="no_hp" value={form.no_hp} onChange={handleChange} />
          </FloatingLabel>

          <FloatingLabel label="Alamat" className="mb-3">
            <Form.Control name="alamat" value={form.alamat} onChange={handleChange} />
          </FloatingLabel>

          <FloatingLabel label="Password" className="mb-3">
            <Form.Control
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </FloatingLabel>

          <Button type="submit" className="register-btn w-100">
            Daftar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
