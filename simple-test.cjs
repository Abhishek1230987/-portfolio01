const axios = require('axios');

async function testMessaging() {
  console.log('🧪 Testing messaging system...\n');
  
  // Test data
  const testData = {
    name: "Test User",
    email: "test@example.com", 
    subject: "Test Message",
    message: "This is a test message to verify the system works."
  };
  
  try {
    console.log('📤 Sending test message...');
    const response = await axios.post('http://localhost:5000/submit', testData, {
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8080'
      },
      timeout: 30000
    });
    
    console.log('✅ Success!');
    console.log('Status:', response.status);
    console.log('Response:', response.data);
    
  } catch (error) {
    console.error('❌ Test failed:');
    if (error.code === 'ECONNREFUSED') {
      console.error('Backend server is not running on port 5000');
      console.error('Please start the backend server first:');
      console.error('cd backend && npm start');
    } else {
      console.error('Status:', error.response?.status);
      console.error('Error:', error.response?.data || error.message);
    }
  }
}

testMessaging();
