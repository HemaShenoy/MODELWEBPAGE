import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function EditProfile() {
  const navigate = useNavigate();
  const oldUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [name, setName] = useState(oldUser.name);
  const [email, setEmail] = useState(oldUser.email);

  const handleSave = () => {
    const updated = {
      ...oldUser,
      name,
      email
    };

    localStorage.setItem("loggedInUser", JSON.stringify(updated));
    localStorage.setItem("user", JSON.stringify(updated));
    navigate("/dashboard");
  };

  return (
    <div className="form-container">
      <form className="form-card">
        <h2>Edit Profile</h2>

        <input value={name} onChange={e => setName(e.target.value)} />
        <input value={email} onChange={e => setEmail(e.target.value)} />

        <button onClick={handleSave}>Save</button>
      </form>
    </div>
  );
}
