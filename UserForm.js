// src/components/UserForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './UserForm.css';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    allergies: '',
    emergencyContact: ''
  });

  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear error on change
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    const bloodPattern = /^(A|B|AB|O)[+-]$/i;
    if (!formData.bloodGroup.trim()) {
      newErrors.bloodGroup = 'Blood group is required';
    } else if (!bloodPattern.test(formData.bloodGroup)) {
      newErrors.bloodGroup = 'Enter valid blood group (A+, B-, etc)';
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = 'Emergency contact is required';
    } else if (!/^\d{10}$/.test(formData.emergencyContact)) {
      newErrors.emergencyContact = 'Must be a 10-digit number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/users/add', formData);
      setUserId(res.data.id);
      setSuccessMsg(' User added! QR code generated successfully.');
      setFormData({ name: '', bloodGroup: '', allergies: '', emergencyContact: '' });
      setErrors({});
    } catch (error) {
      setSuccessMsg(' Error adding user. Please try again.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2> LifeLedger Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <select
  name="bloodGroup"
  value={formData.bloodGroup}
  onChange={handleChange}
>
  <option value="">Select Blood Group</option>
  <option value="A+">A+</option>
  <option value="A-">A-</option>
  <option value="B+">B+</option>
  <option value="B-">B-</option>
  <option value="AB+">AB+</option>
  <option value="AB-">AB-</option>
  <option value="O+">O+</option>
  <option value="O-">O-</option>
</select>
{errors.bloodGroup && <p className="error">{errors.bloodGroup}</p>}


        <input
          type="text"
          name="allergies"
          placeholder="Allergies"
          value={formData.allergies}
          onChange={handleChange}
        />

        <input
          type="text"
          name="emergencyContact"
          placeholder="Emergency Contact"
          value={formData.emergencyContact}
          onChange={handleChange}
        />
        {errors.emergencyContact && <p className="error">{errors.emergencyContact}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {successMsg && <p className="success-msg">{successMsg}</p>}

      {userId && (
        <div className="download-section">
          <h4> Download your QR:</h4>
          <a
            href={`http://localhost:8080/api/users/qr/${userId}`}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
             Download QR Code
          </a>
        </div>
      )}
    </div>
  );
}

export default UserForm;
