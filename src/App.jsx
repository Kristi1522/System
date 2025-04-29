import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import DailySummary from './pages/DailySummary';
import Login from './pages/login';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Orders from './pages/Orders';
import MyOrders from './pages/MyOrders';
import AddDish from './pages/AddDish';
import EditMenu from './pages/EditMenu';
import DeleteDish from './pages/DeleteDish';
import RegisterUser from './pages/RegisterUser';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <>
      <Navbar user={user} />
      <Routes>
        {/* Route for login */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Root route "/" opens AdminDashboard */}
        <Route
          path="/"
          element={
            <PrivateRoute user={user}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Routes for all users */}
        <Route
          path="/profile"
          element={
            <PrivateRoute user={user}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute user={user} allowedRoles={['admin', 'employee']}>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <PrivateRoute user={user}>
              <MyOrders />
            </PrivateRoute>
          }
        />

        {/* Routes for admin only */}
        <Route
          path="/admin"
          element={
            <PrivateRoute user={user} allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-dish"
          element={
            <PrivateRoute user={user} allowedRoles={['admin']}>
              <AddDish />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-menu"
          element={
            <PrivateRoute user={user} allowedRoles={['admin']}>
              <EditMenu />
            </PrivateRoute>
          }
        />
        <Route
          path="/register-user"
          element={
            <PrivateRoute user={user} allowedRoles={['admin']}>
              <RegisterUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/daily-summary"
          element={
            <PrivateRoute user={user} allowedRoles={['admin']}>
              <DailySummary />
            </PrivateRoute>
          }
        />
        <Route
          path="/delete-dish"
          element={
            <PrivateRoute user={user} allowedRoles={['admin']}>
              <DeleteDish />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
