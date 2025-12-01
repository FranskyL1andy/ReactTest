// src/pages/admin/AdminLoginPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiFetch } from "../../api/api.js";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") navigate("/admin/dashboard");
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Email & password wajib diisi");
      return;
    }

    try {
      const data = await apiFetch("/admin/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      // backend returns { token, data }
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "admin");
      localStorage.setItem("user", JSON.stringify(data.data || {}));

      toast.success("Login admin berhasil");
      navigate("/admin/dashboard");
    } catch (err) {
      const message = err.body?.message || err.message || "Login gagal";
      toast.error(message);
    }
  };

  return (
    <Container className="mt-5">
      <h1>Admin Login</h1>
      <Alert variant="warning">
        Masukkan akun admin (sesuai database). Jika belum ada, register via API
        /admin/register (Postman) atau seeder.
      </Alert>
      <Form onSubmit={handleLogin} style={{ maxWidth: 600 }}>
        <FloatingLabel label="Email" className="mb-3">
          <Form.Control
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="admin@gmail.com"
          />
        </FloatingLabel>
        <FloatingLabel label="Password" className="mb-3">
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="password"
          />
        </FloatingLabel>
        <Button type="submit">Login Admin</Button>
      </Form>
    </Container>
  );
};

export default AdminLoginPage;
