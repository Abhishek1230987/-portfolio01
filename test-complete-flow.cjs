const axios = require('axios');

async function testCompleteFlow() {
  console.log('🔍 Testing complete flow (Frontend → Backend → Discord/Telegram)...\n');
  
  const testData = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    subject: "Complete Flow Test",
    message: "This is a comprehensive test to ensure the complete messaging flow works from frontend to backend to Discord and Telegram."
  };
  
  console.log('📝 Test data:', testData);
  console.log('');
  
  try {
    // Test 1: Backend health check
    console.log('1️⃣ Testing backend health...');
    const healthResponse = await axios.get('http://localhost:5000/');
    console.log('✅ Backend health check passed:', healthResponse.data);
    console.log('');
    
    // Test 2: Full API endpoint test
    console.log('2️⃣ Testing full API endpoint...');
    const apiResponse = await axios.post('http://localhost:5000/submit', testData, {
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8080'
      },
      timeout: 30000
    });
    
    console.log('✅ API endpoint test passed!');
    console.log('Status:', apiResponse.status);
    console.log('Response:', apiResponse.data);
    console.log('');
    
    // Test 3: Analyze response
    console.log('3️⃣ Analyzing response...');
    if (apiResponse.data.results && apiResponse.data.results.length > 0) {
      console.log('✅ Message sent successfully to:');
      apiResponse.data.results.forEach(result => {
        console.log(`  - ${result.platform}: ${result.status}`);
      });
    }
    
    if (apiResponse.data.errors && apiResponse.data.errors.length > 0) {
      console.log('⚠️  Some platforms failed:');
      apiResponse.data.errors.forEach(error => {
        console.log(`  - ${error.platform}: ${error.error}`);
      });
    }
    
    console.log('');
    console.log('🎉 Complete flow test finished successfully!');
    
  } catch (error) {
    console.error('❌ Complete flow test failed:');
    console.error('Status:', error.response?.status);
    console.error('Status Text:', error.response?.statusText);
    console.error('Data:', error.response?.data);
    console.error('Message:', error.message);
    
    // Additional debugging
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Debugging tips:');
      console.log('- Make sure the backend server is running on port 5000');
      console.log('- Check if the backend/.env file has the correct configuration');
      console.log('- Verify Discord webhook and Telegram bot credentials');
    }
  }
}

// Run the test
testCompleteFlow();
