import React, { useState } from 'react';

export const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  // Platform removed - now sends to both Discord and Telegram
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('Sending...');
    
    const formData = { name, email, subject, message };
    console.log('Sending form data:', formData);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const result = await response.json();
        setStatus('✅ ' + result.message);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        const errorData = await response.json();
        setStatus('❌ Failed to send message: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('❌ Error: Cannot connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '40px 20px', backgroundColor: '#0a0a0a', color: 'white' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '30px', color: '#00ffff' }}>
          Contact Form
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                backgroundColor: '#333',
                color: 'white',
                border: '1px solid #555',
                borderRadius: '5px',
                outline: 'none'
              }}
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                backgroundColor: '#333',
                color: 'white',
                border: '1px solid #555',
                borderRadius: '5px',
                outline: 'none'
              }}
              placeholder="Enter your email"
            />
          </div>
          
          {/* Platform selection removed - now sends to both Discord and Telegram */}
          
          
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                backgroundColor: '#333',
                color: 'white',
                border: '1px solid #555',
                borderRadius: '5px',
                outline: 'none'
              }}
              placeholder="Enter subject"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                backgroundColor: '#333',
                color: 'white',
                border: '1px solid #555',
                borderRadius: '5px',
                outline: 'none',
                resize: 'vertical'
              }}
              placeholder="Enter your message"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '15px',
              fontSize: '18px',
              backgroundColor: isLoading ? '#555' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            {isLoading ? 'Sending to Discord & Telegram...' : 'Send to Both Platforms'}
          </button>
          
          {status && (
            <div style={{
              padding: '10px',
              backgroundColor: status.includes('✅') ? '#0d4f3c' : '#4f1010',
              border: `1px solid ${status.includes('✅') ? '#28a745' : '#dc3545'}`,
              borderRadius: '5px',
              color: status.includes('✅') ? '#28a745' : '#dc3545'
            }}>
              {status}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
