import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMyReservations = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/reservations/my`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setReservations(res.data);
      } catch (err) {
        console.error("❌ Gabim gjatë marrjes së rezervimeve:", err);
      }
    };

    fetchMyReservations();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-background text-textdark">
      <h2 className="text-3xl font-bold mb-6 text-primary">📅 Rezervimet e mia</h2>

      {reservations.length === 0 ? (
        <p className="text-gray-500">Nuk keni asnjë rezervim.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="py-3 px-4 border-b">Data</th>
                <th className="py-3 px-4 border-b">Ora</th>
                <th className="py-3 px-4 border-b">Persona</th>
                <th className="py-3 px-4 border-b">Statusi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {reservations.map((r) => (
                <tr key={r._id} className="hover:bg-gray-50 transition">
                  <td className="py-2 px-4 border-b">{new Date(r.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{r.time}</td>
                  <td className="py-2 px-4 border-b">{r.peopleCount}</td>
                  <td className="py-2 px-4 border-b">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
