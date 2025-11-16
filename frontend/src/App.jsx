import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductFormPage from './pages/ProductFormPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import RoleRoute from './components/RoleRoute.jsx';
import LandingPage from './pages/LandingPage.jsx';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
           <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['MANAGER']}>
                  <DashboardPage />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products/new"
            element={
              <ProtectedRoute>
                <ProductFormPage mode="create" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products/:id/edit"
            element={
              <ProtectedRoute>
                <ProductFormPage mode="edit" />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="*" element={<Navigate to="/signup" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
