import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAllReservations = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/reservations`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setReservations(res.data);
    } catch (err) {
      console.error("❌ Gabim gjatë marrjes së rezervimeve:", err);
    }
  };

  useEffect(() => {
    fetchAllReservations();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📋 Të gjitha rezervimet</h2>
      {reservations.length === 0 ? (
        <p>Nuk ka rezervime.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Përdoruesi</th>
              <th>Email</th>
              <th>Data</th>
              <th>Ora</th>
              <th>Persona</th>
              <th>Statusi</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r._id}>
                <td>{r.user?.name || "Anonim"}</td>
                <td>{r.user?.email}</td>
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td>{r.time}</td>
                <td>{r.peopleCount}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
