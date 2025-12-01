// src/routes/AppRouter.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Protected Routes
import ProtectedAdmin from "./protected/ProtectedAdmin";
import ProtectedUser from "./protected/ProtectedUser";

// ==== ADMIN PAGES ====
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminLayananPage from "../pages/admin/AdminLayananPage";
import AdminJadwalPage from "../pages/admin/AdminJadwalPage";
import AdminPesananPage from "../pages/admin/AdminPesananPage";

// ==== USER PAGES ====
import LoginPage from "../pages/pelanggan/LoginPage";
import RegisterPage from "../pages/pelanggan/RegisterPage";
import HomePage from "../pages/pelanggan/HomePage";
import LayananPage from "../pages/pelanggan/LayananPage";
import BookingPage from "../pages/pelanggan/BookingPage";
import PesananPage from "../pages/pelanggan/PesananPage";
import PembayaranPage from "../pages/pelanggan/PembayaranPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* ========== PELANGGAN AUTH ========== */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ========== PELANGGAN PAGES (Protected) ========== */}
        <Route
          path="/home"
          element={
            <ProtectedUser>
              <HomePage />
            </ProtectedUser>
          }
        />
        <Route
          path="/layanan"
          element={
            <ProtectedUser>
              <LayananPage />
            </ProtectedUser>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedUser>
              <BookingPage />
            </ProtectedUser>
          }
        />
        <Route
          path="/pesanan"
          element={
            <ProtectedUser>
              <PesananPage />
            </ProtectedUser>
          }
        />
        <Route
          path="/pembayaran"
          element={
            <ProtectedUser>
              <PembayaranPage />
            </ProtectedUser>
          }
        />

        {/* ========== ADMIN AUTH ========== */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* ========== ADMIN PAGES (Protected) ========== */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdmin>
              <AdminDashboardPage />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/layanan"
          element={
            <ProtectedAdmin>
              <AdminLayananPage />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/pegawai"
          element={
            <ProtectedAdmin>
              <AdminJadwalPage />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/pesanan"
          element={
            <ProtectedAdmin>
              <AdminPesananPage />
            </ProtectedAdmin>
          }
        />

        {/* DEFAULT (Redirect ke login user) */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
