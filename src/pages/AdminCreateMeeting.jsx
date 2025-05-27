import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function AdminCreateMeeting() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [topic, setTopic] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Gabim gjatë marrjes së përdoruesve:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/api/meetings/by-admin`,
        { userId, date, hour, topic },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("✅ Takimi u krijua me sukses!");
      setUserId("");
      setDate("");
      setHour("");
      setTopic("");
    } catch (err) {
      console.error("❌ Gabim gjatë krijimit të takimit:", err);
      alert("Gabim gjatë krijimit të takimit.");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-center">Shto Takim</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-4 max-w-md mx-auto space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Përdoruesi</label>
          <select
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          >
            <option value="">-- Zgjidh përdoruesin --</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Data</label>
          <input
            type="date"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Ora</label>
          <input
            type="time"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Tema</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Shembull: Mbledhje mujore"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full"
        >
          Krijo Takim
        </button>
      </form>
    </div>
  );
}
