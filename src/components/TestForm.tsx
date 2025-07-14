import React, { useState } from 'react';

export const TestForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Name: ${name}, Email: ${email}`);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#1a1a1a', color: 'white' }}>
      <h2>Test Form</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{
            padding: '10px',
            backgroundColor: '#333',
            color: 'white',
            border: '1px solid #555',
            borderRadius: '5px'
          }}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{
            padding: '10px',
            backgroundColor: '#333',
            color: 'white',
            border: '1px solid #555',
            borderRadius: '5px'
          }}
        />
        <button 
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
