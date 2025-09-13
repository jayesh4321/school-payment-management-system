const axios = require('axios');

async function testAPI() {
  try {
    console.log('🧪 Testing API Endpoints...\n');

    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get('http://localhost:3000');
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test 2: Get Transactions (should work without auth)
    console.log('2. Testing Get Transactions...');
    const transactionsResponse = await axios.get('http://localhost:3000/payment/transactions');
    console.log('✅ Transactions Count:', transactionsResponse.data.transactions.length);
    console.log('✅ Sample Transaction:', JSON.stringify(transactionsResponse.data.transactions[0], null, 2));
    console.log('');

    // Test 3: Register User
    console.log('3. Testing User Registration...');
    try {
      const registerResponse = await axios.post('http://localhost:3000/auth/register', {
        email: 'test@example.com',
        password: 'test123',
        name: 'Test User',
        role: 'admin'
      });
      console.log('✅ User Registration:', registerResponse.data);
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message?.includes('already exists')) {
        console.log('✅ User already exists (expected)');
      } else {
        console.log('❌ Registration Error:', error.response?.data || error.message);
      }
    }
    console.log('');

    // Test 4: Login
    console.log('4. Testing User Login...');
    try {
      const loginResponse = await axios.post('http://localhost:3000/auth/login', {
        email: 'admin@school.com',
        password: 'admin123'
      });
      console.log('✅ Login Success:', {
        access_token: loginResponse.data.access_token ? 'Present' : 'Missing',
        user: loginResponse.data.user
      });
    } catch (error) {
      console.log('❌ Login Error:', error.response?.data || error.message);
    }
    console.log('');

    console.log('🎉 API Testing Complete!');

  } catch (error) {
    console.error('❌ Test Failed:', error.message);
  }
}

testAPI();
