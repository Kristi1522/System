import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function AdminCreateReservation() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ userId: "", date: "", time: "", peopleCount: 1 });
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get(`${API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setUsers(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/reservations/by-admin`, form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert("✅ Rezervimi u krijua!");
      setForm({ userId: "", date: "", time: "", peopleCount: 1 });
    } catch (err) {
      console.error(err);
      alert("❌ Dështoi krijimi i rezervimit.");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-center">Shto Rezervim</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-4 max-w-md mx-auto space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Përdoruesi</label>
          <select
            name="userId"
            value={form.userId}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          >
            <option value="">Zgjidh përdoruesin</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>{u.email}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Data</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Ora</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Numri i personave</label>
          <input
            type="number"
            name="peopleCount"
            min="1"
            value={form.peopleCount}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full"
        >
          Krijo Rezervim
        </button>
      </form>
    </div>
  );
}
