import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Clients } from './pages/Clients';
import { Projects } from './pages/Projects';
import { TimeTracking } from './pages/TimeTracking';
import { Invoices } from './pages/Invoices';
import { Login } from './pages/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  return session ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<Clients />} />
            <Route path="projects" element={<Projects />} />
            <Route path="time-tracking" element={<TimeTracking />} />
            <Route path="invoices" element={<Invoices />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;