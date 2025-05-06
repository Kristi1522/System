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
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
      <h3>Krijo rezervim për një përdorues</h3>
      <select name="userId" value={form.userId} onChange={handleChange} required>
        <option value="">Zgjidh përdoruesin</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>{u.email}</option>
        ))}
      </select><br /><br />

      <input type="date" name="date" value={form.date} onChange={handleChange} required /><br />
      <input type="time" name="time" value={form.time} onChange={handleChange} required /><br />
      <input type="number" name="peopleCount" min="1" value={form.peopleCount} onChange={handleChange} required /><br /><br />

      <button type="submit">Krijo Rezervim</button>
    </form>
  );
}
