// src/pages/pelanggan/LoginPage.jsx
import React, { useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiFetch } from "../../api/api.js";
import "./LoginPage.css";
import Logo from "../../assets/images/Logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!form.email || !form.password)
    return toast.error("Email dan password wajib diisi");

  try {
    // Tentukan API berdasarkan email
    let endpoint = "/pelanggan/login";
    let role = "pelanggan";

    if (form.email.includes("@admin")) {
      endpoint = "/admin/login";
      role = "admin";
    }

    const data = await apiFetch(endpoint, {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(data.data));

    toast.success(`Login ${role} berhasil!`);

    if (role === "admin") navigate("/admin/dashboard");
    else navigate("/home");

  } catch (err) {
    toast.error(err.body?.message || "Login gagal!");
  }
};


  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-header">
          <img src={Logo} alt="Salon Logo" className="login-logo" />
          <h2 className="login-title">Aurora Salon</h2>
          <p className="login-subtitle">Beauty & Care</p>
        </div>

        <Form onSubmit={handleLogin}>
          <FloatingLabel label="Email" className="mb-3">
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="login-input"
              autoComplete="email"
            />
          </FloatingLabel>

          <FloatingLabel label="Password" className="mb-3">
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="login-input"
              autoComplete="current-password"
            />
          </FloatingLabel>

          <Button type="submit" className="login-btn w-100 mb-3">
            Login
          </Button>

          <p className="login-register">
            Belum punya akun?
            <span className="login-link" onClick={() => navigate("/register")}>
              Daftar di sini
            </span>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
