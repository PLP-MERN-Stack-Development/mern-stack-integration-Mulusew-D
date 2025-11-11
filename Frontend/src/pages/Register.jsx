import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-12 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" type="text" placeholder="Name" className="w-full p-3 border rounded" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="w-full p-3 border rounded" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="w-full p-3 border rounded" value={form.password} onChange={handleChange} required />
        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700">Register</button>
      </form>
    </div>
  );
}
