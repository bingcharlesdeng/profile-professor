import React, { useState } from 'react';
import './ProfileForm.css';

const ProfileForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default ProfileForm;