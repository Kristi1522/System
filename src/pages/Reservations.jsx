import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [date, setDate] = useState('');
  const [people, setPeople] = useState('');
  const [note, setNote] = useState('');

  const fetchReservations = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/reservations/my', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setReservations(res.data);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('/api/reservations', {
      date,
      people,
      note
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setDate('');
    setPeople('');
    setNote('');
    fetchReservations();
  };

  return (
    <div>
      <h2>Rezervimet e mia</h2>
      <form onSubmit={handleSubmit}>
        <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
        <input type="number" value={people} onChange={e => setPeople(e.target.value)} placeholder="Nr. personave" required />
        <input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="Shënim (opsional)" />
        <button type="submit">Shto Rezervim</button>
      </form>

      <ul>
        {reservations.map(r => (
          <li key={r._id}>{new Date(r.date).toLocaleString()} – {r.people} persona – {r.note}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reservations;
