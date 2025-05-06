import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchReservations = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/reservations/my`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setReservations(res.data);
    } catch (err) {
      console.error("❌ Gabim në marrjen e rezervimeve:", err);
    }
  };

  const cancelReservation = async (id) => {
    try {
      await axios.put(`${API_URL}/api/reservations/${id}/cancel`, null, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchReservations(); // rifresko listën
    } catch (err) {
      console.error("❌ Gabim gjatë anulimit:", err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Rezervimet e mia</h2>
      {reservations.length === 0 ? (
        <p>Nuk ka rezervime.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Ora</th>
              <th>Persona</th>
              <th>Statusi</th>
              <th>Veprim</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r._id}>
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td>{r.time}</td>
                <td>{r.peopleCount}</td>
                <td>{r.status}</td>
                <td>
                  {r.status === "active" && (
                    <button onClick={() => cancelReservation(r._id)}>
                      Anulo
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
