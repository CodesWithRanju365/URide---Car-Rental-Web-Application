// pages/profile.js
import { useState } from 'react';
import { addContactInfo } from '../lib/user'; 

const ProfilePage = () => {
  const [contactNo, setContactNo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = 'user_2whMkkQr3yI7NS887YvJ9e8YlqY';  

    const result = await addContactInfo(userId, contactNo);
    if (result.error) {
      setError(result.error);
    } else {
      alert('Contact info updated!');
    }
  };

  return (
    <div>
      <h1>Contact Info</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={contactNo} 
          onChange={(e) => setContactNo(e.target.value)} 
          placeholder="Enter Contact Number" 
        />
        <button type="submit">Update Contact</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ProfilePage;
